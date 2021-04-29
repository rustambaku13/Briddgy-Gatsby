import { User } from "./user"

export interface Review {
  id: number
  reviewFrom: User
  reviewTo: number
  comment: string
  date: string
  rating: number
}
export interface Reviews {
  count: number
  results: Review[]
  loading?: boolean
}
