import { axios_normal } from "."

export async function getOnboardingLink(): Promise<any> {
  return axios_normal.get(`/main/api/payment/link/onboarding/`)
}
export async function getAccountUpdateLink(): Promise<any> {
  return axios_normal.get(`/main/api/payment/link/update/`)
}
export async function createNewAccount(country): Promise<any> {
  return axios_normal.post(`/main/api/payment/new/`, { country })
}
export async function createPaymentIntent(contract_id): Promise<any> {
  return axios_normal.get(`main/api/payment/intent/create/${contract_id}/`)
}
