import { AxiosResponse } from "axios"
import moment from "moment"
import { Order, Orders } from "../types/orders"
import { Trip, Trips } from "../types/trip"
import { affiliatize } from "../utils/affiliate"
import { momentize } from "../utils/momentize"
import { axios_normal, FRONTEND_DATE_FORMAT } from "./index"
export async function getTrips(params = {}): Promise<AxiosResponse<Trips>> {
  const data = await axios_normal.get(`/trip-order/api/trips/`, { params })
  data.data.results.forEach((item: Trip) => momentize(item))
  return data
}
export async function getMyTrips(page = 1): Promise<AxiosResponse<Trips>> {
  const data = await axios_normal.get(`/trip-order/api/my/trips/`, {
    params: { page },
  })
  data.data.results.forEach((item: Trip) => momentize(item))
  return data
}
export async function getTrip(id): Promise<AxiosResponse<Trip>> {
  const data = await axios_normal.get(`/trip-order/api/trips/${id}/`)
  momentize(data.data)
  return data
}
export async function removeTrip(id){
  return await axios_normal.delete(`/trip-order/api/trips/${id}/`)
}

export async function emailSuggestedOrderers(source_id, dest_id) {
  return await axios_normal.get(
    `/trip-order/api/emailorderers/${source_id}/${dest_id}/`
  )
}

export async function getSuggestedOrders(
  id,
  owner?
): Promise<AxiosResponse<Orders>> {
  const data= await axios_normal.get(`/trip-order/api/trips/${id}/suggestions/`, {
    params: {
      owner,
    },
  })
  data.data.results.forEach((item: Order) => {
    momentize(item)
    affiliatize(item)

  })
  return data

}

export async function addTrip({
  date,
  dest_id,
  dest_code,
  src_id,
  src_code,
  description,
  weight_limit,
}) {
  const data= await axios_normal.post(`/trip-order/api/trips/`, {
    date: date,
    dest_id,
    dest_code,
    src_id,
    src_code,
    description,
    weight_limit,
  })
  momentize(data.data)

  return data
}
