import { Icon } from "@chakra-ui/react"
import React from "react"
export const ChevronLeftIcon = props => (
  <Icon
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    transform="rotate(180deg)"
    viewBox="0 0 24 24"
    {...props}
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </Icon>
)
