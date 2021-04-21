import { AxiosResponse } from "axios"
import { Orders } from "../types/orders"
import { Trip, Trips } from "../types/trip"
import { Locations } from "./../types/location"
import { axios_normal } from "./index"
export async function getTrips(params = {}): Promise<AxiosResponse<Locations>> {
  return axios_normal.get(`/trip-order/api/trips/`, { params })
}
export async function getMyTrips(page = 1): Promise<AxiosResponse<Trips>> {
  return await axios_normal.get(`/trip-order/api/my/trips/`, {
    params: { page },
  })
}
export async function getTrip(id): Promise<AxiosResponse<Trip>> {
  return await axios_normal.get(`/trip-order/api/trips/${id}/`)
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
  destination,
  source,
  description,
  weight_limit,
}) {
  return await axios_normal.post(`/trip-order/api/trips/`, {
    date: date,
    destination,
    source,
    description,
    weight_limit,
  })
}
