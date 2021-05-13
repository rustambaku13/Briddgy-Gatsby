import { Contract } from "./../types/contract"
import { AxiosResponse } from "axios"
import { axios_normal } from "."
import { momentize } from "../utils/momentize"
import { affiliatize } from "../utils/affiliate"

export async function addContract({
  order,
  trip,
  price_bid,
}: {
  order: number
  trip: number
  price_bid?: string
}) {
  //Those are IDs

  return await axios_normal.post(`/trip-order/api/contracts/sign/`, {
    order,
    trip,
    price_bid,
  })
}

export async function acceptContract(orderId, tripId) {
  return await axios_normal.post(`/trip-order/api/contracts/accept/`, {
    order: orderId,
    trip: tripId,
  })
}

export async function dropReview(contract_id, data) {
  return await axios_normal.post(
    `trip-order/api/review/contracts/${contract_id}/`,
    data
  )
}

export async function itemGrabbed(contract_id) {
  return await axios_normal.post(
    `trip-order/api/grab/contracts/${contract_id}/`
  )
}
export async function itemDelivered(contract_id) {
  return await axios_normal.post(
    `trip-order/api/deliver/contracts/${contract_id}/`
  )
}

export async function removeContract(id) {
  return await axios_normal.delete(`/trip-order/api/delete/contracts/${id}/`)
}
export async function getTripProposals(id) {
  const data =  await axios_normal.get(`/trip-order/api/proposals/trips/${id}/`)
  data.data.results.forEach((item:Contract)=>{
    momentize(item.order)
    affiliatize(item.order)
    momentize(item.trip)
  })
  return data
}
export async function getTripContracts(id) {
  const data =  await axios_normal.get(`/trip-order/api/contracts/trips/${id}/`)
  data.data.results.forEach((item:Contract)=>{
    momentize(item.order)
    affiliatize(item.order)
    momentize(item.trip)
  })
  return data
}
export async function getOrderProposals(id) {
  const data =  await axios_normal.get(`/trip-order/api/proposals/orders/${id}/`)
  data.data.results.forEach((item:Contract)=>{
    momentize(item.order)
    affiliatize(item.order)
    momentize(item.trip)
  })
  return data
}

export async function getOrderContracts(
  order: number
): Promise<AxiosResponse<Contract>> {
  const data= await axios_normal.get(`/trip-order/api/contracts/orders/${order}/`)
  data.data.results.forEach((item:Contract)=>{
    momentize(item.order)
    affiliatize(item.order)
    momentize(item.trip)
  })
  return data
}
