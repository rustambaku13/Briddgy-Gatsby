import axios from "axios"
export const BASE_MEDIA = `https://briddgyazbucket.s3.amazonaws.com/static`
export const bmify = src => `${BASE_MEDIA}/${src}`
export const BACKEND_DATE_FORMAT = "YYYY-MM-DD"
export const FRONTEND_DATE_FORMAT = "DD MMM, YYYY"
export const DEVELOPMENT = false

let axios_normal = axios.create({
  // baseURL: "http://localhost:8002/",
  baseURL: "https://backend.briddgy.com",
  timeout: 30000,
})
if(DEVELOPMENT){
  axios_normal = axios.create({
    // baseURL: "http://localhost:8002/",
    baseURL: "http://ec2-18-222-99-114.us-east-2.compute.amazonaws.com",
    timeout: 30000,
  })
}
export {axios_normal}
// Other Constants

export const PREFERRED_COUNTRIES = ["en"]
