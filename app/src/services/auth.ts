import { AxiosResponse } from "axios";
import { api } from "./api";

type SignInRequestData = {
  email: string;
  password: string;
};

type UserType = {
  id: number;
  name: string;
  email: string;
  identification_number: string;
  birthday: string;
  created_at: string;
  updated_at: string;
  role_id: number;
  manager_id: null | number;
};

type SignInRequest = {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: UserType;
};

export const signInRequest = async (user: SignInRequestData) => {
  const { data } = await api.post("/login", user);
  return data;
};

export const signOutRequest = async () => {
  const response = await api.post("/logout");
};

export const recoverUserInformation = async () => {
  const { data } = await api.get("/profile");
  return data;
};
