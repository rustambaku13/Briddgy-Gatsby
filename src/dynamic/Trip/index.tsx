import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout"
import { navigate } from "gatsby-link"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { getTripContracts, getTripProposals } from "../../api/contract"
import { getTrip, getSuggestedOrders } from "../../api/trip"
import { PublicMediumOrderCard } from "../../components/Cards/Order/MediumOrderCards"
import { TripStatsCard } from "../../components/Cards/Stats/TripStats"
import { BigTripCard } from "../../components/Cards/Trip/BigTripCard"
import { TripContractsStateCard } from "../../components/Cards/Trip/TripContractsStateCard"
import { TripProposalsCard } from "../../components/Cards/Trip/TripProposalsCard"
import { Empty } from "../../components/Misc/Empty"
import { Loader } from "../../components/Misc/Loader"
import NavbarDefault from "../../components/Navbar"
import { useAuthHook } from "../../hooks/useAuthHook"
import LightBulbIcon from "../../icons/LightBulb"
import UserStore from "../../store/UserStore"
import { Contracts, defaultContracts } from "../../types/contract"
import { defaultOrders, Orders } from "../../types/orders"
import { Trip } from "../../types/trip"
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
      <NavbarDefault />
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

export default MyTripPage
