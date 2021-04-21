import axios from "axios"
export const BASE_MEDIA = `https://briddgyazbucket.s3.amazonaws.com/static`
export const bmify = src => `${BASE_MEDIA}/${src}`
export const BACKEND_DATE_FORMAT = "YYYY-MM-DD"
export const FRONTEND_DATE_FORMAT = "DD MMM, YYYY"
export const axios_normal = axios.create({
  // baseURL: "https://backend.briddgy.com/api",
  baseURL: "https://backend.briddgy.com",
  timeout: 30000,
})

// Other Constants

export const PREFERRED_COUNTRIES = ["en"]
