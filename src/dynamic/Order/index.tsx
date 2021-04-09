import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"
import { navigate } from "gatsby-link"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { getOrderProposals } from "../../api/contract"
import { getOrder, getOrders, getSuggestedTrips } from "../../api/order"
import { PublicMediumTripCard } from "../../components/Cards/Trip/MediumTripCards"
import { BigOrderCard } from "../../components/Cards/Order/BigOrderCard"
import { OrderProposalCard } from "../../components/Cards/Order/OrderProposalCard"
import { Loader } from "../../components/Misc/Loader"
import NavbarDefault from "../../components/Navbar"
import UserStore from "../../store/UserStore"
import { Contracts, defaultContracts } from "../../types/contract"
import { defaultOrders, Order, Orders } from "../../types/orders"
import { defaultTrips, Trips } from "../../types/trip"
import { PublicMediumOrderCard } from "../../components/Cards/Order/MediumOrderCards"
import { Empty } from "../../components/Misc/Empty"
import Footer from "../../components/Footer"
import { NavigationContext } from "../../providers/navPage"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
const MyOrderPage = ({ order }: { order: Order }) => {
  const [suggested, setSuggested]: [Trips, any] = useState({
    ...defaultTrips,
    loading: true,
  })
  const [proposals, setProposals]: [Contracts, any] = useState(defaultContracts)

  useEffect(() => {
    if (UserStore.complete && !order) {
      getOrderProposals(order.id).then(e => {
        setProposals(e.data)
      })
      getSuggestedTrips(order.id).then(e => {
        setSuggested(e.data)
      })
    }
  }, [UserStore.complete])

  const proposalRejectCallback = contract => {
    proposals.results = proposals.results.filter(item => item != contract)
    setProposals({ ...proposals })
  }
  const proposalAcceptCallback = contract => {}
  if (!order) {
    return <Loader />
  }
  return (
    <>
      <NavigationContext.Provider value={{ page: "orders" }}>
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
        <Flex mx="auto" maxW="container.xl" w="100%">
          <BigOrderCard mr={8} orderData={order} maxW="450px" />
          <Box flex={1}>
            <Box
              overflow="hidden"
              mb="30px"
              bg="white"
              px={8}
              py={12}
              borderWidth="1px"
              borderRadius="xl"
            >
              <Heading px={3} mb={8} fontSize="2xl">
                Proposals
              </Heading>
              {proposals.results.map((contract, index) => {
                return (
                  <>
                    <OrderProposalCard
                      rejectCallback={proposalRejectCallback}
                      contract={contract}
                    />
                    {index < proposals.results.length - 1 ? <Divider /> : null}
                  </>
                )
              })}
            </Box>
            <Box overflow="hidden" mb="30px">
              <Heading px={3} mb={8} fontSize="2xl">
                Suggested
              </Heading>
              {suggested.results.map((trip, index) => {
                return (
                  <>
                    <PublicMediumTripCard trip={trip} />
                    {index < suggested.results.length - 1 ? <Divider /> : null}
                  </>
                )
              })}
            </Box>
          </Box>
        </Flex>
      </Container>
    </>
  )
}
const PublicPage = ({ order }: { order: Order }) => {
  const [similarOrders, setSimilarOrders]: [Orders, any] = useState(
    defaultOrders
  )
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getOrders({})
      .then(data => {
        setSimilarOrders(data.data)
      })
      .catch(() => {})
      .finally(() => {})
  }, [])
  return (
    <>
      <NavigationContext.Provider value={{ page: "orders" }}>
        <NavbarDefault />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Container maxW="container.lg" mt={[5, 10]}>
        <BigOrderCard orderData={order} />
      </Container>
      <Divider my="60px" />
      <Container maxW="container.md">
        <Heading fontSize="hb3" fontWeight="700" textAlign="center">
          Similar Orders
        </Heading>
        <Text mb={10} textAlign="center" variant="light" fontSize="600">
          Baku, Azerbaijan - Ankara, Turkey
        </Text>
        {loading ? null : similarOrders.results.length ? (
          <VStack w="100%" mx="auto" py={9} spacing={10}>
            {similarOrders.results.map((order: Order) => (
              <PublicMediumOrderCard mx="auto" orderData={order} />
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

const SpecificOrderPage = observer(({ orderId }) => {
  const [order, setOrder]: [Order | null, any] = useState(null)
  useEffect(() => {
    getOrder(orderId)
      .then(order => {
        setOrder(order.data)
      })
      .catch(e => {
        navigate("/404")
      })
      .finally(() => {})
  }, [])

  if (!UserStore.complete || !order) return null
  if (order.owner.id == UserStore.me?.id) {
    return <MyOrderPage order={order} />
  }
  return <PublicPage order={order} />
})

export default SpecificOrderPage
