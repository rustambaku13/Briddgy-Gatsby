import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import moment from "moment"
import React, { useContext, useState } from "react"

import { FRONTEND_DATE_FORMAT } from "../../../api"
import { acceptContract, removeContract } from "../../../api/contract"
import { CheckIcon } from "../../../icons/Check"
import { CrossIcon } from "../../../icons/Cross"
import { OrderPageState } from "../../../providers/navPage"
import { Contract } from "../../../types/contract"
import { Order } from "../../../types/orders"
import { getCountryFromCode, tripCityAnywhere } from "../../../utils/misc"
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
    acceptButton,
    rejectButton,
  }: {
    className?: any
    contract: Contract
    acceptButton
    rejectButton
  }) => {
    return (
      <VStack alignItems="flex-start" spacing={3} py={4} w="100%">
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
          <Text variant="light" textAlign="right" fontSize="400" flex={1}>
            Proposed {moment(contract.dateSigned).fromNow()}
          </Text>
        </Flex>

        <Text variant="light">
          Traveling on &nbsp;
          <Text as="span" color="blue.400">
            {moment(contract.trip.date).format(FRONTEND_DATE_FORMAT)}
          </Text>
        </Text>
        <Text variant="light">
          From{" "}
          <Text as="span" color="text.dark">
            {tripCityAnywhere(contract.trip.src.details[0].en.city)},{" "}
            {getCountryFromCode(contract.trip.src.countryCode)}
          </Text>{" "}
          To{" "}
          <Text as="span" color="text.dark">
            {tripCityAnywhere(contract.trip.dest.details[0].en.city)},{" "}
            {getCountryFromCode(contract.trip.dest.countryCode)}
          </Text>
        </Text>
        <Text fontSize="500" variant="light" textAlign="right">
          Requested reward{" "}
          <Text as="strong" color="text.dark" fontSize="700" fontWeight="700">
            ${contract.price_bid}
          </Text>
        </Text>
        <HStack w="100%" spacing={6}>
          {rejectButton}
          {acceptButton}
        </HStack>
      </VStack>
    )
  }
)

export const ToOrderProposalCardWithAccept = (props: {
  contract: Contract
}) => {
  const context = useContext(OrderPageState)
  const order: Order = context.order
  const [rejectLoading, setRejectLoading] = useState(false)
  const [acceptLoading, setAcceptLoading] = useState(false)
  const acceptHandler = () => {
    setAcceptLoading(true)
    acceptContract(props.contract.order.id, props.contract.trip.id)
      .then(() => {
        context.proposals.results = context.proposals.results.filter(
          (item: Contract) => item.id != props.contract.id
        )
        context.proposals.count--
        order.contract_price = props.contract.price_bid
        order.deliverer = props.contract.trip.id
        props.contract.state = "SET"
        context.setContract(props.contract)
        context.setStep(1)
      })
      .catch(() => {
        console.error("Error has occured")
      })
      .finally(() => {
        setAcceptLoading(false)
      })
  }
  const rejectHandler = () => {
    setRejectLoading(true)
    removeContract(props.contract.id)
      .then(() => {
        context.proposals.results = context.proposals.results.filter(
          (item: Contract) => item.id != props.contract.id
        )
        context.proposals.count--
        context.setProposals({ ...context.proposals })
      })
      .finally(() => {
        setRejectLoading(false)
      })
  }
  return (
    <ToOrderProposalCard
      {...props}
      rejectButton={
        <Button
          onClick={rejectHandler}
          isLoading={rejectLoading}
          color="danger.base"
          borderColor="danger.base"
          flex="1"
          size="sm"
          variant="outline"
        >
          Cancel
        </Button>
      }
      acceptButton={
        <Button
          onClick={acceptHandler}
          isLoading={acceptLoading}
          flex={1}
          size="sm"
          variant="success"
        >
          Accept
        </Button>
      }
    />
  )
}

export const ToOrderProposalCardNoAccept = props => {
  const context = useContext(OrderPageState)
  const [loading, setLoading] = useState(false)
  const rejectHandler = () => {
    setLoading(true)
    removeContract(props.contract.id)
      .then(() => {
        context.proposals.results = context.proposals.results.filter(
          (item: Contract) => item.id != props.contract.id
        )
        context.proposals.count--
        context.setProposals({ ...context.proposals })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <ToOrderProposalCard
      {...props}
      rejectButton={
        <Button
          onClick={rejectHandler}
          isLoading={loading}
          color="danger.base"
          borderColor="danger.base"
          flex="1"
          size="sm"
          variant="outline"
        >
          Cancel
        </Button>
      }
      acceptButton={
        <Button
          flex={1}
          size="sm"
          variant="outline"
          borderWidth="1px"
          borderColor="outline.base"
          disabled
        >
          Pending
        </Button>
      }
    />
  )
}
