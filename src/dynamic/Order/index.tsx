import { Box, Container, Divider, Flex, Heading } from "@chakra-ui/layout"
import { navigate } from "gatsby-link"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { getOrderProposals } from "../../api/contract"
import { getOrder, getSuggestedTrips } from "../../api/order"
import { PublicMediumTripCard } from "../../components/Cards/Trip/MediumTripCards"
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
      getOrderProposals(orderId).then(e => {
        setProposals(e.data)
      })
      getSuggestedTrips(orderId).then(e => {
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
})

export default MyOrderPage
