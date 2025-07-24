export interface LoginPayload {
  phone: string;
  password: string;
}

export interface RegisterPayload {
  email: string
  password: string
  password_confirm: string
  first_name: string
  last_name: string
  gender: string
  birthdate: string
  job: string
  phone: string
}