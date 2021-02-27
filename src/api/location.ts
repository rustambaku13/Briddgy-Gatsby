import { axios_normal } from "./index"
import { Locations } from "./../types/location"
import { AxiosPromise, AxiosResponse } from "axios"
export async function searchLocation(
  searchText: string,
  locale: string = "en"
): Promise<AxiosResponse<Locations>> {
  return axios_normal.get(`/cities/?search=${searchText}&lang=${locale}`)
}
