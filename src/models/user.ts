import { BaseEntity } from "./base";

export interface User extends BaseEntity {
  username: string
  email: string
  first_name: string
  last_name: string
  gender: string
  birthdate: string
  job: string
  phone: string
  
}