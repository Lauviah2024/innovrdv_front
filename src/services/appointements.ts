import { API_ENDPOINTS } from "@/configs";
import apiClient from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useGetSpecialities = () => {
  return useQuery({
    queryKey: ['specialite'],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.SPECIALITIES}`);
      return response.data;
    },
  });
};

export const useGetSpecialitiesDoctors = (id:string) => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.DOCTOR_SPEC}/${id}`);
      return response.data;
    },
    enabled:!!id
  });
};


export const useGetDoctorById = (id:string) => {
  return useQuery({
    queryKey: ['doctor'],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.SPECIALITIES}/${id}`);
      return response.data;
    },
  });
};


export interface AppointmentPayload {
  appointment_speciality: string;
  appointment_doctor_id: number;
  appointment_slot: string;
  appointment_date_hour: string;
  appointment_type: 'myself' | 'other';
  appointment_user_lastname: string;
  appointment_user_firstname: string;
  appointment_user_gender: string;
  appointment_user_birthdate: string;
  appointment_user_job: string;
  appointment_user_phone: string;
}

export const useCreateAppointment = () => {
  return useMutation<AppointmentPayload, Error, AppointmentPayload>({
    mutationFn: async (data) => {
      const response = await apiClient.post('/appointments', data); 
      return response.data;
    },
  });
};