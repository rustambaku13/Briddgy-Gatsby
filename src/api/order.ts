import { AxiosResponse } from "axios"
import { Orders } from "../types/orders"
import { axios_normal } from "./index"
export async function getOrders(params = {}): Promise<AxiosResponse<Orders>> {
  return axios_normal.get(`/orders/`, { params })
}
