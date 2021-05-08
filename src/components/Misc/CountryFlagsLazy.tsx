import React from "react"
import { Loader } from "./Loader"
import Flags from "country-flag-icons/react/3x2"
// const Flags = React.lazy(() => import("country-flag-icons/react/3x2"))

export const CountryFlagsLazy = () => {
  return (
    // <React.Suspense fallback={<Loader />}>
    <Flags.US className="flag-autocomplete" title="United States" />
    // </React.Suspense>
  )
}
