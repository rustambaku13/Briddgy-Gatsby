import { Box, Flex, IconButton, Text, VStack } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import moment from "moment"
import React, { useState } from "react"

import { FRONTEND_DATE_FORMAT } from "../../../api"
import { removeContract } from "../../../api/contract"
import { CheckIcon } from "../../../icons/Check"
import { CrossIcon } from "../../../icons/Cross"
import { Contract } from "../../../types/contract"
import { tripCityAnywhere } from "../../../utils/misc"
import { Avatar } from "../../Avatar/Avatar"
import { Rating } from "../../Misc/Rating"
/* 
===================================
PROPOSAL OF A TRIP TO AN ORDER
===================================
*/
export const ToOrderProposalCard = chakra(
  ({
    className,
    contract,
    rejectCallback,
    acceptCallback,
  }: {
    className?: any
    contract: Contract
    rejectCallback?: any
    acceptCallback?: any
  }) => {
    const [loading, setLoading] = useState(false)

    const rejectHandler = () => {
      setLoading(true)
      removeContract(contract.id)
        .then(() => {
          rejectCallback ? rejectCallback(contract) : null
        })
        .finally(() => {
          setLoading(false)
        })
    }
    return (
      <VStack spacing={2} w="100%">
        <Flex alignItems="center" w="100%">
          <Avatar mr={2} user={contract.trip.owner} />
          <Box>
            <Text>{`${contract.trip.owner.first_name} ${contract.trip.owner.last_name}`}</Text>
            <Rating
              fontSize="400"
              readonly
              rating={contract.trip.owner.rating}
            />
          </Box>
          <Text
            variant="secondary"
            fontWeight="700"
            textAlign="right"
            fontSize="400"
            flex={1}
          >
            {moment(contract.trip.date).format(FRONTEND_DATE_FORMAT)}
          </Text>
        </Flex>
      </VStack>
    )
  }
)
