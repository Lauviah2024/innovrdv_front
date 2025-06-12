import axios from "axios";
import { appConfig } from "@/configs";
import { PersistentStorage, StorageKeys } from "@/utils";

const apiClient = axios.create({
  baseURL: appConfig.INNOV_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

export const initializeApiClient = () => {
  const token = PersistentStorage.getData(
    StorageKeys.INNOV_TOKEN_KEY,
    false,
  )?.replace(/^"(.*)"$/, "$1");
  setAuthToken(token);
};

apiClient.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      PersistentStorage.clear();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error); 
  },
);

initializeApiClient();

export default apiClient;
