import { Box, Container, Divider, Flex, Heading } from "@chakra-ui/layout"
import { navigate } from "gatsby-link"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { getOrder, getOrderPorposals } from "../../api/order"
import { BigOrderCard } from "../../components/Cards/Order/BigOrderCard"
import { OrderProposalCard } from "../../components/Cards/Order/OrderProposalCard"
import { Loader } from "../../components/Misc/Loader"
import NavbarDefault from "../../components/Navbar"
import UserStore from "../../store/UserStore"
import { Contracts, defaultContracts } from "../../types/contract"
import { Order } from "../../types/orders"
import { defaultTrips, Trips } from "../../types/trip"
const MyOrderPage = observer(({ orderId }) => {
  // useAuthHook(user => !user)
  const [order, setOrder]: [Order, any] = useState(null)
  const [suggested, setSuggested]: [Trips, any] = useState({
    ...defaultTrips,
    loading: true,
  })

  const [proposals, setProposals]: [Contracts, any] = useState(defaultContracts)
  const [contracts, setContracts]: [Contracts, any] = useState(defaultContracts)

  useEffect(() => {
    if (UserStore.complete && !order) {
      getOrder(orderId)
        .then(order => {
          setOrder(order.data)
        })
        .catch(e => {
          navigate("/404")
        })
        .finally(() => {})
      //   getSuggestedOrders(tripId).then(e => {
      //     setSuggested(e.data)
      //   })
      getOrderPorposals(orderId).then(e => {
        setProposals(e.data)
      })
      //   getTripContracts(tripId).then(e => {
      //     setContracts(e.data)
      //   })
    }
  }, [UserStore.complete])
  if (!order) {
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
              borderRadius="3xl"
            >
              <Heading px={3} mb={8} fontSize="2xl">
                Proposals
              </Heading>
              {proposals.results.map((contract, index) => {
                return (
                  <>
                    <OrderProposalCard contract={contract} />
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

export default MyOrderPage
