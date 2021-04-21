import { axios_normal } from "."

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
export async function removeContract(id) {
  return await axios_normal.delete(`/trip-order/api/delete/contracts/${id}/`)
}
export async function getTripProposals(id) {
  return await axios_normal.get(`/trip-order/api/proposals/trips/${id}/`)
}
export async function getTripContracts(id) {
  return await axios_normal.get(`/trip-order/api/contracts/trips/${id}/`)
}
export async function getOrderProposals(id) {
  return await axios_normal.get(`/trip-order/api/proposals/orders/${id}/`)
}

export async function getOrderContracts(order: number) {
  return await axios_normal.get(`/trip-order/api/contracts/orders/${order}/`)
}
