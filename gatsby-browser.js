import React from "react"
import myTheme from "./src/theme"
import { ChakraProvider } from "@chakra-ui/react"
import "./src/styles/index.scss"
import "react-modern-calendar-datepicker/lib/DatePicker.css"
import "swiper/swiper.scss"

export function wrapRootElement({ element }) {
  return <ChakraProvider theme={myTheme}>{element}</ChakraProvider>
}
