import { Box, Divider, Flex, Heading, HStack, Text } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import moment from "moment"
import React from "react"
import { BACKEND_DATE_FORMAT, bmify, FRONTEND_DATE_FORMAT } from "../../../api"
import { Trip } from "../../../types/trip"
import { tripCityAnywhere } from "../../../utils/misc"

export const TripStatsCard = chakra(
  ({ className, trip }: { className?: any; trip: Trip }) => {
    return (
      <Box
        bgGradient="linear(to-b,blue.300,blue.500)"
        p={5}
        borderWidth="1px"
        borderRadius="3xl"
        className={className}
        color="white"
      >
        <Text mb={5} fontWeight="600" as="h3" fontSize="lg">
          STATISTICS
        </Text>
        <Flex justifyContent="space-between" alignItems="baseline" w="100%">
          <Text mr="auto" flexShrink={0} as="label">
            Baggage space
          </Text>
          <Text fontWeight="500" fontSize="2xl" textAlign="right">
            {trip.weight_limit} kg
          </Text>
        </Flex>
        <Divider my={3} />
        <Flex justifyContent="space-between">
          <Box>
            <Text as="label">Total Earning</Text>
            <Text fontWeight="500" fontSize="2xl">
              500$
            </Text>
          </Box>
          <Box>
            <Text as="label">Product Cost</Text>
            <Text textAlign="center" fontWeight="500" fontSize="2xl">
              1,500$
            </Text>
          </Box>
          <Box>
            <Text as="label">Deals</Text>
            <Text textAlign="right" fontWeight="500" fontSize="2xl">
              3
            </Text>
          </Box>
        </Flex>
      </Box>
    )
  }
)
