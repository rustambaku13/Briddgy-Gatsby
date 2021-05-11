import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react"
import UserStore from "../../../store/UserStore"
import { chakra } from "@chakra-ui/system"
import { Link } from "gatsby-plugin-intl"
import moment from "moment"
import React, { useContext, useState } from "react"
import { bmify } from "../../../api"
import { acceptContract, removeContract } from "../../../api/contract"
import { TripPageState } from "../../../providers/navPage"
import { Contract } from "../../../types/contract"
import { getCountryFromCode, tripCityAnywhere } from "../../../utils/misc"
import { Avatar } from "../../Avatar/Avatar"
import { Rating } from "../../Misc/Rating"
import LayoutStore from "../../../store/LayoutStore"

export const ToTripProposalCard = chakra(
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
          <Avatar mr={2} user={contract.order.owner} />
          <Box>
            <Text>{`${contract.order.owner.first_name} ${contract.order.owner.last_name}`}</Text>
            <Rating
              fontSize="400"
              readonly
              rating={contract.order.owner.rating}
            />
          </Box>
          <Text variant="light" textAlign="right" fontSize="400" flex={1}>
            Proposed {moment(contract.dateSigned).fromNow()}
          </Text>
        </Flex>
        <Flex>
          <AspectRatio
            mr={3}
            ratio={1}
            borderWidth="1px"
            borderRadius="base"
            w="4.5em"
          >
            <Image src={bmify(contract.order.orderimage?.[0])} />
          </AspectRatio>
          <Box flex={1}>
            <Link to={`/orders/${contract.order.id}`}>
              <Text className="clamp-1" fontWeight="700" as="h3">
                {contract.order.title}
              </Text>
            </Link>
            <Link to={contract.order.order_url}>
              <Text variant="light">
                Buy From{" "}
                <Text as="span" color="blue.400">
                  {contract.order.host}
                </Text>
              </Text>
            </Link>
            <Text variant="light">
              Product price{" "}
              <Text as="span" color="text.dark">
                ${contract.order.item_price}
              </Text>
            </Text>
          </Box>
        </Flex>
        <Text variant="light">
          From{" "}
          <Text as="span" color="text.dark">
            {tripCityAnywhere(contract.order.src.city)},{" "}
            {contract.order.src.country}
          </Text>{" "}
          To{" "}
          <Text as="span" color="text.dark">
            {tripCityAnywhere(contract.order.dest.city)},{" "}
            {contract.order.dest.country}
          </Text>
        </Text>
        <Text fontSize="500" variant="light" textAlign="right">
          Your reward{" "}
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

export const ToTripProposalCardWithAccept = (props: { contract: Contract }) => {
  const context = useContext(TripPageState)
  const [rejectLoading, setRejectLoading] = useState(false)
  const [acceptLoading, setAcceptLoading] = useState(false)
  const acceptHandler = () => {
    if (UserStore.me.is_stripe_verified != "C") {
      LayoutStore.completeProfileModalToggle()
      return
    }
    setAcceptLoading(true)
    acceptContract(props.contract.order.id, props.contract.trip.id)
      .then(() => {
        context.proposals.results = context.proposals.results.filter(
          (item: Contract) => item.id != props.contract.id
        )
        context.proposals.count--
        props.contract.state = "SET"
        context.contracts.results.unshift(props.contract)
        context.contracts.count++
        context.setProposals({ ...context.proposals })
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
    <ToTripProposalCard
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

export const ToTripProposalCardNoAccept = props => {
  const context = useContext(TripPageState)
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
    <ToTripProposalCard
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
