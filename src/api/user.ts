import { User } from "./../types/user"
import { AxiosResponse } from "axios"
import { axios_normal } from "./index"
export async function loginUser(
  username: String,
  password: String
): Promise<AxiosResponse<User>> {
  return axios_normal.post(`/auth/`, { username, password, deviceToken: "" })
}
