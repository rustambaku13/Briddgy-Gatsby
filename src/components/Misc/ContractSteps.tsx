import { Box, Flex, HStack } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import React from "react"
import { Contract, Contracts } from "../../types/contract"

const stateOrdering = ["BID", "SET", "FRZ", "GRB", "DLV", "FIN"]

export const ContractSteps = chakra(
  ({ contract, className }: { contract: Contract; className?: any }) => {
    const step = stateOrdering.indexOf(contract.state) + 1

    return (
      <HStack
        pb={3}
        mt={4}
        style={{ "--count": "5" }}
        fontSize={[400, 400, 500]}
        className="contract-steps"
        spacing={3}
      >
        <Box>Proposed</Box>
        <Box>Accepted</Box>
        <Box>Paid</Box>
        <Box>Bought</Box>
        <Box>Delivered</Box>{" "}
        <Box
          as="span"
          pos="absolute"
          bottom="0px"
          style={{ margin: "0px" }}
          left="0px"
          h="3px"
          width="100%"
          bg="outline.light"
        ></Box>
        <li style={{ "--step": step }}></li>{" "}
      </HStack>
    )
  }
)
