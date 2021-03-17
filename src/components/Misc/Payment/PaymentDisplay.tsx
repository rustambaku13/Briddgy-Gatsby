import { Box, Text } from "@chakra-ui/layout"
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton"
import { chakra } from "@chakra-ui/system"
import React from "react"

export const PaymentDisplay = chakra(
  ({
    item_price = 0,
    reward,
    total,
    commision,
    transfer,
    loading,
    className,
  }) => {
    return (
      <Box className={className}>
        <SkeletonText colorScheme="orange" isLoaded={!loading}>
          <Box w="100%" p={3} borderRadius="lg" bg="blueAlpha.100">
            <Text variant="secondary" mb={5}>
              Product price{" "}
              <Text as="span" float="right">
                ${item_price}
              </Text>
            </Text>
            <Text mb={5} variant="secondary">
              Traveler's Reward{" "}
              <Text as="span" float="right">
                ${reward}
              </Text>
            </Text>
            <Text mb={5} variant="secondary">
              Briddgy fee
              <Text as="span" float="right">
                ${commision}
              </Text>
            </Text>
            <Text variant="secondary">
              Bank & Transfer
              <Text as="span" float="right">
                ${transfer}
              </Text>
            </Text>
          </Box>
        </SkeletonText>
      </Box>
    )
  }
)
