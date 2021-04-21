import React, { useContext, useState } from "react"
import { OrderPageState } from "../../../providers/navPage"
import { PaymentDisplay } from "../../Misc/Payment/PaymentDisplay"
import logo from "../../../../static/assets/sgl.png"
import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  Image,
  Img,
  Flex,
} from "@chakra-ui/react"
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckIcon from "../../../icons/Check"
import { LockIcon } from "../../../icons/Lock"
import { StripeIcon } from "../../../icons/Stripe"

const stripePromise = loadStripe(
  "pk_test_51Htr6JGfJpinijwgZ0o2g7zbJNN9ayprpLtKsv2SpyO5f8pn849rn1EApeCVID7C7mUo4jUjEcYJ4Z2SthL0TcIB00L0hynXAX"
)
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#8AB5CB",
      fontSmoothing: "antialiased",
      fontSize: "1rem",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

export const PaymentCard = () => {
  const context = useContext(OrderPageState)
  const [prices, setPrices] = useState({
    loading: false,
    item_price: 150,
    reward: 20,
    total: "200",
    commision: "7.33",
    transfer: "10.99",
  })
  return (
    <>
      <PaymentDisplay p={0} borderRadius="0" bg="white" {...prices} />
      <Text mt={8} as="h3" variant="secondary">
        Estimated Total{" "}
        <Text
          as="span"
          mt="-8px"
          float="right"
          fontSize="700"
          color="black"
          fontWeight="600"
        >
          ${prices.total}
        </Text>
        <Divider my={7} />
      </Text>{" "}
      <Flex w="100%" mb={1} justifyContent="" alignItems="flex-end" flex={1}>
        <StripeIcon
          fill="white"
          w="auto"
          h="35px"
          pos="relative"
          left="-9px"
          // ml="auto"
          color="lilaPurple.dark"
        />
      </Flex>
      <Elements stripe={stripePromise}>
        <label>
          <HStack spacing={3} mb={3}>
            <Box
              bg="outline.light"
              px={2}
              py={5}
              borderRadius="base"
              w="100%"
              borderWidth="1px"
            >
              <CardNumberElement options={{ showIcon: true }} />
              {/* <CardElement options={{ style: CARD_ELEMENT_OPTIONS }} /> */}
            </Box>

            <Box
              w="150px"
              bg="outline.light"
              px={2}
              py={5}
              borderRadius="base"
              borderWidth="1px"
            >
              <CardExpiryElement />
            </Box>
            <Box
              w="100px"
              bg="outline.light"
              px={2}
              py={5}
              borderRadius="base"
              borderWidth="1px"
            >
              <CardCvcElement />
            </Box>
          </HStack>
        </label>
      </Elements>
      <Button
        size="lg"
        fontWeight="600"
        rightIcon={<LockIcon />}
        w="100%"
        mt={5}
        variant="success"
      >
        Pay Now
      </Button>
    </>
  )
}
