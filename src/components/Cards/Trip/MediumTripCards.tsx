import {
  Badge,
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
  useToast,
} from "@chakra-ui/react"
import { Link } from "gatsby-plugin-intl"
import React, { useContext, useState } from "react"
import { Rating } from "../../Misc/Rating"
import { FRONTEND_DATE_FORMAT } from "../../../api"
import { ChevronRightIcon } from "../../../icons/ChevronRight"
import { PlaneIcon } from "../../../icons/Plane"
import { Trip } from "../../../types/trip"
import { getCountryFromCode, tripCityAnywhere } from "../../../utils/misc"
import { Avatar } from "../../Avatar/Avatar"
import moment from "moment"
import { addContract, getOrderProposals } from "../../../api/contract"
import { OrderPageState } from "../../../providers/navPage"
import { Order } from "../../../types/orders"

const MediumTripCard = chakra(
  ({
    className,
    trip,
    children,
    callback,
    loading = false,
  }: {
    className?: any
    trip: Trip
    children: any
    callback: any
    loading: boolean
  }) => {
    return (
      <LinkBox w="100%">
        <LinkOverlay>
          <Box
            w="100%"
            className={className}
            p={[3, 5]}
            bg="white"
            borderColor="outline.medium"
            borderWidth="1px"
            borderRadius="lg"
          >
            <Link to={"/trips"}></Link>
            <Flex alignItems="center" w="100%">
              <Avatar mr={2} user={trip.owner} />
              <Box>
                <Text>{`${trip.owner.first_name} ${trip.owner.last_name}`}</Text>
                <Rating fontSize="400" readonly rating={trip.owner.rating} />
              </Box>
              <Text
                variant="secondary"
                fontWeight="700"
                textAlign="right"
                fontSize="400"
                flex={1}
              >
                {trip.date}
              </Text>
            </Flex>
            <Divider my={3} />
            <Flex
              alignItems="center"
              pos="relative"
              justifyContent="space-between"
            >
              <PlaneIcon
                color="text.medium"
                fontSize="hb1"
                left="calc(50% - 1.2rem)"
                pos="absolute"
              />
              <Box>
                <Text fontSize="400" variant="light">
                  From
                </Text>

                <Text fontWeight="700" fontSize={[600, 700]}>
                  {tripCityAnywhere(trip.src.city)}
                </Text>
                <Text fontSize={[500, 600]} variant="secondary">
                  {trip.src.country}
                </Text>
              </Box>

              <Box>
                <Text textAlign="right" mb={1} fontSize="400" variant="light">
                  To
                </Text>

                <Text fontWeight="700" fontSize={[600, 700]} textAlign="right">
                  {tripCityAnywhere(trip.dest.city)}
                </Text>
                <Text
                  fontSize={[500, 600]}
                  variant="secondary"
                  textAlign="right"
                >
                  {trip.dest.country}
                </Text>
              </Box>
            </Flex>
            <Text mb={2} variant="light">
              {trip.description ? trip.description : "No Description"}
            </Text>
            <Link to={`/trips/${trip.id}`}>
              <Button
                isLoading={loading}
                onClick={callback}
                w="100%"
                variant="primary_dark"
              >
                {children}
              </Button>
            </Link>
          </Box>
        </LinkOverlay>
      </LinkBox>
    )
  }
)

export const MyMediumTripCard = props => {
  return <MediumTripCard {...props}>View Trip</MediumTripCard>
}

export const PublicMediumTripCard = props => {
  return <MediumTripCard {...props}>Make Offer</MediumTripCard>
}
/**
 * Normal Public Medium Trip Card but with Make Proposal Button
 * @param props
 * @returns
 */
export const PublicMediumTripCardProposal = (props: {
  className?: any
  trip: Trip
  children: any
  callback: any
  loading: boolean
}) => {
  const [loading, setLoading] = useState(false)
  const context = useContext(OrderPageState)
  const toast = useToast()
  const order: Order = context.order
  const callback = e => {
    e.preventDefault()
    setLoading(true)
    addContract({
      order: order.id,
      trip: props.trip.id,
      price_bid: order.price,
    })
      .then(e => {
        toast({
          title: "Proposal was made",
          description: "Wait for the traveler to accept your your",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      })
      .then(e => {
        context.suggested.results = context.suggested.results.filter(
          item => item.id != props.trip.id
        )
        context.suggested.count--
        return getOrderProposals(order.id)
      })
      .then(e => {
        context.setProposals(e.data)
      })
      .catch(() => {
        toast({
          title: "Error has occured",
          description: "Please try again later or contract our support",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <MediumTripCard callback={callback} loading={loading} {...props}>
      Make Offer
    </MediumTripCard>
  )
}
