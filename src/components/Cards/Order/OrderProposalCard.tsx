import { Box, Flex, IconButton, Text, VStack } from "@chakra-ui/react"
import { Avatar } from "../../Avatar/Avatar"
import moment from "moment"
import { chakra } from "@chakra-ui/system"
import React from "react"
import { bmify, FRONTEND_DATE_FORMAT } from "../../../api"
import { Contract } from "../../../types/contract"
import { CheckIcon } from "../../../icons/Check"
import { CrossIcon } from "../../../icons/Cross"
import { tripCityAnywhere } from "../../../utils/misc"

export const OrderProposalCard = chakra(
  ({ className, contract }: { className?: any; contract: Contract }) => {
    return (
      <VStack spacing={3} w="100%" p={3} className={className}>
        <Flex w="100%" alignItems="center">
          <Avatar user={contract.trip.owner} />
          <Text
            ml={2}
          >{`${contract.trip.owner.first_name} ${contract.trip.owner.last_name}`}</Text>
          <Box ml="auto">
            <IconButton
              mr={1}
              aria-label="Accept"
              variant="outline"
              icon={<CrossIcon color="tomato" />}
            />
            <IconButton
              aria-label="Accept"
              variant="outline"
              icon={<CheckIcon color="green.500" />}
            />{" "}
          </Box>
        </Flex>
        <Flex alignItems="center" w="100%">
          <Text fontSize="lg">
            {tripCityAnywhere(contract.trip.source.city)},{" "}
            {contract.trip.source.country_en} -{" "}
            {tripCityAnywhere(contract.trip.destination.city)},{" "}
            {contract.trip.destination.country_en}
          </Text>
          <Text ml="auto" variant="secondary">
            {moment(contract.trip.date).format(FRONTEND_DATE_FORMAT)}
          </Text>
        </Flex>
        <Text variant="secondary" w="100%">
          Required reward: &nbsp;
          <Text as="span" fontWeight="500" fontSize="lg">
            ${contract.price_bid}
          </Text>
        </Text>
        <Text w="100%" variant="secondary" fontSize="sm">
          <strong>Description: </strong>
          {contract.trip.description}
        </Text>
      </VStack>
    )
  }
)
