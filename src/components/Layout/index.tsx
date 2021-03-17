import Navbar from "../Navbar"
import React from "react"
import { ConfirmEmailModal } from "../Modals/ConfirmEmailModal"
import { PhoneNumberVerifyModal } from "../Modals/PhoneNumberVerifyModal"

export default ({ children }) => {
  return (
    <>
      <ConfirmEmailModal />
      <PhoneNumberVerifyModal />
      <Navbar />
      {children}
    </>
  )
}
