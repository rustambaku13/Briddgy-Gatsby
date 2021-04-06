import { Box } from "@chakra-ui/layout"
import React, { useEffect } from "react"
import { ConfirmEmailModal } from "../Modals/ConfirmEmailModal"
import { PhoneNumberVerifyModal } from "../Modals/PhoneNumberVerifyModal"
import { BottomNavbarDefault } from "../Navbar"
import { Router } from "@reach/router"
import MyTripPage from "../../dynamic/Trip"
import "../../store/UserStore"
import { MakeProposalOrderModal } from "../Modals/MakeProposaltoOrderModal"
import MyOrderPage from "../../dynamic/Order"

export default ({ children }) => {
  return (
    <>
      <ConfirmEmailModal />
      <PhoneNumberVerifyModal />
      <MakeProposalOrderModal />
      <Router>
        <MyTripPage path="/trips/:tripId" />
        <MyOrderPage path="/orders/:orderId" />
        <Box default mb={["70px", "70px", 0]} w="100%" h="100%">
          {children}
        </Box>
      </Router>
      {/* <Box path="salam" mb={["70px", "70px", 0]} w="100%" h="100%">
        {children}
      </Box> */}
      <BottomNavbarDefault />
    </>
  )
}
