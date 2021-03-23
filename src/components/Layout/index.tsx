import { Box } from "@chakra-ui/layout"
import React, { useEffect } from "react"
import { ConfirmEmailModal } from "../Modals/ConfirmEmailModal"
import { PhoneNumberVerifyModal } from "../Modals/PhoneNumberVerifyModal"
import { BottomNavbarDefault } from "../Navbar"
export default ({ children }) => {
  useEffect(() => {
    // const animation = anime({
    //   targets: "#navbar_search",
    //   opacity: [0, 1],
    //   delay: function (el, i) {
    //     return i * 100
    //   },
    //   elasticity: 200,
    //   easing: "easeInOutSine",
    //   autoplay: false,
    // })
  }, [])
  return (
    <>
      <ConfirmEmailModal />
      <PhoneNumberVerifyModal />

      <Box mb={["70px", "70px", 0]} w="100%" h="100%">
        {children}
      </Box>

      <BottomNavbarDefault />
    </>
  )
}
