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
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { CalendarIcon } from "../../icons/Calendar"
import { LocationIcon } from "../../icons/Location"
import RotateIcon from "../../icons/Rotate"
import { TripIcon } from "../../icons/Trip"
import LayoutStore from "../../store/LayoutStore"
import UserStore from "../../store/UserStore"
import { swapItinerary } from "../../utils/misc"
import { DatePicker } from "../Inputs/DatePicker"
import { LocationAutoComplete } from "../Inputs/LocationAutoComplete"
import { AddTripDetailsModal } from "../Modals/AddTripDetailsModal"
/**
 * Top search Button when screen size is small, It opens, expands the normal form
 */
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
        px="5px"
        alignItems="center"
        borderWidth="1px"
      >
        <Text pl={3} fontSize={["xs", "sm"]} flexGrow={1}>
          Add Trip
        </Text>

        <IconButton
          flexShrink={0}
          h="40px"
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
/**
 * Add Trip Form in /travel page
 * @var {modalOpen} // Where the additional info modal is open
 */
export const AddTripForm = chakra(({ className }: { className?: any }) => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    watch,
    errors,
  } = useFormContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const addTrip = () => {
    // Actually adding the trip, of course if the user is logged in
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
    LayoutStore.loginModalFormOpen(addTrip)
  }

  return (
    <Flex
      boxShadow="md"
      as="form"
      borderWidth={1}
      flexDir={["column", "column", "row"]}
      bg="white"
      h={["auto", "auto", "80px"]}
      mx="auto"
      id="add_travel_form"
      fontSize="lg"
      borderRadius={["md", "md", "lg"]}
      p={3}
      onSubmit={handleSubmit(() => {
        setModalOpen(true)
      })}
      className={className}
    >
      <AddTripDetailsModal
        callback={finalSub}
        isOpen={modalOpen}
        setOpen={setModalOpen}
      />
      <Flex pl={4} py={3} alignItems="center" flex={1}>
        <LocationIcon color="gray.500" />
        <LocationAutoComplete fontSize="md" name="src" placeholder="From" />
      </Flex>
      <Divider d={["block", "block", "none"]} />
      <Center d={["none", "none", "flex"]} pos="relative" h="100%" w="5px">
        <IconButton
          onClick={() => {
            swapItinerary(getValues(), setValue)
          }}
          aria-label="Swap"
          minW="unset"
          pos="absolute"
          bg="white"
          cursor="pointer"
          zIndex="1"
          borderRadius="50%"
          w="30px"
          h="30px"
          borderWidth="1px"
          fontSize="20px"
          icon={<RotateIcon />}
          color="blue.400"
        />
        <Divider orientation="vertical" />
      </Center>
      <Flex py={3} alignItems="center" pl={4} flex={1}>
        <LocationIcon color="gray.500" />
        <LocationAutoComplete placeholder="To" fontSize="md" name="dest" />
      </Flex>
      <Divider d={["block", "block", "none"]} />
      <Center pos="relative" h="100%" w="5px">
        <Divider orientation="vertical" />
      </Center>
      <Flex py={3} alignItems="center" pl={4} flex={1}>
        <CalendarIcon color="gray.500" />
        <DatePicker
          refDeparture={register({ required: true })}
          refArrival={register()}
          nameDeparture="date1"
          nameArrival="date2"
        />
      </Flex>
      <Divider mb={3} d={["block", "block", "none"]} />
      <Button
        isLoading={loading}
        h="auto"
        minH="50px"
        fontWeight="700"
        px={[1, 5, 8]}
        variant="red_gradient"
        type="submit"
        borderRadius={"lg"}
      >
        Add Trip
      </Button>
    </Flex>
  )
})

export const AddTripFormNavigationMenu = ({ expand }) => {
  const formObject = useForm()
  return (
    <>
      <FormProvider {...formObject}>
        <Box id="trip_navigation" className="form" w="100%" h="100%" mx="auto">
          <TopSearchButton expand={expand} />
          <Box px={3} className="overlay">
            <AddTripForm />
          </Box>
        </Box>
      </FormProvider>
    </>
  )
}
