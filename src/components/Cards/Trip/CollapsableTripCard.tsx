import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Box,
  Button,
  Divider,
  HStack,
  Img,
  Text,
  useToast,
  VStack
} from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import { navigate } from "gatsby-link"
import { flowResult } from "mobx"
import React, { useState } from "react"
import { removeTrip } from "../../../api/trip"
import plane from "../../../images/planeicon.svg"
import UserStore from '../../../store/UserStore'
import LayoutStore from "../../../store/LayoutStore"
import { Trip } from "../../../types/trip"
import { tripCityAnywhere } from "../../../utils/misc"
import { TOASTS } from "../../../utils/toast"

export const CollapsableTripCard = chakra(
  ({ className, trip }: { className?: any; trip: Trip }) => {
    const [loading,setLoading] = useState(false)
    const toast = useToast()


    const removeHandler = async ()=>{
      setLoading(true)
      flowResult(UserStore.deleteTrip(trip))
      .then(()=>{
          navigate('/profile')
      })
      .catch(()=>{
        toast(TOASTS.DELETE_TRIP_FAIL)
      })
      .finally(()=>{
        setLoading(false)
      })
    }
    return (
      <VStack className={className} alignItems="stretch" spacing={5} w="100%">
        <HStack spacing={2} w="100%">
          <AspectRatio ratio={1} flex="0 0 4rem">
            <Img src={plane} alt="Plane " />
          </AspectRatio>
          <Box>
            <Text
              className="clamp-2"
              fontSize="600"
              color="text.medium"
              fontWeight="700"
              as="h2"
              h="3rem"
            >
              {tripCityAnywhere(trip.src.city)},{" "}
              {trip.src.country} -{" "}
              {tripCityAnywhere(trip.dest.city)},
              {trip.dest.country}
            </Text>
            <Text fontSize="500" color="text.medium" fontWeight="700" as="h2">
              {trip.date}
            </Text>
          </Box>
        </HStack>
        <Divider />
        <Accordion mt={0} allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Trip Details
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box mb={5}>
                <Text as="label" variant="light">
                  Description
                </Text>
                <Text>{trip.description}</Text>
              </Box>
              <Box mb={5}>
                <Text as="label" variant="light">
                  Weight Limit
                </Text>
                <Text>{trip.weight_limit} kg</Text>
              </Box>
              <Button onClick={()=>{
                LayoutStore.alertDialogModalOpen({
                  title: "Removing Trip",
                  yes: "Remove",
                  callback: removeHandler,
                  no: "Cancel",
                  description: "Are you sure you want to remove your trip?",
                })
              }} w="100%" mb={5} variant="danger">
                Remove Trip
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    )
  }
)
