import { Select } from "@chakra-ui/select"
import React from "react"

export const CountrySelector = ({ register }) => {
  return (
    <Select
      name="country"
      ref={register({ required: "Please Select a Country" })}
      placeholder="Country"
    >
      <option value="US">United States</option>
      <option value="UK">United Kingdom</option>
      <option value="MX">Mexico</option>
    </Select>
  )
}
