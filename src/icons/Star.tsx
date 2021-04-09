import * as React from "react"
import { Icon } from "@chakra-ui/react"
export const StarIcon = props => {
  return (
    <Icon
      color="warning.base"
      height="1em"
      mr="1px"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M23.363 8.584l-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 00-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 001.103.777L12 20.245l6.59 3.643a.75.75 0 001.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 00-.423-1.266z"
        fill="currentColor"
        stroke="currentColor"
      />
    </Icon>
  )
}

export const StarIconNoFill = props => {
  return (
    <Icon
      color="warning.base"
      strokeWidth="2px"
      height="1em"
      mr="1px"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M23.363 8.584l-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 00-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 001.103.777L12 20.245l6.59 3.643a.75.75 0 001.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 00-.423-1.266z"
        stroke="currentColor"
        fill="white"
      />
    </Icon>
  )
}
