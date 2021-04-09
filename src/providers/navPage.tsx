import React from "react"

interface NagiationContextInterface {
  page:
    | "home" // Landing Page
    | "login" // Login page
    | "signup" // Signup Page
    | "orders" // Orders Page or specific Order page
    | "trips" // Trips page or specific Trip Page
    | "profile" // Profile Page My or Someones
    | "travel" // Travel add Trip
    | "order" // Order add order
}

export const NavigationContext = React.createContext<NagiationContextInterface>(
  { page: "home" }
)
