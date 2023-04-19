import { AxiosResponse } from "axios";
import { api } from "./api";

export const usersRequest = async (): Promise<UsersResponse[] | any> => {
  const { data } = await api.get("/users");
  return data;
};

export const userRequest = async (id: number): Promise<UsersResponse | any> => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const userCreateRequest = async (
  user: UsersCreate
): Promise<UsersResponse | any> => {
  const { data } = await api.post("/users", user);
  return data;
};

export const userEditRequest = async (
  id: number,
  user: UsersCreate
): Promise<UsersResponse | any> => {
  const { data } = await api.put(`/users/${id}`, user);
  return data;
};

export const userDeleteRequest = async (id: number) => {
  await api.delete(`/users/${id}`);
};

export const changePasswordRequest = async (
  user: changePasswordData
): Promise<UsersResponse | any> => {
  const { data } = await api.post("/users/change-password", user);
  return data;
};
