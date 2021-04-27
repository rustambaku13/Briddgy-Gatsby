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
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js"

import CheckIcon from "../../../icons/Check"
import { LockIcon } from "../../../icons/Lock"
import { StripeIcon } from "../../../icons/Stripe"
import { createPaymentIntent } from "../../../api/payment"

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

  const [clientSecret, setClientSecret] = useState("")
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(null)
  const [succeeded, setSucceeded] = useState(false)
  const handleChange = async event => {
    setDisabled(event.empty || event.error)

    setError(event.error ? event.error.message : "")
  }
  const handleSubmit = async e => {
    try {
      setLoading(true)
      e.preventDefault()
      const {
        data: { clientSecret },
      } = await createPaymentIntent(context.contract.id)
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      })

      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`)
      } else {
        context.contract.state = "FRZ"
        context.setStep(2)
        setError(null)
        setSucceeded(true)
      }
    } catch {
      setError("Error has occured")
    } finally {
      setLoading(false)
    }
  }
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
      <Text mt={5} as="h3" variant="secondary">
        Total{" "}
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
      <form id="payment-form" onSubmit={handleSubmit}>
        <HStack spacing={3} mb={3}>
          <Box
            bg="outline.light"
            px={2}
            py={5}
            borderRadius="base"
            w="100%"
            borderWidth="1px"
          >
            <CardNumberElement
              onChange={handleChange}
              options={{ showIcon: true }}
            />
          </Box>

          <Box
            w="150px"
            bg="outline.light"
            px={2}
            py={5}
            borderRadius="base"
            borderWidth="1px"
          >
            <CardExpiryElement onChange={handleChange} />
          </Box>
          <Box
            w="100px"
            bg="outline.light"
            px={2}
            py={5}
            borderRadius="base"
            borderWidth="1px"
          >
            <CardCvcElement onChange={handleChange} />
          </Box>
        </HStack>
        {error && (
          <Text
            className="card-error"
            role="alert"
            color="danger.base"
            as="small"
          >
            {error}
          </Text>
        )}

        <Button
          size="lg"
          isDisabled={disabled}
          fontWeight="600"
          type="submit"
          rightIcon={<LockIcon />}
          w="100%"
          mt={5}
          isLoading={loading}
          variant="success"
        >
          Pay Now
        </Button>
      </form>
    </>
  )
}
