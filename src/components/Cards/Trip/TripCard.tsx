import {
  Badge,
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"
import { Link } from "gatsby-plugin-intl"
import React from "react"
import { ChevronRightIcon } from "../../../icons/ChevronRight"
import { PlaneIcon } from "../../../icons/Plane"
import { Trip } from "../../../types/trip"
import { tripCityAnywhere } from "../../../utils/misc"
import { Avatar } from "../../Avatar/Avatar"

export const MyTripCard = chakra(
  ({ className, trip }: { className?: any; trip: Trip }) => {
    return (
      <LinkBox>
        <LinkOverlay>
          <Link to={`/trips/${trip.id}`}>
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
                    <Text color="blue.600" ml="3" d="inline-block">
                      View Trip <ChevronRightIcon />
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
                    <Text
                      mb={2}
                      textAlign="right"
                      fontSize="2xl"
                      fontWeight="600"
                    >
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
          </Link>
        </LinkOverlay>
      </LinkBox>
    )
  }
)

const PublicTripCard = chakra(
  ({ className, trip }: { className?: any; trip: Trip }) => {
    return (
      <Box w="100%" maxW="container.md" className={className}>
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
              <Avatar user={trip.owner} h="40px" w="40px" />
              <Text ml="3" d="inline-block">
                {trip.owner.first_name + " " + trip.owner.last_name}
              </Text>
            </Box>
            {/* <Box ml="auto" h="40px" lineHeight="40px">
              <Text ml="3" d="inline-block">
                Message <ChatIcon />
              </Text>
            </Box> */}
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
          <Button mt={3} w="100%" variant="primary">
            Make Offer
          </Button>
        </Box>
      </Box>
    )
  }
)

export default PublicTripCard
