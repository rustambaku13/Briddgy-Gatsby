import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { navigate } from "gatsby-link"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { getOrderProposals } from "../../api/contract"
import { getOrder, getOrders, getSuggestedTrips } from "../../api/order"
import { getTrips } from "../../api/trip"
import { BigOrderCard } from "../../components/Cards/Order/BigOrderCard"
import { CollapsableOrderCard } from "../../components/Cards/Order/CollapsableOrderCard"
import { PublicMediumOrderCard } from "../../components/Cards/Order/MediumOrderCards"
import { ToOrderProposalCard } from "../../components/Cards/Order/toOrderProposalCard"
import { PublicMediumTripCard } from "../../components/Cards/Trip/MediumTripCards"
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
import { defaultOrders, Order, Orders } from "../../types/orders"
import { defaultTrips, Trips } from "../../types/trip"
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
  }, [])

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
          maxW="container.xl"
          mx="auto"
        >
          <Box flex={2}>
            <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
              <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
                Order Summary
              </Heading>
              <CollapsableOrderCard orderData={order} />
            </Box>
            <Heading mb={4} as="h1" fontSize="600">
              Suggested Trips
            </Heading>
            <VStack spacing={4}>
              {suggested.results.map(trip => (
                <PublicMediumTripCard trip={trip} />
              ))}
            </VStack>
          </Box>
          <Box flex={3}>
            <Box bg="white" borderRadius="xl" borderWidth="1px" p={6}>
              <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
                Proposals
              </Heading>
              <VStack spacing={4}>
                {proposals.results.map(contract => (
                  <ToOrderProposalCard contract={contract} />
                ))}
              </VStack>
            </Box>
          </Box>
        </HStack>
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
