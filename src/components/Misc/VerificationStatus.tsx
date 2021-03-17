import { Tag } from "@chakra-ui/tag"
import React from "react"

export const VerificationStatus = ({ isVerified }) => {
  if (isVerified)
    return (
      <Tag ml={2} fontSize="xs" colorScheme="green">
        Verfied
      </Tag>
    )
  return (
    <Tag ml={2} fontSize="xs" colorScheme="yellow">
      Pending
    </Tag>
  )
}
