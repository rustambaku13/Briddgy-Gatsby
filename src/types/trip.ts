import { User } from "./user"
import { Location } from "./location"
export interface Trip {
  id: number
  date: string
  description: string | null
  destination: Location
  source: Location
  weight_limit: number
  owner: User
  number_of_contracts: number
}
export interface Trips {
  count: number
  next?: null | string
  previous?: null | string
  results: Trip[]
  loading: undefined | boolean
}

export const defaultTrips = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  loading: false,
}
