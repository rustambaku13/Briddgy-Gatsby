import { Button, Center, chakra, Divider, Flex, Text } from "@chakra-ui/react"
import { navigate } from "gatsby-plugin-intl"
import { flowResult } from "mobx"
import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { CalendarIcon } from "../../icons/Calendar"
import { LocationIcon } from "../../icons/Location"
import RotateIcon from "../../icons/Rotate"
import UserStore from "../../store/UserStore"
import { DatePicker } from "../Inputs/DatePicker"
import { AddTripDetailsModal } from "../Modals/AddTripDetailsModal"
import { LocationAutoComplete } from "./LocationAutoComplete"
import { LoginModalForm } from "./LoginModalForm"

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
        isLoading={loading}
        borderTopRightRadius="lg"
        borderBottomRightRadius="lg"
        h="100%"
        type="submit"
        border="none"
        borderRadius="0"
        fontSize="0.8em"
        bg="red.400"
        _hover={{
          bg: "red.300",
        }}
        color="white"
        flex={1}
      >
        <Text>Add Trip</Text>
      </Button>
    </Flex>
  )
})
