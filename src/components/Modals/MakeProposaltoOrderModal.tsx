import { Divider, HStack } from "@chakra-ui/layout"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import {
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { addContract } from "../../api/contract"
import { getSuggestedTrips } from "../../api/order"
import { ChevronLeftIcon } from "../../icons/ChevronLeft"
import { LightBulbIcon } from "../../icons/LightBulb"
import LayoutStore from "../../store/LayoutStore"
import UserStore from "../../store/UserStore"
import { Trip } from "../../types/trip"
import { trimCityEmpty } from "../../utils/misc"
import { Loader } from "../Misc/Loader"

const shouldModalBeOpened = () => {
  return (
    LayoutStore.toOrderProposalModalActivate &&
    !LayoutStore.toOrderProposalModalContext.trip
  )
}
/**
 * This is a modal that is opened once the LayoutStore.toOrderProposalModalContext is not null
 * If the @function {shouldModalBeOpened} return true that means that @member {LayoutStore.toOrderProposalModalActivate} has a trip set
 * Which in turn means that we actually need to open modal in second page where user enter his preferred reward
 */
export const MakeProposaltoOrderModal = observer(() => {
  const [filteredTrips, setFilteredTrips] = useState({
    loading: true,
    results: [],
  })
  const toast = useToast()
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const { handleSubmit, register, errors } = useForm()
  const selectedTrip: { current: Trip } = useRef(null)

  const fetchSuggestions = () => {
    getSuggestedTrips(
      LayoutStore.toOrderProposalModalContext.order.id,
      UserStore.me.id
    ).then(trips => {
      setFilteredTrips({ loading: false, results: trips.data.results })
    })
  }

  useEffect(() => {
    // Fetch the Trips suitable
    if (!LayoutStore.toOrderProposalModalActivate) return
    if (shouldModalBeOpened()) fetchSuggestions()
    else {
      selectedTrip.current = LayoutStore.toOrderProposalModalContext.trip
      setPage(1)
    }
  }, [LayoutStore.toOrderProposalModalActivate])
  const switchPage = e => {
    // Turn to the next page
    const trip = filteredTrips.results.filter(
      trip => trip.id == e.currentTarget.value
    )
    selectedTrip.current = trip[0]
    setPage(1)
  }
  const closeModal = () => {
    LayoutStore.toOrderProposalModalOpen(null)
    setPage(0)
    selectedTrip.current = null
    setFilteredTrips({ results: [], loading: true })
  }
  const proposalHandler = data => {
    // Actually make a contract
    setLoading(true)
    addContract({
      order: LayoutStore.toOrderProposalModalContext.order.id,
      trip: selectedTrip.current.id,
      price_bid: data.price,
    })
      .then(e => {
        LayoutStore.toOrderProposalModalContext.callback
          ? LayoutStore.toOrderProposalModalContext.callback()
          : null

        closeModal()
        toast({
          title: "Proposal was made",
          description: "Wait for the orderer to confirm your delivery",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      })
      .catch(() => {
        toast({
          title: "Error has occured",
          description: "Please try again later or contract our support",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Modal
      isOpen={LayoutStore.toOrderProposalModalContext != null}
      onClose={closeModal}
    >
      <form onSubmit={handleSubmit(proposalHandler)}>
        <ModalOverlay></ModalOverlay>
        <ModalContent maxW="container.sm">
          <ModalHeader>
            {page == 0
              ? `You have ${filteredTrips.results.length} suitable Trips`
              : `${trimCityEmpty(
                  selectedTrip.current.src.city
                )} ${selectedTrip.current.src.country} - ${trimCityEmpty(
                  selectedTrip.current.dest.city
                )} ${selectedTrip.current.dest.country}`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="sm">
            <Tabs index={page}>
              <TabPanels>
                <TabPanel w="100%" h="100%" p={0}>
                  <Text
                    w="100%"
                    px={2}
                    bg="lilaPurple.light"
                    mb={8}
                    py={5}
                    borderRadius="md"
                  >
                    <LightBulbIcon float="left" fontSize="500" />
                    Select the trips that would like to offer for this order
                  </Text>

                  {filteredTrips.loading ? <Loader mx="auto" /> : null}
                  {filteredTrips.results.map((trip: Trip) => (
                    <div key={trip.id}>
                      <HStack my={2} spacing={4}>
                        <Text flex={1} variant="secondary">
                          {trimCityEmpty(trip.src.city)}
                          {trip.src.country}
                        </Text>
                        <Text flex={1} variant="secondary">
                          {trimCityEmpty(trip.dest.city)}
                          {trip.dest.country}
                        </Text>
                        <Text flex={1} variant="secondary">
                          {trip.weight_limit} kg
                        </Text>
                        <Text flex={1} variant="secondary">
                          {trip.date}
                        </Text>
                        <Button
                          w="12"
                          variant="link"
                          value={trip.id}
                          color="blue.500"
                          size="sm"
                          onClick={switchPage}
                        >
                          select
                        </Button>
                      </HStack>
                      <Divider my={5} />
                    </div>
                  ))}
                </TabPanel>
                <TabPanel p={0} w="100%" h="100%">
                  <Text
                    w="100%"
                    px={2}
                    bg="lilaPurple.light"
                    mb={8}
                    py={5}
                    borderRadius="md"
                  >
                    <LightBulbIcon float="left" fontSize="20px" mr={2} />
                    You can bid for a different reward than the one that has
                    been set by the order
                  </Text>
                  <FormControl>
                    {" "}
                    <FormLabel>Your reward</FormLabel>
                    <InputGroup size="lg">
                      <InputLeftAddon children="$" />
                      <NumberInput
                        defaultValue={
                          LayoutStore.toOrderProposalModalContext?.order.price
                        }
                        maxW="200px"
                      >
                        <NumberInputField
                          name="price"
                          ref={register({
                            required: "Your Reward is required",
                          })}
                          placeholder="159.99"
                        />
                      </NumberInput>
                    </InputGroup>
                    <Text color="red.600">{errors.price?.message}</Text>
                  </FormControl>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            {page == 1 ? (
              <>
                <Button
                  d={shouldModalBeOpened() ? "flex" : "none"}
                  leftIcon={<ChevronLeftIcon />}
                  mr="auto"
                  onClick={() => {
                    setPage(0)
                  }}
                >
                  {" "}
                  Back
                </Button>
                <Button isLoading={loading} type="submit" variant="success">
                  Offer Now
                </Button>
              </>
            ) : null}
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
})
