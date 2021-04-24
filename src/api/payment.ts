import { axios_normal } from "."

export async function getOnboardingLink(): Promise<any> {
  return axios_normal.get(`/main/api/payment/link/`)
}
export async function createNewAccount(country): Promise<any> {
  return axios_normal.post(`/main/api/payment/new/`, { country })
}
