import { Order, Orders } from './../types/orders';
import { Trip, Trips } from './../types/trip';
import { User } from "./../types/user"
import { AxiosResponse } from "axios"
import { axios_normal, bmify } from "./index"
import { Reviews } from "../types/review"
import { momentize } from '../utils/momentize';
import { affiliatize } from '../utils/affiliate';
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


export async function getMyDetails(): Promise<AxiosResponse<User>> {
  const data= await axios_normal.get(`/main/api/users/me/`)
  if(data.data.avatarpic)data.data.avatarpic = bmify(data.data.avatarpic)
  return data
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

export async function getNotifications() {
  const data =  await axios_normal.get("/trip-order/api/notifications/readAll")
  data.data.results.forEach(item => {
      momentize(item,"date_created")
  });
  return data
}

export async function readnotifications() {
  return  await axios_normal.post("/trip-order/api/notifications/readAll")
  
  
}

export async function avatarPicUpload(file) {
  return await axios_normal.put(`/main/api/fileupload/userimage/`,file)
}

export async function redeemPromoCode(code) {
  return await axios_normal.post(`/main/api/promo/`,{code})
}



// Other Users 

export async function getUserReviews(userId): Promise<Reviews> {
  return axios_normal.get(`main/api/users/${userId}/reviews'`)
}
export async function getUserDetails(userId): Promise<User> {
  return axios_normal.get(`main/api/users/${userId}/`)
}
export async function getUserTrips(userId): Promise<AxiosResponse<Trips>> {
  const data =  await axios_normal.get(`trip-order/api/users/${userId}/trips/`)
  data.data.results.forEach((item: Trip) => momentize(item))
  return data
}
export async function getUserOrders(userId): Promise<AxiosResponse<Orders>> {
  const data = await axios_normal.get(`trip-order/api/users/${userId}/orders/`)
  data.data.results.forEach((item: Order) => {
    momentize(item)
    affiliatize(item)
  })
  return data
}
