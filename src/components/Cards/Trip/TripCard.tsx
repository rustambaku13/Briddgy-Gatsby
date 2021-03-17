import React from "react"
import {
  Avatar,
  Badge,
  Box,
  Button,
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
import { ChevronRightIcon } from "../../../icons/ChevronRight"
import { Link } from "gatsby-plugin-intl"
import { tripCityAnywhere } from "../../../utils/misc"

export const MyTripCard = chakra(
  ({ className, trip }: { className?: any; trip: Trip }) => {
    return (
      <Box w="100%" className={className}>
        <Box
          _hover={{ boxShadow: "lg" }}
          transition=".2s ease-in-out"
          cursor="pointer"
          borderWidth="1px"
          bg="white"
          borderRadius="md"
          padding="3"
        >
          <Flex h="40px">
            <Box h="40px" lineHeight="40px">
              <Badge py={0} borderRadius="lg" px={3} colorScheme="green">
                <Text as="small" fontSize="x-small">
                  {trip.number_of_contracts} DEALS
                </Text>
              </Badge>
            </Box>
            <Box ml="auto" h="40px" lineHeight="40px">
              <Link to="/trips">
                <Text color="blue.600" ml="3" d="inline-block">
                  View Trip <ChevronRightIcon />
                </Text>
              </Link>
            </Box>
          </Flex>
          <Divider my={3} />
          <Flex
            alignItems="center"
            pos="relative"
            justifyContent="space-between"
          >
            <PlaneIcon
              fontSize="4xl"
              left="calc(50% - 1.2rem)"
              pos="absolute"
            />
            <Box>
              <Text mb={2}>{trip.source.country_en}</Text>
              <Text mb={2} fontSize="2xl" fontWeight="600">
                {tripCityAnywhere(trip.source.city)}
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
                {tripCityAnywhere(trip.destination.city)}
              </Text>
              <Text fontSize="xl" textAlign="right" fontWeight="600">
                {trip.weight_limit + "kg"}
              </Text>
            </Box>
          </Flex>
          <Divider my={3} />
          <Text variant="secondary">
            <strong>Details: </strong>
            {trip.description ? trip.description : "No Description"}
          </Text>
        </Box>
      </Box>
    )
  }
)

const PublicTripCard = chakra(
  ({ className, trip }: { className?: any; trip: Trip }) => {
    return (
      <Box my={"40px"} w="100%" maxW="container.md" className={className}>
        <Box
          _hover={{ boxShadow: "lg" }}
          transition=".2s ease-in-out"
          cursor="pointer"
          borderWidth="1px"
          bg="white"
          borderRadius="md"
          padding="3"
        >
          <Flex h="40px">
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
          <Divider my={3} />
          <Flex
            alignItems="center"
            pos="relative"
            justifyContent="space-between"
          >
            <PlaneIcon
              fontSize="4xl"
              left="calc(50% - 1.2rem)"
              pos="absolute"
            />
            <Box>
              <Text mb={2}>{trip.source.country_en}</Text>
              <Text mb={2} fontSize="2xl" fontWeight="600">
                {tripCityAnywhere(trip.source.city)}
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
                {tripCityAnywhere(trip.destination.city)}
              </Text>
              <Text fontSize="xl" textAlign="right" fontWeight="600">
                {trip.weight_limit + "kg"}
              </Text>
            </Box>
          </Flex>
          <Divider my={3} />
          <Text variant="secondary">
            <strong>Details: </strong>
            {trip.description ? trip.description : "No Description"}
          </Text>
        </Box>
      </Box>
    )
  }
)

export default PublicTripCard
