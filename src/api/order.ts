import { Order } from "./../types/orders"
import { Trips } from "./../types/trip"
import { AxiosResponse } from "axios"
import { Orders } from "../types/orders"
import { axios_normal } from "./index"
export async function getOrders(params = {}): Promise<AxiosResponse<Orders>> {
  return axios_normal.get(`/trip-order/api/orders/`, { params })
}
export async function getOrder(id): Promise<AxiosResponse<Order>> {
  return await axios_normal.get(`/trip-order/api/orders/${id}/`)
}
export async function getMyOrders(page = 1): Promise<AxiosResponse<Orders>> {
  return await axios_normal.get(`/trip-order/api/my/orders/`, {
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
  destination,
  source,
  description,
  weight,
  order_url,
  item_price,
  host,
  order_type,
}) {
  return await axios_normal.post(`/trip-order/api/orders/`, {
    price,
    title,
    destination,
    source,
    description,
    weight,
    order_url,
    host,
    item_price,
    order_type,
  })
}

export async function uploadFilestoOrder(files) {
  return await axios_normal.put(`/trip-order/api/fileupload/orderimage/`, files)
}
