import React, { useEffect } from "react"
import { ConfirmEmailModal } from "../Modals/ConfirmEmailModal"
import { PhoneNumberVerifyModal } from "../Modals/PhoneNumberVerifyModal"
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

      {children}
    </>
  )
}
