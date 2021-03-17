import { User } from "./../types/user"
import { AxiosResponse } from "axios"
import { axios_normal } from "./index"
export async function loginUser(
  username: String,
  password: String
): Promise<AxiosResponse<string>> {
  return axios_normal.post(`/auth/`, { username, password, deviceToken: "" })
}

export async function createUser({
  first_name,
  email,
  password,
  last_name,
  lang = "en",
}): Promise<AxiosResponse<User>> {
  return axios_normal.post(`/users/`, {
    first_name,
    last_name,
    email,
    password,
    password2: password,
    deviceToken: "",
    lang,
  })
}
export async function getMyDetails(): Promise<User> {
  return axios_normal.get(`/users/me/`)
}

export async function askForPhoneCode(phone) {
  return await axios_normal.post(`/request/phone/`, {
    phone,
  })
}

export async function verifyPhoneNumber(verification_phone) {
  return await axios_normal.post(`/verify/phone/`, {
    verification_phone,
  })
}
