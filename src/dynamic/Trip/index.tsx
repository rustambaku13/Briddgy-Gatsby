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
import { BigTripCard } from "../../components/Cards/Trip/BigTripCard"
import { CollapsableTripCard } from "../../components/Cards/Trip/CollapsableTripCard"
import { PublicMediumTripCard } from "../../components/Cards/Trip/MediumTripCards"
import { ToTripProposalCard } from "../../components/Cards/Trip/toTripProposalCard"
import Footer from "../../components/Footer"
import { Empty } from "../../components/Misc/Empty"
import { Loader } from "../../components/Misc/Loader"
import { Step, Steps } from "../../components/Misc/Steps"
import NavbarDefault from "../../components/Navbar"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { CardIcon } from "../../icons/Card"
import CheckIcon from "../../icons/Check"
import { DeliveryBoxIcon } from "../../icons/DeliveryBox"
import { NavigationContext } from "../../providers/navPage"
import UserStore from "../../store/UserStore"
import { Contracts, defaultContracts } from "../../types/contract"
import { defaultOrders, Orders } from "../../types/orders"
import { defaultTrips, Trip, Trips } from "../../types/trip"
const MyTripPage = ({ trip }: { trip: Trip }) => {
  // useAuthHook(user => !user)
  const [suggested, setSuggested]: [Orders, any] = useState({
    ...defaultOrders,
    loading: true,
  })

  const [proposals, setProposals]: [Contracts, any] = useState(defaultContracts)
  const [contracts, setContracts]: [Contracts, any] = useState(defaultContracts)

  useEffect(() => {
    getSuggestedOrders(trip.id).then(e => {
      setSuggested(e.data)
    })
    getTripProposals(trip.id).then(e => {
      setProposals(e.data)
    })
    getTripContracts(trip.id).then(e => {
      setContracts(e.data)
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
          w="100%"
          maxW="container.xxl"
          mx="auto"
        >
          <Box flex={2}>
            <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
              <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
                Trip Summary
              </Heading>
              <CollapsableTripCard trip={trip} />
            </Box>
            <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
              Suggested orders
            </Heading>
            {suggested.results.map(order => {
              return <PublicMediumTripCard orderData={order} />
            })}
            {suggested.loading ? <Loader /> : null}
            {!suggested.loading && suggested.count == 0 ? (
              <Empty text="No Suggested Orders" />
            ) : null}
          </Box>
          <Box flex={3}>
            <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
              <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
                Proposals
              </Heading>
              {proposals.results.map((contract, index) => {
                return (
                  <>
                    <ToTripProposalCard contract={contract} />
                    {index < proposals.results.length - 1 ? <Divider /> : null}
                  </>
                )
              })}
              {!proposals.loading && proposals.count == 0 ? (
                <Empty text="No Proposals yet" />
              ) : null}
            </Box>
            <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
              <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
                Contracts
              </Heading>
              {contracts.results.map((contract, index) => {
                return (
                  <>
                    <ToTripProposalCard contract={contract} />
                    {index < contracts.results.length - 1 ? <Divider /> : null}
                  </>
                )
              })}
              {!contracts.loading && contracts.count == 0 ? (
                <Empty text="No Contracts yet" />
              ) : null}
            </Box>
          </Box>
        </HStack>
      </Container>
      {/* <Container
        minH="calc(100vh - 55px)"
        px={16}
        bg="blueAlpha.100"
        pt={8}
        as="section"
        minW="full"
      >
        <Flex>
          <Box mr={10} flex={1}>
            <BigTripCard trip={trip} />
            <SimpleGrid spacing={5} mt={5} columns={[1, 1, 1, 2]}>
              <TripStatsCard trip={trip} />
              <Box p={5} bg="white" borderRadius="3xl" borderWidth="1px">
                <LightBulbIcon float="left" fontSize="xl" />
                <Text variant="secondary">
                  All orders have been paid for and your money is 100%
                  guaranteed. Buy and deliver and earn your rewards{" "}
                </Text>
              </Box>
            </SimpleGrid>
            <Divider my="50px" />
            <Heading as="h3" fontSize="2xl">
              Suggested Orders
            </Heading>
            {suggested.results.map(order => {
              return <PublicMediumOrderCard orderData={order} />
            })}
            {suggested.loading ? <Loader /> : null}
            {!suggested.loading && suggested.count == 0 ? (
              <Empty text="No Suggested Orders" />
            ) : null}
          </Box>
          <Box flex={1}>
            <Box
              overflow="hidden"
              mb="30px"
              bg="white"
              px={8}
              py={12}
              borderWidth="1px"
              borderRadius="3xl"
            >
              <Heading px={3} mb={8} fontSize="2xl">
                Active
              </Heading>
              {contracts.results.map((contract, index) => {
                return (
                  <>
                    <TripContractsStateCard contract={contract} />
                    {index < contracts.results.length - 1 ? <Divider /> : null}
                  </>
                )
              })}
            </Box>

            <Box bg="white" px={8} py={12} borderWidth="1px" borderRadius="3xl">
              <Heading mb={5} fontSize="2xl">
                Proposals
              </Heading>
              {proposals.results.map((contract, index) => {
                return (
                  <>
                    <TripProposalsCard contract={contract} />
                    {index < contracts.results.length - 1 ? <Divider /> : null}
                  </>
                )
              })}
            </Box>
          </Box>
        </Flex>
      </Container> */}
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
  if (!UserStore.complete || !trip) return null
  if (trip.owner.id == UserStore.me?.id) {
    return <MyTripPage trip={trip} />
  }
  return <PublicPage trip={trip} />
})
export default SpecificTripPage
