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
import { Rating } from "../../Misc/Rating"
import { FRONTEND_DATE_FORMAT } from "../../../api"
import { ChevronRightIcon } from "../../../icons/ChevronRight"
import { PlaneIcon } from "../../../icons/Plane"
import { Trip } from "../../../types/trip"
import { tripCityAnywhere } from "../../../utils/misc"
import { Avatar } from "../../Avatar/Avatar"
import moment from "moment"

const MediumTripCard = chakra(
  ({ className, trip }: { className?: any; trip: Trip }) => {
    return (
      <LinkBox w="100%">
        <LinkOverlay>
          <Box
            w="100%"
            className={className}
            p={[3, 5]}
            bg="white"
            borderColor="outline.medium"
            borderWidth="1px"
            borderRadius="lg"
          >
            <Link to={"/trips"}></Link>
            <Flex alignItems="center" w="100%">
              <Avatar mr={2} user={trip.owner} />
              <Box>
                <Text>{`${trip.owner.first_name} ${trip.owner.last_name}`}</Text>
                <Rating fontSize="400" readonly rating={trip.owner.rating} />
              </Box>
              <Text
                variant="secondary"
                fontWeight="700"
                textAlign="right"
                fontSize="400"
                flex={1}
              >
                {moment(trip.date).format(FRONTEND_DATE_FORMAT)}
              </Text>
            </Flex>
            <Divider my={4} />
            <Flex
              mb={2}
              alignItems="center"
              pos="relative"
              justifyContent="space-between"
            >
              <PlaneIcon
                color="text.medium"
                fontSize="hb1"
                left="calc(50% - 1.2rem)"
                pos="absolute"
              />
              <Box>
                <Text mb={1} fontSize="400" variant="light">
                  From
                </Text>

                <Text fontWeight="700" fontSize={[600, 700]} mb={1}>
                  {tripCityAnywhere(trip.source.city)}
                </Text>
                <Text fontSize={[500, 600]} variant="secondary">
                  {trip.source.country_en}
                </Text>
              </Box>

              <Box>
                <Text textAlign="right" mb={1} fontSize="400" variant="light">
                  To
                </Text>

                <Text
                  fontWeight="700"
                  fontSize={[600, 700]}
                  textAlign="right"
                  mb={1}
                >
                  {tripCityAnywhere(trip.destination.city)}
                </Text>
                <Text
                  fontSize={[500, 600]}
                  variant="secondary"
                  textAlign="right"
                >
                  {trip.destination.country_en}
                </Text>
              </Box>
            </Flex>
            <Text mb={2} variant="light">
              {trip.description ? trip.description : "No Description"}
            </Text>
            <Link to={`/trips/${trip.id}`}>
              <Button w="100%" variant="primary_dark">
                Make Offer
              </Button>
            </Link>
          </Box>
        </LinkOverlay>
      </LinkBox>
    )
  }
)

export const MyMediumTripCard = props => {
  return <MediumTripCard {...props}></MediumTripCard>
}

export const PublicMediumTripCard = props => {
  return <MediumTripCard {...props}></MediumTripCard>
}
