import React from "react"
import { Loader } from "./Loader"
import Flags from "country-flag-icons/react/3x2"
import { Box } from "@chakra-ui/layout"
// const Flags = React.lazy(() => import("country-flag-icons/react/3x2"))

export const CountryFlagsLazy = ({ code, country }) => {
  const CountryFlag = Flags?.[code]
  if (!CountryFlag) {
    return (
      <Box
        borderWidth="1px"
        p={1}
        boxSizing="content-box"
        lineHeight="1rem"
        className="flag-autocomplete"
      >
        <small>{code}</small>
      </Box>
    )
  }

  return (
    // <React.Suspense fallback={<Loader />}>
    <CountryFlag
      p={1}
      boxSizing="content-box"
      className="flag-autocomplete"
      title={country}
    />
    // </React.Suspense>
  )
}
