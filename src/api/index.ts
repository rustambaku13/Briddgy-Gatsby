import axios from "axios"
export const BASE_MEDIA = `https://briddgyazbucket.s3.amazonaws.com/static`
export const bmify = src => `${BASE_MEDIA}/${src}`
export const BACKEND_DATE_FORMAT = "YYYY-MM-DD"
export const axios_normal = axios.create({
  baseURL: "https://backend.briddgy.com/api",
  timeout: 3000,
})

// Other Constants

export const PREFERRED_COUNTRIES = ["en", "ru", "az"]
