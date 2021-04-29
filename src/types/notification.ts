import { User } from "./user"

export interface Notification {
  content_type: number
  date_created: string
  object_id: number
  verb: "contractBID"
  sender: User
}

export interface Notifications {
  results: Notification[]
  count: number
  loading?: boolean
  previous?: any
  next?: any
}
