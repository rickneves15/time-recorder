import { AxiosResponse } from "axios";
import { api } from "./api";

export const recordPointsRequest = async (
  filters: RecordPointsData
): Promise<RecordPoint[] | any> => {
  const { data } = await api.get("/record-points", { params: filters });
  return data;
};

export const recordPointCreateRequest = async () => {
  const { data } = await api.post("/record-points");
  return data;
};
