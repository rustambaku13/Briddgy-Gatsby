import React from "react"
import { Icon } from "@chakra-ui/react"

export const RotateIcon = props => {
  return (
    <Icon
      x="0px"
      y="0px"
      fill="currentColor"
      width="1em"
      viewBox="-60 -60 600 600"
      height="1em"
      xmlSpace="preserve"
      {...props}
    >
      <path d="M102 204L0 306l102 102v-76.5h178.5v-51H102V204zm357-51L357 51v76.5H178.5v51H357V255l102-102z" />
    </Icon>
  )
}

export default RotateIcon
