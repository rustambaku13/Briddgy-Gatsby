import { Box, Divider, Heading, Text } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import moment from "moment"
import React from "react"
import { BACKEND_DATE_FORMAT, bmify, FRONTEND_DATE_FORMAT } from "../../../api"
import { Trip } from "../../../types/trip"
import { tripCityAnywhere } from "../../../utils/misc"

export const BigTripCard = chakra(
  ({ className, trip }: { className?: any; trip: Trip }) => {
    return (
      <Box
        bg="white"
        px={8}
        py={12}
        borderWidth="1px"
        borderRadius="3xl"
        className={className}
      >
        <Heading mb={5} fontSize="2xl">
          {tripCityAnywhere(trip.source.city)}, {trip.source.country_en} -{" "}
          {tripCityAnywhere(trip.destination.city)},{" "}
          {trip.destination.country_en}
        </Heading>
        <Divider my={3} />
        <Text fontWeight="600" fontSize="xl" mb={5}>
          {moment(trip.date).format(FRONTEND_DATE_FORMAT)}
        </Text>
        <Text fontWeight="600" fontSize="xl" mb={5}>
          {trip.weight_limit} kg
        </Text>
        <Text variant="secondary">
          {trip.description ? trip.description : "No Description"}
        </Text>
      </Box>
    )
  }
)
