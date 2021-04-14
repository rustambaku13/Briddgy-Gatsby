import {
  AspectRatio,
  Box,
  Flex,
  VStack,
  Img,
  Text,
  HStack,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import moment from "moment"
import React from "react"
import { bmify, FRONTEND_DATE_FORMAT } from "../../../api"
import TripIcon from "../../../icons/Trip"
import { Order } from "../../../types/orders"
import { Trip } from "../../../types/trip"
import { getCountryFromCode, tripCityAnywhere } from "../../../utils/misc"

export const CollapsableTripCard = chakra(
  ({ className, trip }: { className?: any; trip: Trip }) => {
    return (
      <VStack className={className} alignItems="stretch" spacing={5} w="100%">
        <HStack spacing={2} w="100%">
          <AspectRatio ratio={1} flex="0 0 80px">
            <TripIcon />
          </AspectRatio>
          <Box>
            <Text
              className="clamp-2"
              fontSize="600"
              color="text.medium"
              fontWeight="700"
              as="h2"
            >
              {tripCityAnywhere(trip.src.details[0].en.city)},{" "}
              {getCountryFromCode(trip.src.countryCode)} -{" "}
              {tripCityAnywhere(trip.dest.details[0].en.city)},
              {getCountryFromCode(trip.dest.countryCode)}
            </Text>
            <Text fontSize="500" color="text.medium" fontWeight="700" as="h2">
              {moment(trip.date).format(FRONTEND_DATE_FORMAT)}
            </Text>
          </Box>
        </HStack>
        <Divider />
        <Accordion mt={0} allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Description
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{trip.description}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    )
  }
)
