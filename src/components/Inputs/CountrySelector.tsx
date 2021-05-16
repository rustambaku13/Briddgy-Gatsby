import { Select } from "@chakra-ui/select"
import React from "react"

export const CountrySelector = ({ register }) => {
  return (
    <Select
      name="country"
      ref={register({ required: "Please Select a Country" })}
      placeholder="Country"
    >
      <option value="AR">Argentina</option> 
      <option value="AU">Australia</option> 
      <option value="AT">Austria</option>
      <option value="BE">Belgium</option>
      <option value="BR">Brazil</option>
      <option value="BG">Bulgaria</option>
      <option value="CA">Canada</option>
      <option value="CY">Cyprus</option>
      <option value="CZ">Czech Republic</option>
      <option value="DK">Denmark</option>
      <option value="EE">Estonia</option>
      <option value="FI">Finland</option>
      <option value="FR">France</option>
      <option value="DE">Germany</option>
      <option value="GR">Greece</option>
      <option value="HK">Hong Kong</option>
      <option value="HU">Hungary</option>
      <option value="IE">Ireland</option>
      <option value="IL">Israel</option>
      <option value="IT">Italy</option>
      <option value="LV">Latvia</option>
      <option value="LT">Lithuania</option>
      <option value="LU">Luxembourg</option>
      <option value="MT">Malta</option>
      <option value="NL">Netherlands</option>
      <option value="NZ">New Zealand</option>
      <option value="NO">Norway</option>
      <option value="PE">Peru</option>
      <option value="PL">Poland</option>
      <option value="PT">Portugal</option>
      <option value="RO">Romania</option>
      <option value="SG">Singapore</option>
      <option value="SK">Slovakia</option>
      <option value="SI">Slovenia</option>
      <option value="ES">Spain</option>
      <option value="SE">Sweden</option>
      <option value="CH">Switzerland</option>
      <option value="GB">United Kingdom </option>
      <option value="US">United States </option>
    </Select>
  )
}
