import axios, { AxiosResponse } from "axios"
import { ApiLocation } from "./../types/location"
// export async function searchLocation(
//   searchText: string,
//   locale: string = "en"
// ): Promise<AxiosResponse<Locations>> {
//   return axios_normal.get(`/cities/?search=${searchText}&lang=${locale}`)
// }
const headers = {
  "x-rapidapi-key": "09f404e0d1msh6ca85c71ae63bbap1dca4djsnb733926d884e",
  "x-rapidapi-host": "referential.p.rapidapi.com",
  useQueryString: true,
}
export async function searchLocation(
  prefix: string,
  lang: string = "en"
): Promise<AxiosResponse<[ApiLocation]>> {
  return axios.get(`https://referential.p.rapidapi.com/v1/city`, {
    headers,
    params: {
      lang,
      fields: "iso_a2,",
      prefix,
      limit: 20,
    },
  })
}
