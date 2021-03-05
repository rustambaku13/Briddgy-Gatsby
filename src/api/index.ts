import axios from "axios"
export const BASE_MEDIA = `https://briddgyazbucket.s3.amazonaws.com/static`
export const bmify = src => `${BASE_MEDIA}/${src}`
export const axios_normal = axios.create({
  baseURL: "https://backend.briddgy.az/api",
  timeout: 3000,
})
