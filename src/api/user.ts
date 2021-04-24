import { User } from "./../types/user"
import { AxiosResponse } from "axios"
import { axios_normal } from "./index"
export async function loginUser(
  username: String,
  password: String
): Promise<AxiosResponse<string>> {
  return axios_normal.post(`/main/api/auth/`, {
    username,
    password,
    deviceToken: "",
  })
}

export async function createUser({
  first_name,
  email,
  password,
  last_name,
  lang = "en",
}): Promise<AxiosResponse<User>> {
  return axios_normal.post(`/main/api/users/`, {
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
  return axios_normal.get(`/main/api/users/me/`)
}

export async function askForPhoneCode(phone) {
  return await axios_normal.post(`/main/api/request/phone/`, {
    phone,
  })
}

export async function askForEmailCode() {
  return await axios_normal.get(`/main/api/request/email/`)
}

export async function verifyPhoneNumber(verification_phone) {
  return await axios_normal.post(`/main/api/verify/phone/`, {
    verification_phone,
  })
}

export async function verifyEmail(key) {
  return await axios_normal.post(`/main/api/request/verify/`, {
    key,
  })
}
