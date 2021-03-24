import {
  Badge,
  Box,
  Button,
  Center,
  chakra,
  Divider,
  Flex,
  Img,
  Text,
} from "@chakra-ui/react"
import moment from "moment"
import React from "react"
import { bmify } from "../../../api"
import { Order } from "../../../types/orders"
import { trimCityEmpty } from "../../../utils/misc"
import { Avatar } from "../../Avatar/Avatar"

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

export const MyOrderCard = chakra(
  ({ className, orderData }: { className?: any; orderData: Order }) => {
    return (
      <Box
        display="flex"
        w="100%"
        flexFlow="column"
        _hover={{ boxShadow: "lg" }}
        transition=".2s ease-in-out"
        cursor="pointer"
        borderWidth="1px"
        overflow="hidden"
        bg="white"
        borderRadius="md"
        padding="4"
        my={"40px"}
        className={className}
      >
        <Box mb={5} h="60px">
          <Avatar
            user={orderData.owner}
            // src={bmify(orderData.owner.avatarpic)}
            display="inline-flex"
            h="55px"
            w="55px"
            mr={3}
          />
          <Flex
            h="55px"
            display="inline-flex"
            flexWrap="wrap"
            alignItems="center"
          >
            <Text fontSize="lg" w="100%">
              {orderData.owner.first_name + " " + orderData.owner.last_name}
            </Text>
            <small> {moment(orderData.date).fromNow()}</small>
          </Flex>
          <OrderStatus float="right" orderData={orderData} />
        </Box>
        <Flex flexGrow={1}>
          <Box mr={4} flex={["0 0 120px", "0 0 150px", "0 0 220px"]}>
            <Center width="100%" h="100%" p={3} bg="gray.50">
              <Img
                alt="Product Image"
                float="left"
                src={bmify(orderData.orderimage)}
              />
            </Center>
          </Box>
          <Box flex="1">
            <Text fontWeight="600" fontSize="2xl" mb={4}>
              {orderData.title}
            </Text>
            <Text mb={4} variant="secondary">
              From{" "}
              <Text as="strong" fontWeight="500">{`${trimCityEmpty(
                orderData.source.city
              )}${orderData.source.country_en}`}</Text>{" "}
              to{" "}
              <strong>{`${trimCityEmpty(orderData.destination.city)}${
                orderData.destination.country_en
              }`}</strong>
            </Text>
            <Box mb={4} bg="lightBlue.200" borderRadius="md" p={3}>
              <Text variant="secondary" mb={2}>
                Buy From{" "}
                <Text as="span" color="orange.300">
                  {orderData.host}
                </Text>
              </Text>
              <Text variant="secondary" mb={2}>
                Item price{" "}
                <Text as="span" fontWeight="500">
                  ${orderData.item_price}
                </Text>
              </Text>
              <Text variant="secondary">
                Item Weight{" "}
                <Text as="span" fontWeight="500">
                  {orderData.weight}kg
                </Text>
              </Text>
            </Box>
            <Divider />
            <Text my={4} verticalAlign="baseline">
              Traveler's reward{" "}
              <Text as="strong" float="right" mt="-8px" fontSize="2xl">
                ${orderData.price}
              </Text>
            </Text>
            <Button mt="auto" variant="primary" w="100%">
              View Order
            </Button>
          </Box>
        </Flex>
      </Box>
    )
  }
)

const PublicOrderCard = chakra(
  ({ className, orderData }: { className?: any; orderData: Order }) => {
    return (
      <Box
        display="flex"
        w="100%"
        flexFlow="column"
        _hover={{ boxShadow: "lg" }}
        transition=".2s ease-in-out"
        cursor="pointer"
        borderWidth="1px"
        overflow="hidden"
        bg="white"
        borderRadius="md"
        padding="4"
        my={"40px"}
        className={className}
      >
        <Box mb={5} h="60px">
          <Avatar
            user={orderData.owner}
            display="inline-flex"
            h="55px"
            w="55px"
            mr={3}
          />
          <Flex
            h="55px"
            display="inline-flex"
            flexWrap="wrap"
            alignItems="center"
          >
            <Text fontSize="lg" w="100%">
              {orderData.owner.first_name + " " + orderData.owner.last_name}
            </Text>
            <small> {moment(orderData.date).fromNow()}</small>
          </Flex>
        </Box>
        <Flex flexGrow={1}>
          <Box mr={4} flex={["0 0 120px", "0 0 150px", "0 0 220px"]}>
            <Center width="100%" h="100%" p={3} bg="gray.50">
              <Img
                alt="Product Image"
                float="left"
                src={bmify(orderData.orderimage)}
              />
            </Center>
          </Box>
          <Box flex="1">
            <Text fontWeight="600" fontSize="2xl" mb={4}>
              {orderData.title}
            </Text>
            <Text mb={4} variant="secondary">
              From{" "}
              <Text as="strong" fontWeight="500">{`${trimCityEmpty(
                orderData.source.city
              )}${orderData.source.country_en}`}</Text>{" "}
              to{" "}
              <strong>{`${trimCityEmpty(orderData.destination.city)}${
                orderData.destination.country_en
              }`}</strong>
            </Text>
            <Box mb={4} bg="lightBlue.200" borderRadius="md" p={3}>
              <Text variant="secondary" mb={2}>
                Buy From{" "}
                <Text as="span" color="orange.300">
                  {orderData.host}
                </Text>
              </Text>
              <Text variant="secondary" mb={2}>
                Item price{" "}
                <Text as="span" fontWeight="500">
                  ${orderData.item_price}
                </Text>
              </Text>
              <Text variant="secondary">
                Item Weight{" "}
                <Text as="span" fontWeight="500">
                  {orderData.weight}kg
                </Text>
              </Text>
            </Box>
            <Divider />
            <Text my={4} verticalAlign="baseline">
              Traveler's reward{" "}
            </Text>
            <Button mt="auto" variant="primary" w="100%">
              Make Offer
            </Button>
          </Box>
        </Flex>
      </Box>
    )
  }
)

export default PublicOrderCard
