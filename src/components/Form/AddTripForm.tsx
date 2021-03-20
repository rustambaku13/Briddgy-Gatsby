import {
  Box,
  Button,
  Center,
  chakra,
  Divider,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react"
import { navigate } from "gatsby-plugin-intl"
import { flowResult } from "mobx"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { CalendarIcon } from "../../icons/Calendar"
import { LocationIcon } from "../../icons/Location"
import RotateIcon from "../../icons/Rotate"
import { TripIcon } from "../../icons/Trip"
import UserStore from "../../store/UserStore"
import { DatePicker } from "../Inputs/DatePicker"
import { LocationAutoComplete } from "../Inputs/LocationAutoComplete"
import { AddTripDetailsModal } from "../Modals/AddTripDetailsModal"
import { LoginModalForm } from "./LoginModalForm"

const TopSearchButton = chakra(
  ({ className, expand }: { className?: any; expand: any }) => {
    return (
      <Flex
        onClick={expand}
        role="button"
        _hover={{ boxShadow: "md" }}
        className={className}
        id="navbar_search_order"
        borderRadius="50px"
        w="100%"
        maxW="350px"
        mx="auto"
        mt="15px"
        h="50px"
        bg="white"
        pl={5}
        alignItems="center"
        borderWidth="1px"
      >
        <Text fontSize="sm" flexGrow={1}>
          Add Trip
        </Text>

        <IconButton
          flexShrink={0}
          h="40px"
          mr="5px"
          d="block"
          w="40px"
          borderRadius="50%"
          variant="red_gradient"
          type="submit"
          aria-label="Add Order"
          icon={<TripIcon />}
        />
      </Flex>
    )
  }
)
export const AddTripForm = chakra(({ className }: { className?: any }) => {
  const { register, getValues, handleSubmit, watch, errors } = useForm()
  const [modalOpen, setModalOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false) // Modal controlling login add trip
  const [loading, setLoading] = useState(false)
  const addTrip = () => {
    setLoading(true)
    flowResult(UserStore.saveNewTrip())
      .then(e => {
        navigate("/profile?page=trips")
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const finalSub = data => {
    UserStore.save_new_trip({ ...data, ...getValues() })
    setModalOpen(false)
    if (UserStore.isLoggedIn) {
      addTrip()
      // Add the trip and redirect
      return
    }
    setLoginModalOpen(true)
  }

  return (
    <Flex
      as="form"
      borderWidth={1}
      bg="white"
      mx="auto"
      id="add_travel_form"
      fontSize="lg"
      borderRadius="50px"
      onSubmit={handleSubmit(() => {
        setModalOpen(true)
      })}
      className={className}
    >
      <LoginModalForm
        isOpen={loginModalOpen}
        setOpen={setLoginModalOpen}
        callback={addTrip}
      />
      <AddTripDetailsModal
        callback={finalSub}
        isOpen={modalOpen}
        setOpen={setModalOpen}
      />
      <Flex alignItems="center" pl={4} flex={1}>
        <LocationIcon color="gray.500" />
        <LocationAutoComplete
          fontSize="md"
          name="source"
          parentRef={register({ required: true })}
        />
      </Flex>
      <Center pos="relative" h="100%" w="5px">
        <Center
          pos="absolute"
          bg="white"
          cursor="pointer"
          zIndex="1"
          borderRadius="50%"
          w="30px"
          h="30px"
          borderWidth="1px"
          fontSize="20px"
          color="blue.400"
        >
          <RotateIcon />
        </Center>
        <Divider orientation="vertical" />
      </Center>
      <Flex alignItems="center" pl={4} flex={1}>
        <LocationIcon color="gray.500" />
        <LocationAutoComplete
          fontSize="md"
          name="destination"
          parentRef={register({ required: true })}
        />
      </Flex>
      <Center pos="relative" h="100%" w="5px">
        <Divider orientation="vertical" />
      </Center>
      <Flex alignItems="center" pl={4} flex={1}>
        <CalendarIcon color="gray.500" />
        <DatePicker
          refDeparture={register({ required: true })}
          refArrival={register()}
          nameDeparture="date1"
          nameArrival="date2"
        />
      </Flex>
      <Button
        h="calc(100% - 10px)"
        maxW="200px"
        w="100%"
        p={0}
        variant="red_gradient"
        mt={"5px"}
        mr="10px"
        type="submit"
        borderRadius="50px"
      >
        Add Trip
      </Button>
    </Flex>
  )
})

export const AddTripFormNavigationMenu = ({ expand }) => {
  return (
    <>
      <Box id="trip_navigation" className="form" w="100%" h="100%" mx="auto">
        <TopSearchButton expand={expand} />
        <Box className="overlay">
          <AddTripForm h="70px" />
        </Box>
      </Box>
    </>
  )
}
