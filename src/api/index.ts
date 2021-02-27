import axios from "axios"

export const axios_normal = axios.create({
  baseURL: "https://backend.briddgy.az/api",
  timeout: 1000,
})
