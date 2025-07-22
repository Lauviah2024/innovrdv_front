import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PersistentStorage, StorageKeys } from "@/utils";
import { API_ENDPOINTS, APP_ROUTES } from "@/configs";
import { LoginPayload, RegisterPayload, User } from "@/models";
import apiClient, { setAuthToken } from "@/lib/apiClient";

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const from = ((location.state as any)?.from.pathname as string) || "/";

  useEffect(() => {
    if (PersistentStorage.getData(StorageKeys.INNOV_TOKEN_KEY, false)) {
      navigate(APP_ROUTES.ROOT.PATH);
    }
  }, []);

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const formData = new FormData();
      formData.append("phone", data.phone);
      formData.append("password", data.password);

      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, formData);

      const token = response.data.access_token;
      PersistentStorage.setData(StorageKeys.INNOV_TOKEN_KEY, token);
      setAuthToken(token);

      queryClient.invalidateQueries();
      navigate(from ?? "/profile");

      return response.data;
    },
  });
};

export const useRegister = () => {
  return useMutation<User, Error, RegisterPayload>({
    mutationFn: async (data) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, formData);
      return response.data;
    },
  });
};
