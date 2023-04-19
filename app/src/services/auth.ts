import { AxiosResponse } from "axios";
import { api } from "./api";

export const signInRequest = async (
  user: SignInData
): Promise<SignInResponse | any> => {
  const { data } = await api.post("/login", user);
  return data;
};

export const signOutRequest = async () => {
  const response = await api.post("/logout");
};

export const profileRequest = async (): Promise<AxiosResponse<User | any>> => {
  const { data } = await api.get("/profile");
  return data;
};
