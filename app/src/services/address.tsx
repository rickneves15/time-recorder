import { api } from "./api";

export const getAddressRequest = async (
  cep: string
): Promise<AddressResponse | any> => {
  const { data } = await api.get(`get-address/${cep}`);
  return data;
};
