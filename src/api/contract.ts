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

  return await axios_normal.post(`/contracts/sign/`, {
    order,
    trip,
    price_bid,
  })
}
