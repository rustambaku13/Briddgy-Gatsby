import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert"
import { Button } from "@chakra-ui/button"
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
import Helmet from "react-helmet"
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
import { BigLoader, Loader } from "../../components/Misc/Loader"
import { StepsContainer } from "../../components/Misc/Steps"
import NavbarDefault from "../../components/Navbar"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { CardIcon } from "../../icons/Card"
import CheckIcon from "../../icons/Check"
import { DeliveryBoxIcon } from "../../icons/DeliveryBox"
import { NavigationContext, TripPageState } from "../../providers/navPage"
import LayoutStore from "../../store/LayoutStore"
import UserStore from "../../store/UserStore"
import { Contracts, defaultContracts } from "../../types/contract"
import { defaultOrders, Orders } from "../../types/orders"
import { defaultTrips, Trip, Trips } from "../../types/trip"
import { getCountryFromCode, tripCityAnywhere } from "../../utils/misc"
const MyTripPage = ({ trip }: { trip: Trip }) => {
  const [suggested, setSuggested]: [Orders, any] = useState(defaultOrders)
  const [proposals, setProposals]: [Contracts, any] = useState(defaultContracts)
  const [contracts, setContracts]: [Contracts, any] = useState(defaultContracts)

  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(-1)
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
      if (e[2].data.count) {
      }
    })
  }, [trip])
  if (!trip) {
    return <Loader />
  }

  const rightPart = (
    <>
      <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
        <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
          Deals
        </Heading>
        {contracts.results.map((contract, index) => {
          return (
            <>
              <TripContractsStateCard contract={contract} />
              {index < contracts.results.length - 1 ? <Divider /> : null}
            </>
          )
        })}
        {loading ? <Loader /> : null}
        {!loading && contracts.count == 0 ? (
          <Empty text="No Deals yet" />
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
                {contract.traveler ? (
                  <ToTripProposalCardNoAccept contract={contract} />
                ) : (
                  <ToTripProposalCardWithAccept contract={contract} />
                )}
                {index < proposals.results.length - 1 ? <Divider /> : null}
              </>
            )
          })}
        </VStack>
        {loading ? <Loader /> : null}
        {!loading && proposals.count == 0 ? (
          <Empty text="No Proposals yet" />
        ) : null}
      </Box>
    </>
  )

  return (
    <>
      <Helmet
        title={`Briddgy | ${tripCityAnywhere(trip.src.city)}, ${
          trip.src.country
        } - ${tripCityAnywhere(trip.dest.city)}, ${trip.dest.country}`}
        defer={false}
      >
        <meta
          name="description"
          content={`My Trip information. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money.`}
        />
      </Helmet>
      <NavigationContext.Provider value={{ page: "trips" }}>
        <NavbarDefault />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Container bg="white" py={5} as="section" minW="full">
        <Box mx="auto" maxW="container.lg">
          <StepsContainer
            selected={step}
            items={[
              {
                title: "Deal Settled",
                icon: <CheckIcon />,
              },
              {
                title: "Make Payment",
                icon: <CardIcon />,
              },
              {
                title: "Receive Item",
                icon: <DeliveryBoxIcon />,
              },
            ]}
          />
        </Box>
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
          <Box
            d={UserStore.me.is_stripe_verified == "C" ? "none" : "block"}
            maxW="container.xxl"
            mx="auto"
            as="section"
          >
            <Alert borderRadius="xl" bg="warning.light" mb={5} status="warning">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Welcome {UserStore.me.first_name}!</AlertTitle>
                <AlertDescription display="block">
                  In order to start making deals please complete your traveler
                  profile
                </AlertDescription>
              </Box>
            </Alert>
            <Button
              onClick={() => {
                LayoutStore.completeProfileModalToggle()
              }}
              ml="auto"
              mb={5}
              variant="primary"
            >
              Complete Profile
            </Button>
          </Box>
          <HStack
            alignItems="flex-start"
            spacing={6}
            maxW="container.xxl"
            mx="auto"
          >
            <Box w={["100%", "100%", "50%"]}>
              <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
                <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
                  Trip Summary
                </Heading>
                <CollapsableTripCard trip={trip} />
              </Box>
              <Box d={["block", "block", "none"]}>{rightPart}</Box>
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
            <Box w="50%" d={["none", "none", "block"]}>
              {rightPart}
            </Box>
          </HStack>
        </Container>
        <Footer />
      </TripPageState.Provider>
    </>
  )
}
const PublicPage = ({ trip }: { trip: Trip }) => {
  const [similarTrips, setSimilarTrips]: [Trips, any] = useState(defaultTrips)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getTrips({})
      .then(data => {
        data.data.results = data.data.results.filter(item => item.id != trip.id)

        setSimilarTrips(data.data)
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return (
    <>
      <Helmet
        title={`Briddgy | ${tripCityAnywhere(trip.src.city)}, ${
          trip.src.country
        } - ${tripCityAnywhere(trip.dest.city)}, ${trip.dest.country}`}
        defer={false}
      >
        <meta
          name="description"
          content={`View available trip. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money.`}
        />
      </Helmet>
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
          {tripCityAnywhere(trip.src.city)}, {trip.src.country} -{" "}
          {tripCityAnywhere(trip.dest.city)}, {trip.dest.country}
        </Text>
        {loading ? (
          <Loader />
        ) : similarTrips.results.length ? (
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
        navigate("/404",{replace:false})
      })
      .finally(() => {})
  }, [tripId])
  if (!UserStore.complete || !trip)
    return (
      <>
        <Helmet title={`Briddgy | Trip Page`} defer={false}>
          <meta
            name="description"
            content={`View available trip. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money.`}
          />
        </Helmet>
        <NavigationContext.Provider value={{ page: "trips" }}>
          <NavbarDefault />
          <BottomNavbar />
        </NavigationContext.Provider>
        <Box py={10} h="100%" w="100vw">
          <BigLoader />
        </Box>
        <Footer />
      </>
    )
  if (trip.owner.id == UserStore.me?.id) {
    return <MyTripPage trip={trip} />
  }
  return <PublicPage trip={trip} />
})
export default SpecificTripPage
