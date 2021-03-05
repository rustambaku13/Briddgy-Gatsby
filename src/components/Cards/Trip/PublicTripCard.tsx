import React from "react"
import {
  Avatar,
  Box,
  Center,
  chakra,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react"
import { PlaneIcon } from "../../../icons/Plane"
import { ChatIcon } from "../../../icons/Chat"
import { Trip } from "../../../types/trip"
import { bmify } from "../../../api"

const PublicTripCard = chakra(
  ({ className, trip }: { className?: any; trip: Trip }) => {
    return (
      <Box my={"40px"} w="100%" maxW="container.md" className={className}>
        <Flex mb="3" h="40px">
          <Box h="40px" lineHeight="40px">
            <Avatar src={bmify(trip.owner.avatarpic)} h="40px" w="40px" />
            <Text ml="3" d="inline-block">
              {trip.owner.first_name + " " + trip.owner.last_name}
            </Text>
          </Box>
          <Box ml="auto" h="40px" lineHeight="40px">
            <Text ml="3" d="inline-block">
              Message <ChatIcon />
            </Text>
          </Box>
        </Flex>
        <Box
          _hover={{ boxShadow: "lg" }}
          transition=".2s ease-in-out"
          cursor="pointer"
          borderWidth="1px"
          bg="white"
          borderRadius="md"
          padding="3"
        >
          <Flex
            alignItems="center"
            pos="relative"
            justifyContent="space-between"
          >
            <PlaneIcon
              fontSize="5xl"
              left="calc(50% - 1.5rem)"
              pos="absolute"
            />
            <Box>
              <Text mb={2}>{trip.source.country_en}</Text>
              <Text mb={2} fontSize="2xl" fontWeight="600">
                {trip.source.city}
              </Text>
              <Text fontSize="xl" fontWeight="600">
                {trip.date}
              </Text>
            </Box>
            <Box>
              <Text textAlign="right" mb={2}>
                {trip.destination.country_en}
              </Text>
              <Text mb={2} textAlign="right" fontSize="2xl" fontWeight="600">
                {trip.destination.city}
              </Text>
              <Text fontSize="xl" textAlign="right" fontWeight="600">
                {trip.weight_limit + "kg"}
              </Text>
            </Box>
          </Flex>
          <Divider my={3} />
          <Text variant="secondary">
            {trip.description ? trip.description : "No Description"}
          </Text>
        </Box>
      </Box>
    )
  }
)

export default PublicTripCard
