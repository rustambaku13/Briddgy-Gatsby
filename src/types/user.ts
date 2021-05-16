export interface User {
  id: number
  first_name: string
  last_name: string
  balance: string
  avatarpic: string
  rating: number
  online: boolean
  email: string
  is_number_verified: boolean
  is_email_verified: boolean
  is_photo_verified: boolean
  is_stripe_verified: "U" | "I" | "C"
  tinode_user_id: string
  last_online: string
  phone: string
  ranking: number
  my_promo: string
  promo_balance: string
  used_promo: boolean
  unread_notifications: number
}
