import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react"
import { navigate } from "gatsby-link"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { getOrderContracts, getOrderProposals } from "../../api/contract"
import { getOrder, getOrders, getSuggestedTrips } from "../../api/order"
import { BigOrderCard } from "../../components/Cards/Order/BigOrderCard"
import { CollapsableOrderCard } from "../../components/Cards/Order/CollapsableOrderCard"
import { PublicMediumOrderCard } from "../../components/Cards/Order/MediumOrderCards"
import {
  ToOrderProposalCardNoAccept,
  ToOrderProposalCardWithAccept,
} from "../../components/Cards/Order/toOrderProposalCard"
import {
  PublicMediumTripCard,
  PublicMediumTripCardMessage,
  PublicMediumTripCardProposal,
} from "../../components/Cards/Trip/MediumTripCards"
import Footer from "../../components/Footer"
import { Empty } from "../../components/Misc/Empty"
import { Loader } from "../../components/Misc/Loader"
import { Step, Steps } from "../../components/Misc/Steps"
import NavbarDefault from "../../components/Navbar"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { PaymentCard } from "../../components/Cards/Payment/PaymentCard"
import { CardIcon } from "../../icons/Card"
import CheckIcon from "../../icons/Check"
import { DeliveryBoxIcon } from "../../icons/DeliveryBox"
import { NavigationContext, OrderPageState } from "../../providers/navPage"
import UserStore from "../../store/UserStore"
import { Contract, Contracts, defaultContracts } from "../../types/contract"
import { defaultOrders, Order, Orders } from "../../types/orders"
import { Trips } from "../../types/trip"
import { Hint } from "../../components/Misc/Hint"
import { StripeIcon } from "../../icons/Stripe"

const MyOrderSecondPage = ({ loading }) => {
  const context = useContext(OrderPageState)

  if (!context.contract) return null
  return (
    <Container
      minH="calc(100vh - 100px)"
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
        <Box w="50%">
          <Box mb={5} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
            <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
              Order Summary
            </Heading>
            <CollapsableOrderCard orderData={context.order} />
          </Box>
          <Hint
            py={5}
            borderRadius="xl"
            text="We are going to freeze your money untill you get your item. After receiving your product the money is going to be transfered to your deliverer upon your confirmation"
          />
          {/* <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
            <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
              Deliverer
            </Heading>
            <PublicMediumTripCardMessage
              p={[0, 0, 0]}
              borderWidth="0px"
              trip={context.contract.trip}
            />
          </Box> */}
        </Box>
        <Box w="50%">
          <Box mb={5} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
            <Heading mb={8} as="h1" fontSize="600" fontWeight="700">
              Payment Summary
            </Heading>

            <PaymentCard />
          </Box>
        </Box>
      </HStack>
    </Container>
  )
}

const MyOrderFirstPage = ({ loading }) => {
  const context = useContext(OrderPageState)

  return (
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
        <Box w="50%">
          <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
            <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
              Order Summary
            </Heading>
            <CollapsableOrderCard orderData={context.order} />
          </Box>
          <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
            Suggested trips
          </Heading>
          <VStack mt={6} spacing={6}>
            {context.suggested.results.map((trip, index) => {
              return <PublicMediumTripCardProposal trip={trip} />
            })}
            {loading ? <Loader /> : null}
            {!loading && context.suggested.count == 0 ? (
              <Empty text="No Suggested Trips" />
            ) : null}
          </VStack>
        </Box>
        <Box w="50%">
          <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
            <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
              Proposals
            </Heading>
            <VStack mt={6} spacing={6}>
              {context.proposals.results.map((contract, index) => {
                return (
                  <>
                    {contract.IsOrdererAccepted ? (
                      <ToOrderProposalCardNoAccept contract={contract} />
                    ) : (
                      <ToOrderProposalCardWithAccept contract={contract} />
                    )}
                    {index < context.proposals.results.length - 1 ? (
                      <Divider />
                    ) : null}
                  </>
                )
              })}
            </VStack>
            {loading ? <Loader /> : null}
            {!loading && context.proposals.count == 0 ? (
              <Empty text="No Proposals yet" />
            ) : null}
          </Box>
        </Box>
      </HStack>
    </Container>
  )
}

const MyOrderPage = ({ order }: { order: Order }) => {
  const [suggested, setSuggested]: [Trips, any] = useState(defaultOrders)
  const [proposals, setProposals]: [Contracts, any] = useState(defaultContracts)
  const [contract, setContract]: [Contract, any] = useState(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (order.deliverer) {
      getOrderContracts(order.id)
        .then(e => {
          setContract(e.data)
          setStep(1)
        })
        .finally(() => {
          setLoading(false)
        })
      return
    }
    Promise.all([getSuggestedTrips(order.id), getOrderProposals(order.id)])
      .then(e => {
        setSuggested(e[0].data)
        setProposals(e[1].data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [order])

  return (
    <>
      <NavigationContext.Provider value={{ page: "orders" }}>
        <NavbarDefault />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Container bg="white" py={5} as="section" minW="full">
        <Container maxW="container.lg">
          <Steps>
            <Step
              selected={step}
              step={0}
              title="Deal Settled"
              icon={<CheckIcon />}
            ></Step>
            <Step
              selected={step}
              step={1}
              title="Payment Made"
              icon={<CardIcon />}
            ></Step>
            <Step
              selected={step}
              step={2}
              last
              title="Delivery Complete"
              icon={<DeliveryBoxIcon />}
            ></Step>
          </Steps>
        </Container>
      </Container>
      <OrderPageState.Provider
        value={{
          proposals,
          setProposals,
          step,
          setStep,
          suggested,
          contract,
          setContract,
          order: order,
          setSuggested,
        }}
      >
        <Tabs index={step}>
          <TabPanels>
            <TabPanel p={0}>
              <MyOrderFirstPage loading={loading} />
            </TabPanel>
            <TabPanel p={0}>
              <MyOrderSecondPage loading={loading} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Footer />
      </OrderPageState.Provider>
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
