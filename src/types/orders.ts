import { User } from "./user"
import { Location } from "./location"
import { Trip } from "./trip"

export interface Order {
  id: number
  date: string
  title: string
  description: string | null
  destination: Location
  source: Location
  weight: number
  host: string
  owner: User
  is_active: boolean
  contract_price: number | null
  price: number
  order_type: "P" | "B"
  item_price: number
  order_url: string

  orderimage: string[]
  trip: Trip
  deliverer: number
}
export interface Orders {
  count: number
  next: null | string
  previous: null | string
  results: Order[]
  loading?: undefined | boolean
}
export const defaultOrders = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  loading: false,
}
