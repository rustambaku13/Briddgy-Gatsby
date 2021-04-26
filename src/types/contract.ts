import { Order } from "./orders"
import { Trip } from "./trip"

export interface Contract {
  dateSigned: string
  id: number
  traveler: number
  orderer: number
  price_bid: string
  item_price: string | null
  total_price: string | null
  state: "BID" | "SET" | "SIN" | "FRZ" | "GRB" | "DLV" | "FIN"
  trip: Trip
  order: Order
}
export interface Contracts {
  count: number
  next: null | string
  previous: null | string
  results: Contract[]
  loading: boolean
}

export const defaultContracts = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  loading: false,
}
