import { Box, Divider, Heading, HStack } from "@chakra-ui/layout"
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  useToast,
} from "@chakra-ui/react"
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  Input,
  InputLeftElement,
  Radio,
  RadioGroup,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
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
import { Trip, Trips } from "../../types/trip"
import { trimCityEmpty } from "../../utils/misc"
import { Loader } from "../Misc/Loader"
export const MakeProposalOrderModal = observer(() => {
  const [filteredTrips, setFilteredTrips] = useState({
    loading: true,
    results: [],
  })
  const toast = useToast()
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const { handleSubmit, register, errors } = useForm()
  const selectedTrip = useRef(null)
  useEffect(() => {
    // Fetch the trips if I have not yet visited profile page
    if (
      UserStore.trips.loading &&
      LayoutStore.makeProposaltoOrderModalVisible
    ) {
      UserStore.fetchMyTrips()
    }
  }, [LayoutStore.makeProposaltoOrderModalVisible])
  useEffect(() => {
    // Filter the needed Trips
    if (UserStore.upcomingTrips.length && LayoutStore.toOrderProposalContext) {
      getSuggestedTrips(
        LayoutStore.toOrderProposalContext.order.id,
        UserStore.me.id
      ).then(trips => {
        setFilteredTrips({ loading: false, results: trips.data.results })
      })
    }
  }, [UserStore.upcomingTrips, LayoutStore.makeProposaltoOrderModalVisible])
  const switchPage = e => {
    const trip = filteredTrips.results.filter(
      trip => trip.id == e.currentTarget.value
    )
    selectedTrip.current = trip[0]
    setPage(1)
  }
  const closeModal = () => {
    LayoutStore.savetoOrderProposalContext(null)
    setPage(0)
    selectedTrip.current = null
    LayoutStore.toggleProposaltoOrderModal()
    setFilteredTrips({ results: [], loading: true })
  }
  const proposalHandler = data => {
    setLoading(true)
    addContract({
      order: LayoutStore.toOrderProposalContext.order.id,
      trip: selectedTrip.current.id,
      price_bid: data.price,
    })
      .then(e => {
        closeModal()
        toast({
          title: "Proposal was made",
          description: "Wait for the orderer to confirm your delivery",
          status: "success",
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
      isOpen={LayoutStore.makeProposaltoOrderModalVisible}
      onClose={closeModal}
    >
      <ModalOverlay></ModalOverlay>
      <ModalContent
        onSubmit={handleSubmit(proposalHandler)}
        as="form"
        w="full"
        maxW="container.sm"
      >
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody fontSize="sm">
          <Tabs index={page}>
            <TabPanels>
              <TabPanel w="100%" h="100%" p={0}>
                <Heading mb={5} fontSize="2xl">
                  {`You have ${filteredTrips.results.length} suitable Trips`}
                </Heading>

                <Text
                  w="100%"
                  bg="lightBlue.200"
                  mb={8}
                  px={2}
                  py={5}
                  borderRadius="md"
                >
                  <LightBulbIcon float="left" fontSize="20px" mr={2} />
                  Select the trips that would like to offer for this order
                </Text>
                <HStack mb={5} spacing={4}>
                  <Text
                    fontWeight="500"
                    flex={1}
                    flexGrow={1}
                    variant="secondary"
                  >
                    From
                  </Text>
                  <Text
                    fontWeight="500"
                    flex={1}
                    flexGrow={1}
                    variant="secondary"
                  >
                    To
                  </Text>
                  <Text
                    flexGrow={0}
                    fontWeight="500"
                    flex={1}
                    variant="secondary"
                  >
                    Baggage
                  </Text>
                  <Text
                    flex={1}
                    flexGrow={1}
                    fontWeight="500"
                    variant="secondary"
                  >
                    Date
                  </Text>
                  <Text w="50px"></Text>
                </HStack>
                {filteredTrips.loading ? <Loader mx="auto" /> : null}
                {filteredTrips.results.map((trip: Trip) => (
                  <div key={trip.id}>
                    <HStack my={2} spacing={4}>
                      <Text flex={1} variant="secondary">
                        {trimCityEmpty(trip.source.city)}
                        {trip.source.country_en}
                      </Text>
                      <Text flex={1} variant="secondary">
                        {trimCityEmpty(trip.destination.city)}
                        {trip.destination.country_en}
                      </Text>
                      <Text flex={1} variant="secondary">
                        {trip.weight_limit} kg
                      </Text>
                      <Text flex={1} variant="secondary">
                        {trip.date}
                      </Text>
                      <Button
                        w="50px"
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
                <Heading mb={5} fontSize="2xl">
                  {trimCityEmpty(selectedTrip.current?.source?.city)}
                  {selectedTrip.current?.source?.country_en}
                  &nbsp;- &nbsp;
                  {trimCityEmpty(selectedTrip.current?.destination?.city)}
                  {selectedTrip.current?.destination?.country_en}
                </Heading>{" "}
                <Text
                  w="100%"
                  bg="lightBlue.200"
                  mb={8}
                  px={2}
                  py={5}
                  borderRadius="md"
                >
                  <LightBulbIcon float="left" fontSize="20px" mr={2} />
                  You can bid for a different reward than the one that has been
                  set by the order
                </Text>
                <FormControl>
                  {" "}
                  <FormLabel>Your reward</FormLabel>
                  <InputGroup size="lg">
                    <InputLeftAddon children="$" />
                    <NumberInput
                      defaultValue={
                        LayoutStore.toOrderProposalContext?.order.price
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
                leftIcon={<ChevronLeftIcon />}
                mr="auto"
                onClick={() => {
                  setPage(0)
                }}
              >
                {" "}
                Back
              </Button>
              <Button isLoading={loading} type="submit" variant="primary">
                Submit
              </Button>
            </>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})
