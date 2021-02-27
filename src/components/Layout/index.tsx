import Navbar from "../Navbar"
import React from "react"
export default ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
