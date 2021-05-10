import { Order } from "./../types/orders"
import { Trips } from "./../types/trip"
import { AxiosResponse } from "axios"
import { Orders } from "../types/orders"
import { axios_normal, FRONTEND_DATE_FORMAT } from "./index"
import { Reviews } from "../types/review"
import moment from "moment"
import { getAffiliateLink } from "../utils/affiliate"
export async function getOrders(params = {}): Promise<AxiosResponse<Orders>> {
  const data = await axios_normal.get(`/trip-order/api/orders/`, { params })
  data.data.results.map((item: Order) => {
    item.date = moment(item.date).format(FRONTEND_DATE_FORMAT)
    if (item.order_url) {
      item.order_url = getAffiliateLink(item.order_url)
    }
  })
  return data
}
export async function getOrder(id): Promise<AxiosResponse<Order>> {
  const data = await axios_normal.get(`/trip-order/api/orders/${id}/`)
  data.data.date = moment(data.data.date).format(FRONTEND_DATE_FORMAT)
  if (data.data.order_url) {
    data.data.order_url = getAffiliateLink(data.data.order_url)
  }
  return data
}
export async function getMyOrders(page = 1): Promise<AxiosResponse<Orders>> {
  const data = await axios_normal.get(`/trip-order/api/my/orders/`, {
    params: { page },
  })
  data.data.results.map((item: Order) => {
    item.date = moment(item.date).format(FRONTEND_DATE_FORMAT)
    if (item.order_url) {
      item.order_url = getAffiliateLink(item.order_url)
    }
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
  return await axios_normal.get(`/trip-order/api/orders/${id}/suggestions/`, {
    params: {
      owner,
    },
  })
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
  return await axios_normal.post(`/trip-order/api/orders/`, {
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
}

export async function uploadFilestoOrder(files) {
  return await axios_normal.put(`/trip-order/api/fileupload/orderimage/`, files)
}

export async function fetchScraperData(url) {
  return await axios_normal.get(`/scraper`, {
    params: {
      q: url,
    },
  })
}
