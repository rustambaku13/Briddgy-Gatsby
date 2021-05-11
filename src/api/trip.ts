import { AxiosResponse } from "axios"
import moment from "moment"
import { Orders } from "../types/orders"
import { Trip, Trips } from "../types/trip"
import { axios_normal, FRONTEND_DATE_FORMAT } from "./index"
export async function getTrips(params = {}): Promise<AxiosResponse<Trips>> {
  const data = await axios_normal.get(`/trip-order/api/trips/`, { params })
  data.data.results.map((item: Trip) => {
    item.date = moment(item.date).format(FRONTEND_DATE_FORMAT)
  })
  return data
}
export async function getMyTrips(page = 1): Promise<AxiosResponse<Trips>> {
  const data = await axios_normal.get(`/trip-order/api/my/trips/`, {
    params: { page },
  })
  data.data.results.map((item: Trip) => {
    item.date = moment(item.date).format(FRONTEND_DATE_FORMAT)
  })
  return data
}
export async function getTrip(id): Promise<AxiosResponse<Trip>> {
  const data = await axios_normal.get(`/trip-order/api/trips/${id}/`)
  data.data.date = moment(data.data.date).format(FRONTEND_DATE_FORMAT)
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
  return await axios_normal.get(`/trip-order/api/trips/${id}/suggestions/`, {
    params: {
      owner,
    },
  })
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
  data.data.date = moment(data.data.date).format(FRONTEND_DATE_FORMAT)
  return data
}
