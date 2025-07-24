import { API_ENDPOINTS } from "@/configs";
import apiClient from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const useGetSpecialities = () => {
  return useQuery<Error, Error>({
    queryKey: ['specialite'],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.SPECIALITIES}`);
      return response.data;
    },
  });
};