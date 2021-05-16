import { Order } from "./../types/orders"
import { Trips } from "./../types/trip"
import { AxiosResponse } from "axios"
import { Orders } from "../types/orders"
import { axios_normal, FRONTEND_DATE_FORMAT } from "./index"
import { Reviews } from "../types/review"
import moment from "moment"
import { affiliatize, getAffiliateLink } from "../utils/affiliate"
import { momentize } from "../utils/momentize"
export async function getOrders(params = {}): Promise<AxiosResponse<Orders>> {
  const data = await axios_normal.get(`/trip-order/api/orders/`, { params })
  data.data.results.forEach((item: Order) => {
    momentize(item)
    affiliatize(item)
  })
  return data
}
export async function getOrder(id): Promise<AxiosResponse<Order>> {
  const data = await axios_normal.get(`/trip-order/api/orders/${id}/`)
  momentize(data.data)
  affiliatize(data.data)
  return data
}
export async function getMyOrders(page = 1): Promise<AxiosResponse<Orders>> {
  const data = await axios_normal.get(`/trip-order/api/my/orders/`, {
    params: { page },
  })
  data.data.results.forEach((item: Order) => {
    momentize(item)
    affiliatize(item)
  })
  return data
}

export async function getMyReviews(page = 1): Promise<AxiosResponse<Reviews>> {
  return await axios_normal.get(`/main/api/users/my/reviews/`, {
    params: { page },
  })
}

export async function emailSuggestedTravellers(source_id, dest_id) {
  return await axios_normal.get(
    `/trip-order/api/emailtravelers/${source_id}/${dest_id}/`
  )
}
export async function getSuggestedTrips(
  id,
  owner?
): Promise<AxiosResponse<Trips>> {
  const data= await axios_normal.get(`/trip-order/api/orders/${id}/suggestions/`, {
    params: {
      owner,
    },
  })
  data.data.results.forEach((item: Order) => {
    momentize(item)
  })
  return data
}

export async function addOrder({
  price,
  title,
  src_id,
  src_code,
  dest_code,
  dest_id,
  description,
  weight,
  order_url,
  item_price,
  host,
}) {
  const data = await axios_normal.post(`/trip-order/api/orders/`, {
    price,
    title,
    dest_id,
    src_id,
    description,
    weight,
    order_url,
    src_code,
    dest_code,
    host,
    item_price,
  })
  
  data.data.date = moment(data.data.date).format(FRONTEND_DATE_FORMAT)
  return data
}

export async function remvoeOrder(id){
  return await axios_normal.delete(`/trip-order/api/orders/${id}/`)

}

export async function uploadFilestoOrder(files) {
  return await axios_normal.put(`/trip-order/api/fileupload/orderimage/`, files)
}

export async function getQuote(item_price,reward,promo,stripe_balance){
  return await axios_normal.post(`/main/api/payment/quote/`,{item_price,reward,promo,stripe_balance})
}


export async function fetchScraperData(url) {
  return await axios_normal.get(`/scraper`, {
    params: {
      q: url,
    },
  })
}
