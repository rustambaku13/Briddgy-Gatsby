import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Center,
  chakra,
  Divider,
  Flex,
  Img,
  LinkBox,

  Link as CLink,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { Link } from "gatsby-plugin-intl"
import moment from "moment"
import React, { useContext } from "react"
import { Rating } from "../../Misc/Rating"
import { bmify, FRONTEND_DATE_FORMAT } from "../../../api"
import { Order } from "../../../types/orders"
import { getCountryFromCode, trimCityEmpty } from "../../../utils/misc"
import { CurvedArrowRight } from "../../../icons/CurvedArrowRight"
import { Avatar } from "../../Avatar/Avatar"
import LayoutStore from "../../../store/LayoutStore"
import { TripPageState } from "../../../providers/navPage"
import { getTripProposals } from "../../../api/contract"
import { LinkOverlay } from "../../Misc/LinkOverlay"

// This page is all about medium sized order compoentns

const OrderStatus = chakra(
  ({ orderData, className }: { orderData: Order; className?: any }) => {
    if (!orderData.deliverer) {
      return (
        <Badge className={className} colorScheme="gray" p={2}>
          unassigned
        </Badge>
      )
    }
    return (
      <Badge className={className} colorScheme="green" p={2}>
        Settled
      </Badge>
    )
  }
)
/**
 * MediumOrderCard is general view
 * @argument {children} the name of the main button
 * @argument {callback} the main button click callback
 */
const MediumOrderCard = chakra(
  ({
    className,
    orderData,
    children,
    callback,
  }: {
    className?: any
    orderData: Order
    callback: any
    children?: any
  }) => {
    return (
      <LinkBox w="100%">
        <LinkOverlay to={`/orders/${orderData.id}/`}>
          
            <Box
              w="100%"
              className={className}
              px={6}
              py={4}
              bg="white"
              borderColor="outline.medium"
              borderWidth="1px"
              borderRadius="lg"
            >
              <Flex alignItems="center" w="100%">
                <Avatar mr={2} user={orderData.owner} />
                <Box>
                  <Text>{`${orderData.owner.first_name} ${orderData.owner.last_name}`}</Text>
                  <Rating
                    fontSize="400"
                    readonly
                    rating={orderData.owner.rating}
                  />
                </Box>
                <Text variant="light" textAlign="right" fontSize="400" flex={1}>
                  {orderData.date}
                </Text>
              </Flex>
              <Divider my={4} />
              <Flex mb={4}>
                <AspectRatio
                  borderRadius="base"
                  borderWidth="1px"
                  flex={["0 0 80px", "0 0 100px", "0 0 160px"]}
                  mr={4}
                  ratio={1 / 1}
                >
                  <Img
                    alt="Product Image"
                    float="left"
                    src={bmify(orderData.orderimage[0])}
                  />
                </AspectRatio>
                <VStack overflow="hidden" flex={1} h="100%">
                  <Flex alignItems="center" w="100%">
                    <Text
                      mr={2}
                      as="h3"
                      textOverflow="ellipsis"
                      whiteSpace={["normal", "nowrap"]}
                      overflow="hidden"
                      fontSize={[500, 600]}
                      fontWeight="700"
                      flexGrow={1}
                    >
                      {orderData.title}
                    </Text>
                    <Text
                      whiteSpace="nowrap"
                      fontWeight="700"
                      flexGrow={0}
                      variant="light"
                      as="strong"
                    >
                      {orderData.weight} kg
                    </Text>
                  </Flex>
                  <Box
                    borderColor="outline.medium"
                    borderWidth="1px"
                    bg="lilaPurple.light"
                    w="100%"
                    mb="auto"
                    p={3}
                    d={["none", "block"]}
                    borderRadius="base"
                  >
                    <Text variant="light">
                      Buy From{" "}
                      <CLink href={orderData.order_url} color="warning.dark">
                        {orderData.host}
                      </CLink>
                    </Text>
                    <Text variant="light">
                      Product Price{" "}
                      <Text color="text.medium" as="span">
                        ${orderData.item_price}
                      </Text>
                    </Text>
                  </Box>
                  <Button
                    onClick={callback}
                    d={["none", "block"]}
                    mt="auto"
                    variant="primary_dark"
                    w="100%"
                  >
                    {children}
                  </Button>
                </VStack>
              </Flex>
              <Box
                borderColor="outline.medium"
                borderWidth="1px"
                bg="lilaPurple.light"
                w="100%"
                mb={4}
                p={2}
                d={["block", "none"]}
                borderRadius="base"
              >
                <Text variant="light">
                  Buy From{" "}
                  <CLink href={orderData.order_url} color="warning.dark">
                    {orderData.host}
                  </CLink>
                </Text>
                <Text variant="light">
                  Product Price{" "}
                  <Text color="text.medium" as="span">
                    ${orderData.item_price}
                  </Text>
                </Text>
              </Box>

              <Button
                onClick={callback}
                d={["block", "none"]}
                mb={4}
                variant="primary_dark"
                w="100%"
              >
                {children}
              </Button>
              <HStack alignItems="center" w="100%">
                <Text color="text.medium" as="span">{`${trimCityEmpty(
                  orderData.src.city
                )}${orderData.src.country}`}</Text>
                <CurvedArrowRight color="text.light" />
                <Text color="text.medium" as="span">{`${trimCityEmpty(
                  orderData.dest.city
                )}${orderData.dest.country}`}</Text>
                <Text fontSize="500" variant="light" flex={1} textAlign="right">
                  Traveler's reward{" "}
                  <Text
                    as="strong"
                    color="text.dark"
                    fontSize="700"
                    fontWeight="700"
                  >
                    ${orderData.price}
                  </Text>
                </Text>
              </HStack>
            </Box>
          
        </LinkOverlay>
      </LinkBox>
    )
  }
)

export const MyMediumOrderCard = props => {
  return <MediumOrderCard {...props}>View More</MediumOrderCard>
}

export const PublicMediumOrderCardProposal = props => {
  const context = useContext(TripPageState)
  const callback = () => {
    context.suggested.results = context.suggested.results.filter(
      item => item.id != props.orderData.id
    )
    context.suggested.count--
    getTripProposals(context.trip.id).then(e => {
      context.setProposals(e.data)
    })
  }
  const modalContext = {
    trip: context.trip,
    order: props.orderData,
    callback,
  }

  return (
    <MediumOrderCard
      callback={e => {
        e.preventDefault()
        e.stopPropagation()
        LayoutStore.toOrderProposalModalOpen(modalContext)
      }}
      status={null}
      {...props}
    >
      Make Offer
    </MediumOrderCard>
  )
}

export const PublicMediumOrderCard = props => {
  return (
    <MediumOrderCard status={null} {...props}>
      View Order
    </MediumOrderCard>
  )
}
