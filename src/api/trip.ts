import { axios_normal } from "./index"
import { Locations } from "./../types/location"
import { AxiosPromise, AxiosResponse } from "axios"
export async function getTrips(params = {}): Promise<AxiosResponse<Locations>> {
  return axios_normal.get(`/trips/`, { params })
}
