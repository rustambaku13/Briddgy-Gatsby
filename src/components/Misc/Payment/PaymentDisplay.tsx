import { Box, Text } from "@chakra-ui/layout"
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton"
import { chakra } from "@chakra-ui/system"
import React from "react"

export const PaymentDisplay = chakra(
  ({
    item_price = 0,
    reward,
    total,
    total_after_stripe,
    stripe_balance_change,
    briddgy_fee,
    stripe_fee,
    loading,
    className,
  }) => {
    return (
      <Box>
        <SkeletonText colorScheme="orange" isLoaded={!loading}>
          <Box
            className={className}
            w="100%"
            p={3}
            borderRadius="lg"
            bg="lilaPurple.light"
          >
            <Text variant="secondary" mb={5}>
              Product price{" "}
              <Text as="span" float="right">
                ${item_price}
              </Text>
            </Text>
            <Text mb={5} variant="secondary">
              Traveler's reward{" "}
              <Text as="span" float="right">
                ${reward}
              </Text>
            </Text>
            <Text mb={5} variant="secondary">
              Briddgy fee
              <Text as="span" float="right">
                ${briddgy_fee}
              </Text>
            </Text>
            <Text mb={5} variant="secondary">
              Bank & Trasfer
              <Text as="span" float="right">
                ${stripe_fee}
              </Text>
            </Text>
            <Text d={stripe_balance_change==0?"none":"block"} variant="secondary">
              Used Balance
              <Text as="span" color='success.base' float="right">
                -${stripe_balance_change}
              </Text>
            </Text>
          </Box>
        </SkeletonText>
      </Box>
    )
  }
)
