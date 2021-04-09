import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/layout"
import { navigate } from "gatsby-link"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { getTripContracts, getTripProposals } from "../../api/contract"
import { getTrip, getSuggestedOrders, getTrips } from "../../api/trip"
import { PublicMediumOrderCard } from "../../components/Cards/Order/MediumOrderCards"
import { TripStatsCard } from "../../components/Cards/Stats/TripStats"
import { BigTripCard } from "../../components/Cards/Trip/BigTripCard"
import { PublicMediumTripCard } from "../../components/Cards/Trip/MediumTripCards"
import { TripContractsStateCard } from "../../components/Cards/Trip/TripContractsStateCard"
import { TripProposalsCard } from "../../components/Cards/Trip/TripProposalsCard"
import Footer from "../../components/Footer"
import { Empty } from "../../components/Misc/Empty"
import { Loader } from "../../components/Misc/Loader"
import NavbarDefault from "../../components/Navbar"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { useAuthHook } from "../../hooks/useAuthHook"
import LightBulbIcon from "../../icons/LightBulb"
import { NavigationContext } from "../../providers/navPage"
import UserStore from "../../store/UserStore"
import { Contracts, defaultContracts } from "../../types/contract"
import { defaultOrders, Orders } from "../../types/orders"
import { defaultTrips, Trip, Trips } from "../../types/trip"
const MyTripPage = observer(({ tripId }) => {
  // useAuthHook(user => !user)
  const [trip, setTrip]: [Trip, any] = useState(null)
  const [suggested, setSuggested]: [Orders, any] = useState({
    ...defaultOrders,
    loading: true,
  })

  const [proposals, setProposals]: [Contracts, any] = useState(defaultContracts)
  const [contracts, setContracts]: [Contracts, any] = useState(defaultContracts)

  useEffect(() => {
    if (UserStore.complete && !trip) {
      getTrip(tripId)
        .then(trip => {
          setTrip(trip.data)
        })
        .catch(e => {
          navigate("/404")
        })
        .finally(() => {})
      getSuggestedOrders(tripId).then(e => {
        setSuggested(e.data)
      })
      getTripProposals(tripId).then(e => {
        setProposals(e.data)
      })
      getTripContracts(tripId).then(e => {
        setContracts(e.data)
      })
    }
  }, [UserStore.complete])
  if (!trip) {
    return <Loader />
  }
  return (
    <>
      <NavigationContext.Provider value={{ page: "trips" }}>
        <NavbarDefault />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Container
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
      </Container>
    </>
  )
})
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
      .then(order => {
        setTrip(order.data)
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
