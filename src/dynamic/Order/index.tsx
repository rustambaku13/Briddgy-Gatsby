import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { navigate } from "gatsby-link"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import Helmet from "react-helmet"
import {
  getOrderContracts,
  getOrderProposals,
  itemDelivered,
} from "../../api/contract"
import { getOrder, getOrders, getSuggestedTrips } from "../../api/order"
import { BigOrderCard } from "../../components/Cards/Order/BigOrderCard"
import {
  CollapsableOrderCard,
  CollapsableOrderCardwTrip,
} from "../../components/Cards/Order/CollapsableOrderCard"
import { PublicMediumOrderCard } from "../../components/Cards/Order/MediumOrderCards"
import {
  ToOrderProposalCardNoAccept,
  ToOrderProposalCardWithAccept,
} from "../../components/Cards/Order/toOrderProposalCard"
import { PaymentCard } from "../../components/Cards/Payment/PaymentCard"
import { PublicMediumTripCardProposal } from "../../components/Cards/Trip/MediumTripCards"
import Footer from "../../components/Footer"
import { Empty } from "../../components/Misc/Empty"
import { Hint } from "../../components/Misc/Hint"
import { Loader } from "../../components/Misc/Loader"
import { StepsContainer } from "../../components/Misc/Steps"
import NavbarDefault from "../../components/Navbar"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { CardIcon } from "../../icons/Card"
import CheckIcon from "../../icons/Check"
import { DeliveryBoxIcon } from "../../icons/DeliveryBox"
import { StarIcon } from "../../icons/Star"
import { NavigationContext, OrderPageState } from "../../providers/navPage"
import LayoutStore from "../../store/LayoutStore"
import UserStore from "../../store/UserStore"
import { Contract, Contracts, defaultContracts } from "../../types/contract"
import { defaultOrders, Order, Orders } from "../../types/orders"
import { Trips } from "../../types/trip"
const stripePromise = loadStripe(
  "pk_test_51Htr6JGfJpinijwgZ0o2g7zbJNN9ayprpLtKsv2SpyO5f8pn849rn1EApeCVID7C7mUo4jUjEcYJ4Z2SthL0TcIB00L0hynXAX"
)

const MyOrderThridPage = ({ loading }) => {
  const context = useContext(OrderPageState)
  const [step, setStep] = useState(0)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    if (context.contract?.state == "GRB") setStep(1)
    else if (context.contract?.state == "DLV") setStep(2)
    else if (context.contract?.state == "FIN") setStep(3)
  }, [context.contract])
  const deliveredHandler = async () => {
    setLoading(true)
    itemDelivered(context.contract.id)
      .then(() => {
        context.contract.state = "FIN"
        context.setContract({ ...context.contract })
      })
      .finally(() => {
        setLoading(false)
      })
  }
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
        flexWrap={["wrap", "wrap", "nowrap"]}
        spacing={[0, 0, 6]}
        maxW="container.xxl"
        mx="auto"
      >
        <Box w={["100%", "100%", "50%"]}>
          <Box mb={5} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
            <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
              Order Summary
            </Heading>
            <CollapsableOrderCardwTrip contract={context.contract} />
          </Box>
        </Box>
        <Box w={["100%", "100%", "50%"]}>
          <Box mb={5} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
            <Heading mb={8} as="h1" fontSize="600" fontWeight="700">
              Tracking Summary
            </Heading>

            <StepsContainer
              selected={step}
              horizontal={false}
              items={[
                {
                  title: "Product Grabbed",
                  description:
                    "The traveler has bought the product with his money",
                  icon: <DeliveryBoxIcon />,
                },
                {
                  title: "Product Delivered",
                  description: "Confirm that your have received the product",
                  children: (
                    <Button
                      isLoading={isLoading}
                      onClick={() => {
                        LayoutStore.alertDialogModalOpen({
                          title: "Confirm delivery",
                          success: true,
                          yes: "Yes",
                          callback: deliveredHandler,
                          no: "No",
                          description:
                            "Do you confirm the delivery of the product? Please notice that after confirmation the money is going to be transfered to the traveler ",
                        })
                      }}
                      isDisabled={step != 1}
                      variant="success"
                      size="sm"
                    >
                      Confirm Delivery
                    </Button>
                  ),
                  icon: <CheckIcon />,
                },
                {
                  title: "Leave a Review",
                  description: "Drop an honest review for the traveler",
                  icon: <StarIcon />,
                },
              ]}
            />
          </Box>
        </Box>
      </HStack>
    </Container>
  )
}

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
        flexWrap={["wrap", "wrap", "nowrap"]}
        spacing={[0, 0, 6]}
        maxW="container.xxl"
        mx="auto"
      >
        <Box w={["100%", "100%", "50%"]}>
          <Box mb={5} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
            <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
              Order Summary
            </Heading>
            <CollapsableOrderCardwTrip contract={context.contract} />
          </Box>
          <Hint
            py={5}
            borderRadius="xl"
            text="We are going to freeze your money untill you get your item. After receiving your product the money is going to be transfered to your deliverer upon your confirmation"
          />
        </Box>
        <Box w={["100%", "100%", "50%"]}>
          <Box mb={5} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
            <Heading mb={8} as="h1" fontSize="600" fontWeight="700">
              Payment Summary
            </Heading>
            <Elements stripe={stripePromise}>
              <PaymentCard />
            </Elements>
          </Box>
        </Box>
      </HStack>
    </Container>
  )
}

const MyOrderFirstPage = ({ loading }) => {
  const context = useContext(OrderPageState)
  const proposals = (
    <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
      <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
        Proposals
      </Heading>
      <VStack mt={6} spacing={6}>
        {context.proposals.results.map((contract, index) => {
          return (
            <>
              {contract.orderer ? (
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
  )
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
        <Box w={["100%", "100%", "50%"]}>
          <Box mb={10} bg="white" borderRadius="xl" borderWidth="1px" p={6}>
            <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
              Order Summary
            </Heading>
            <CollapsableOrderCard orderData={context.order} />
          </Box>
          <Box d={["block", "block", "none"]}>{proposals}</Box>
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
        <Box w={"50%"} d={["none", "none", "block"]}>
          {proposals}
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
          if (e.data.state == "SET") setStep(1)
          else setStep(2)
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
      <Helmet title={`Briddgy | ${order.title}`} defer={false}>
        <meta
          name="description"
          content={`View my order. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money.`}
        />
      </Helmet>
      <NavigationContext.Provider value={{ page: "orders" }}>
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
            <TabPanel p={0}>
              <MyOrderThridPage loading={loading} />
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
    setLoading(true)
    getOrders({})
      .then(data => {
        data.data.results = data.data.results.filter(
          item => item.id != order.id
        )
        setSimilarOrders(data.data)
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }, [order])
  return (
    <>
      <Helmet title={`Briddgy | ${order.title}`} defer={false}>
        <meta
          name="description"
          content={`View available order. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money.`}
        />
      </Helmet>
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
        {loading ? (
          <Loader />
        ) : similarOrders.results.length ? (
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
  }, [orderId])

  if (!UserStore.complete || !order) return <Loader />
  if (order.owner.id == UserStore.me?.id) {
    return <MyOrderPage order={order} />
  }
  return <PublicPage order={order} />
})

export default SpecificOrderPage
