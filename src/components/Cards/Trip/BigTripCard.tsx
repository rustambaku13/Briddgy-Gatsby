import {
  Box,
  Divider,
  Heading,
  Text,
  chakra,
  VStack,
  Flex,
  Button,
} from "@chakra-ui/react"
import { useStaticQuery, graphql } from "gatsby"
import moment from "moment"
import React from "react"
import { BACKEND_DATE_FORMAT, bmify, FRONTEND_DATE_FORMAT } from "../../../api"
import Img from "gatsby-image"
import { Trip } from "../../../types/trip"
import { tripCityAnywhere } from "../../../utils/misc"
import { Avatar } from "../../Avatar/Avatar"
import { Rating } from "../../Misc/Rating"
import LayoutStore from "../../../store/LayoutStore"

export const BigTripCard = chakra(
  ({ className, trip }: { className?: any; trip: Trip }) => {
    const data = useStaticQuery(graphql`
      query {
        background: file(relativePath: { eq: "trip_illustration.png" }) {
          childImageSharp {
            fluid(pngQuality: 10, maxHeight: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `)

    return (
      <VStack
        maxW="container.md"
        mx="auto"
        alignItems="flex-start"
        spacing={5}
        color="white"
        borderRadius="xl"
        w="100%"
        p={6}
        pos="relative"
        overflow="hidden"
      >
        <Box
          left={0}
          top={0}
          zIndex={-1}
          overflow="hidden"
          h="100%"
          w="100%"
          pos="absolute"
        >
          <Img
            style={{ minHeight: "100%" }}
            fluid={data.background.childImageSharp.fluid}
          />
        </Box>
        <Heading fontWeight="700" fontSize={["hb1", "hb2"]} as="h2">
          {tripCityAnywhere(trip.source.city)}, {trip.source.country_en}
        </Heading>
        <Heading fontWeight="700" fontSize={["hb1", "hb2"]} as="h2">
          {tripCityAnywhere(trip.destination.city)},{" "}
          {trip.destination.country_en}
        </Heading>
        <Text fontWeight="700">
          {moment(trip.date).format(FRONTEND_DATE_FORMAT)}
        </Text>
        <Text variant="lighter">{trip.description}</Text>
        <Flex flexWrap="wrap" alignItems="center" w="100%">
          <Avatar mr={2} user={trip.owner} />
          <Box>
            <Text>{`${trip.owner.first_name} ${trip.owner.last_name}`}</Text>
            <Rating fontSize="400" readonly rating={trip.owner.rating} />
          </Box>
          <Box ml="auto" bg="white" borderRadius="base">
            <Button
              onClick={() => {
                LayoutStore.toTripProposalModalOpen({ trip: trip })
              }}
              variant="lieBlueText"
            >
              Offer your Order
            </Button>
          </Box>
        </Flex>
      </VStack>
    )
  }
)

export const BigTripCardN = chakra(
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
