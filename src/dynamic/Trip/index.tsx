import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout"
import { navigate } from "gatsby-link"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { getTripContracts, getTripProposals } from "../../api/contract"
import { getSuggestedOrders, getTrip, getTrips } from "../../api/trip"
import { PublicMediumOrderCardProposal } from "../../components/Cards/Order/MediumOrderCards"
import { BigTripCard } from "../../components/Cards/Trip/BigTripCard"
import { CollapsableTripCard } from "../../components/Cards/Trip/CollapsableTripCard"
import { PublicMediumTripCard } from "../../components/Cards/Trip/MediumTripCards"
import {
  ToTripProposalCardNoAccept,
  ToTripProposalCardWithAccept,
} from "../../components/Cards/Trip/toTripProposalCard"
import { TripContractsStateCard } from "../../components/Cards/Trip/TripContractsStateCard"
import Footer from "../../components/Footer"
import { Empty } from "../../components/Misc/Empty"
import { Loader } from "../../components/Misc/Loader"
import { Step, Steps } from "../../components/Misc/Steps"
import NavbarDefault from "../../components/Navbar"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { CardIcon } from "../../icons/Card"
import CheckIcon from "../../icons/Check"
import { DeliveryBoxIcon } from "../../icons/DeliveryBox"
import { NavigationContext, TripPageState } from "../../providers/navPage"
import UserStore from "../../store/UserStore"
import { Contracts, defaultContracts } from "../../types/contract"
import { defaultOrders, Orders } from "../../types/orders"
import { defaultTrips, Trip, Trips } from "../../types/trip"

const MyTripPage = ({ trip }: { trip: Trip }) => {
  const [suggested, setSuggested]: [Orders, any] = useState(defaultOrders)
  const [proposals, setProposals]: [Contracts, any] = useState(defaultContracts)
  const [contracts, setContracts]: [Contracts, any] = useState(defaultContracts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getSuggestedOrders(trip.id),
      getTripProposals(trip.id),
      getTripContracts(trip.id),
    ]).then(e => {
      setSuggested(e[0].data)
      setProposals(e[1].data)
      setContracts(e[2].data)
      setLoading(false)
    })
  }, [trip])
  if (!trip) {
    return <Loader />
  }
  return (
    <>
      <NavigationContext.Provider value={{ page: "trips" }}>
        <NavbarDefault />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Container bg="white" py={5} as="section" minW="full">
        <Container maxW="container.lg">
          <Steps>
            <Step step={1} title="Deal Settled" icon={<CheckIcon />}></Step>
            <Step step={2} title="Payment Made" icon={<CardIcon />}></Step>
            <Step
              step={3}
              title="Delivery Complete"
              icon={<DeliveryBoxIcon />}
            ></Step>
            <Step
              last
              step={4}
              title="Payment Transfered"
              icon={<CheckIcon />}
            ></Step>
          </Steps>
        </Container>
      </Container>
      <TripPageState.Provider
        value={{
          trip,
          proposals,
          setProposals,
          suggested,
          setSuggested,
          contracts,
          setContracts,
        }}
      >
        <Container
          minH="calc(100vh - 200px)"
          bg="outline.light"
          py={5}
          as="section"
          minW="full"
        >
          <HStack
            alignItems="flex-start"
            spacing={6}
            maxW="container.xxl"
            mx="auto"
          >
            <Box w={["100%", "100%", "100%", "50%"]}>
              <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
                <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
                  Trip Summary
                </Heading>
                <CollapsableTripCard trip={trip} />
              </Box>
              <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
                Suggested orders
              </Heading>
              <VStack mt={6} spacing={6}>
                {suggested.results.map((order, index) => {
                  return <PublicMediumOrderCardProposal orderData={order} />
                })}
                {loading ? <Loader /> : null}
                {!loading && suggested.count == 0 ? (
                  <Empty text="No Suggested Orders" />
                ) : null}
              </VStack>
            </Box>
            <Box w={["100%", "100%", "100%", "50%"]}>
              <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
                <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
                  Deals
                </Heading>
                {contracts.results.map((contract, index) => {
                  return (
                    <>
                      <TripContractsStateCard contract={contract} />
                      {index < contracts.results.length - 1 ? (
                        <Divider />
                      ) : null}
                    </>
                  )
                })}
                {loading ? <Loader /> : null}
                {!loading && contracts.count == 0 ? (
                  <Empty text="No Contracts yet" />
                ) : null}
              </Box>
              <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
                <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
                  Proposals
                </Heading>
                <VStack mt={6} spacing={6}>
                  {proposals.results.map((contract, index) => {
                    return (
                      <>
                        {contract.IsTravelerAccepted ? (
                          <ToTripProposalCardNoAccept contract={contract} />
                        ) : (
                          <ToTripProposalCardWithAccept contract={contract} />
                        )}
                        {index < proposals.results.length - 1 ? (
                          <Divider />
                        ) : null}
                      </>
                    )
                  })}
                </VStack>
                {loading ? <Loader /> : null}
                {!loading && proposals.count == 0 ? (
                  <Empty text="No Proposals yet" />
                ) : null}
              </Box>
            </Box>
          </HStack>
        </Container>
      </TripPageState.Provider>
    </>
  )
}
const PublicPage = ({ trip }) => {
  const [similarTrips, setSimilarTrips]: [Trips, any] = useState(defaultTrips)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getTrips({})
      .then(data => {
        setSimilarTrips(data.data)
      })
      .catch(() => {})
      .finally(() => {})
  }, [])
  return (
    <>
      <NavigationContext.Provider value={{ page: "trips" }}>
        <NavbarDefault />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Container maxW="container.md" mt={[5, 10]}>
        <BigTripCard trip={trip} />
      </Container>
      <Divider my="60px" />
      <Container maxW="container.md">
        <Heading fontSize="hb3" fontWeight="700" textAlign="center">
          Similar Trips
        </Heading>
        <Text mb={10} textAlign="center" variant="light" fontSize="600">
          Baku, Azerbaijan - Ankara, Turkey
        </Text>
        {loading ? null : similarTrips.results.length ? (
          <VStack w="100%" mx="auto" py={9} spacing={10}>
            {similarTrips.results.map((trip: Trip) => (
              <PublicMediumTripCard mx="auto" trip={trip} />
            ))}
          </VStack>
        ) : (
          <Empty mb="50px" />
        )}
      </Container>
      <Footer />
    </>
  )
}

const SpecificTripPage = observer(({ tripId }) => {
  const [trip, setTrip]: [Trip | null, any] = useState(null)

  useEffect(() => {
    getTrip(tripId)
      .then(trip => {
        setTrip(trip.data)
      })
      .catch(e => {
        navigate("/404")
      })
      .finally(() => {})
  }, [tripId])
  if (!UserStore.complete || !trip) return <Loader />
  if (trip.owner.id == UserStore.me?.id) {
    return <MyTripPage trip={trip} />
  }
  return <PublicPage trip={trip} />
})
export default SpecificTripPage
