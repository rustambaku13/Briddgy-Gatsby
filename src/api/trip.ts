import { axios_normal } from "./index"
import { Locations } from "./../types/location"
import { BACKEND_DATE_FORMAT } from "."
import { AxiosPromise, AxiosResponse } from "axios"
import { Trips, Trip } from "../types/trip"
import { Orders } from "../types/orders"
export async function getTrips(params = {}): Promise<AxiosResponse<Locations>> {
  return axios_normal.get(`/trips/`, { params })
}
export async function getMyTrips(page = 1): Promise<AxiosResponse<Trips>> {
  return await axios_normal.get(`/my/trips/`, { params: { page } })
}
export async function getTrip(id): Promise<AxiosResponse<Trip>> {
  return await axios_normal.get(`/trips/${id}/`)
}

export async function getTripProposals(id) {
  return await axios_normal.get(`/proposals/trips/${id}/`)
}
export async function getTripContracts(id) {
  return await axios_normal.get(`/contracts/trips/${id}/`)
}

export async function emailSuggestedOrderers(source_id, dest_id) {
  return await axios_normal.get(`/emailorderers/${source_id}/${dest_id}/`)
}

export async function getSuggestedOrders(
  id,
  owner?
): Promise<AxiosResponse<Orders>> {
  return await axios_normal.get(`/trips/${id}/suggestions/`, {
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
  return await axios_normal.post(`/trips/`, {
    date: date,
    destination,
    source,
    description,
    weight_limit,
  })
}
