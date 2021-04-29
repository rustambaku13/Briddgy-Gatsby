import React from "react"
import { defaultContracts, Contract } from "../types/contract"
import { defaultOrders } from "../types/orders"
import { defaultTrips } from "../types/trip"

interface NagiationContextInterface {
  page:
    | "home" // Landing Page
    | "login" // Login page
    | "signup" // Signup Page
    | "orders" // Orders Page or specific Order page
    | "trips" // Trips page or specific Trip Page
    | "profile" // Profile Page My or Someones
    | "profile-trip" // Profile Page My or Someones
    | "profile-order" // Profile Page My or Someones
    | "travel" // Travel add Trip
    | "order" // Order add order
    | "faq" // Faq Page
    | "message" // Chat Page
}

export const NavigationContext = React.createContext<NagiationContextInterface>(
  { page: "home" }
)

export const TripPageState = React.createContext({
  suggested: defaultOrders,
  trip: null,
  setSuggested: null,
  proposals: defaultContracts,
  setProposals: null,
  contracts: defaultContracts,
  setContracts: null,
})
export const OrderPageState = React.createContext({
  suggested: defaultTrips,
  contract: null,
  setContract: null,
  step: 0,
  setStep: null,
  order: null,
  setSuggested: null,
  proposals: defaultContracts,
  setProposals: null,
})
