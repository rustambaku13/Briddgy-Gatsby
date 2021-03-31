import { Box, HStack } from "@chakra-ui/layout"
import React from "react"
import { Contract, Contracts } from "../../types/contract"

const stateOrdering = ["BID", "SET", "SIN", "FRZ", "GRB", "DLV", "FIN"]

export const ContractSteps = ({ contract }: { contract: Contract }) => {
  const step = stateOrdering.indexOf(contract.state)

  return (
    <HStack spacing={0}>
      <Box borderBottom="4px" borderColor="blue.900" px={5} py={5}>
        Proposed
      </Box>
      <Box
        borderBottom="4px"
        borderColor={step >= 1 ? "blue.900" : "gray.200"}
        px={5}
        py={5}
      >
        Accepted
      </Box>
      <Box
        borderBottom="4px"
        borderColor={step >= 2 ? "blue.900" : "gray.200"}
        px={5}
        py={5}
      >
        Paid
      </Box>
      <Box
        borderBottom="4px"
        borderColor={step >= 3 ? "blue.900" : "gray.200"}
        px={5}
        py={5}
      >
        Bought
      </Box>
      <Box
        borderBottom="4px"
        borderColor={step >= 4 ? "blue.900" : "gray.200"}
        px={5}
        py={5}
      >
        Delivered
      </Box>
    </HStack>
  )
}
