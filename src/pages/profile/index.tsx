import {
  Box,
  Center,
  Circle,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
} from "@chakra-ui/layout"
import {
  Avatar,
  Button,
  Input,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react"
import { navigate } from "gatsby-link"
import { Link } from "gatsby-plugin-intl"
import { observer } from "mobx-react-lite"
import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { bmify } from "../../api"
import { Discount } from "../../components/Animations/Discount"
import { FriendsInvite } from "../../components/Animations/FriendsInvite"
import { MyOrderCard } from "../../components/Cards/Order/PublicOrderCard"
import { MyTripCard } from "../../components/Cards/Trip/TripCard"
import { Empty } from "../../components/Misc/Empty"
import { Loader } from "../../components/Misc/Loader"
import { VerificationStatus } from "../../components/Misc/VerificationStatus"
import NavbarDefault from "../../components/Navbar"
import { useAuthHook } from "../../hooks/useAuthHook"
import { usePopulateQueryHook } from "../../hooks/usePopulateQueryHook"
import { CheckIcon } from "../../icons/Check"
import ClipboardIcon from "../../icons/Clipboard"
import { TripIcon } from "../../icons/Trip"
import LayoutStore from "../../store/LayoutStore"
import UserStore from "../../store/UserStore"
import { Order } from "../../types/orders"
import { Trip } from "../../types/trip"

const PersonalDetailsSection = observer(() => {
  return (
    <Box py={3} maxW="container.lg" mx="auto">
      <Flex>
        <Flex
          alignItems="center"
          flexDirection="column"
          mr={10}
          flex="0 0 auto"
        >
          <Avatar
            borderColor="gray.100"
            size="xl"
            boxShadow="inner"
            src={bmify(UserStore.me.avatarpic)}
          />
          <Button w="100%" variant="link" color="blue.500" mt={3}>
            Change
          </Button>
        </Flex>
        <Flex alignItems="center" flex={1} flexWrap="wrap" flexDirection="row">
          <Heading
            flex="0 0 100%"
            fontSize="3xl"
          >{`${UserStore.me.first_name} ${UserStore.me.last_name}`}</Heading>
          <Box mr={14}>
            <Text fontWeight="600" as="label">
              E-Mail
              <VerificationStatus isVerified={UserStore.me.is_email_verified} />
            </Text>
            <Text mt={1}>{UserStore.me.email}</Text>
          </Box>
          <Box>
            <Text fontWeight="600" as="label">
              Phone Number
              <VerificationStatus
                isVerified={UserStore.me.is_number_verified}
              />
            </Text>
            <Text mt={1}>
              {UserStore.me.phone ? (
                UserStore.me.phone
              ) : (
                <Button
                  onClick={() => {
                    LayoutStore.togglePhoneConfirmModal()
                  }}
                  variant="link"
                  color="blue.500"
                >
                  Verify Now
                </Button>
              )}
            </Text>
          </Box>
        </Flex>
      </Flex>
      <HStack spacing={22} my="50px">
        <Flex
          bg="white"
          minH="180px"
          alignItems="center"
          justifyContent="center"
          p={5}
          flex={1}
          borderWidth="1px"
          borderRadius="lg"
        >
          <Box flex="1">
            <Text fontSize="xl" as="h3" fontWeight="600">
              Promo Balance
            </Text>
            <Text fontSize="sm" variant="secondary">
              Use your promo balance to discount commision fees.
            </Text>
          </Box>
          <Box ml={3} flex="0 0 auto">
            <Text fontSize="xl" as="strong">
              ${UserStore.me.promo_balance}{" "}
            </Text>
          </Box>
        </Flex>
        <Flex
          bg="white"
          minH="180px"
          alignItems="center"
          justifyContent="center"
          p={5}
          flex={1}
          borderWidth="1px"
          borderRadius="lg"
        >
          <Box flex="1">
            <Text fontSize="xl" as="h3" fontWeight="600">
              Normal Balance
            </Text>
            <Text fontSize="sm" variant="secondary">
              Earn money by travelling and either withdraw or use on balance to
              order something using Briddgy
            </Text>
          </Box>
          <Box ml={3} flex="0 0 auto">
            <Text fontSize="xl" as="strong">
              ${UserStore.me.balance}{" "}
            </Text>
          </Box>
        </Flex>
      </HStack>
      <Divider my={5} />
      <Heading as="h2" fontSize="2xl">
        My Reviews{" "}
        <Circle
          h="35px"
          w="35px"
          p={1}
          fontSize="xl"
          borderRadius="50%"
          bg="blue.500"
          color="white"
          display="inline-flex"
        >
          10
        </Circle>
      </Heading>
    </Box>
  )
})

const EarnCreditsSection = () => {
  const code = useRef(null)
  const [copied, setCopied] = useState(false)
  function copy(e) {
    code.current.select()
    e.target.focus()
    document.execCommand("copy")
    setCopied(true)
  }
  return (
    <Box py={3} maxW="container.lg" mx="auto">
      <Box mx="auto" maxW="500px" p={0}>
        <FriendsInvite fontSize="300px" w="300px" mt="40px" mx="auto" />
        <Heading my={8} textAlign="center" fontSize="3xl">
          Invite your friends and get discounts
        </Heading>
        <Box w="100%">
          <Circle
            w="40px"
            overflow="hidden"
            h="40px"
            fontWeight="bold"
            borderRadius="50%"
            bg="blue.100"
            float="left"
            mr={4}
          >
            1
          </Circle>
          <Text w="100%">
            Your friends will get USD 3.00 in Briddgy credits when they use your
            code.
          </Text>
        </Box>
        <Box mt={5} w="100%">
          <Circle
            w="40px"
            overflow="hidden"
            h="40px"
            fontWeight="bold"
            borderRadius="50%"
            bg="blue.100"
            float="left"
            mr={4}
          >
            2
          </Circle>
          <Text w="100%">
            You’ll get USD 3.00 in Briddgy credits for each new registered
            friend.
          </Text>
          <Button
            onClick={copy}
            height="auto"
            w="100%"
            mt={8}
            variant="unstyled"
          >
            <Box
              float="left"
              _hover={{ bg: "gray.100" }}
              transition=".2s ease-in-out"
              textAlign="initial"
              px={4}
              py={2}
              borderWidth="1px"
              borderRadius="lg"
              w="100%"
              fontWeight="400"
            >
              <Box overflow="hidden" float="left">
                <Text fontSize="xs" as="label">
                  Your referral code
                </Text>
                <Text fontSize="2xl">{UserStore.me.my_promo}</Text>
              </Box>
              <Center color="gray.600" h="60px" fontSize="2xl" float="right">
                {!copied ? (
                  <ClipboardIcon />
                ) : (
                  <>
                    <Text as="small" fontSize="sm">
                      Copied
                    </Text>{" "}
                    <CheckIcon ml="7px" color="green.400" />
                  </>
                )}
              </Center>

              <input
                style={{ opacity: 0, position: "absolute" }}
                type="text"
                ref={code}
                value={UserStore.me.my_promo}
              />
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
const RedeemCreditsSection = () => {
  const { register, handleSubmit, errors } = useForm()
  return (
    <Box py={3} maxW="container.lg" mx="auto">
      <Box mx="auto" maxW="500px" p={0}>
        <Flex mt="40px" w="100%" flexWrap="nowrap">
          <Heading fontSize="5xl" flex="0 0 auto">
            Enter your <br />{" "}
            <Text color="blue.400">
              Promo <br />
              Code
            </Text>
          </Heading>
          <Discount flex="1" mt="40px" mx="auto" />
        </Flex>

        <Text my={5} variant="secondary" textAlign="center">
          If you have a promo code, enter it below and get a discount
        </Text>

        <Box
          float="left"
          as="form"
          onSubmit={handleSubmit(() => null)}
          bg="gray.100"
          _hover={{ boxShadow: "md" }}
          transition=".2s ease-in-out"
          textAlign="initial"
          px={4}
          py={2}
          borderWidth="1px"
          borderRadius="lg"
          w="100%"
          fontWeight="400"
          pos="relative"
        >
          <Input
            textTransform="uppercase"
            placeholder="Enter promo code"
            ref={register({
              required: "Please enter the promo code",
              maxLength: {
                value: 5,
                message: "Promo Code should be 5 characters",
              },
              minLength: {
                value: 5,
                message: "Promo Code should be 5 characters",
              },
            })}
            fontSize="2xl"
            name="code"
            h="70px"
            border="none"
          />
          <Button
            zIndex="1"
            pos="absolute"
            right={4}
            top="18px"
            px={5}
            type="submit"
            size="lg"
            variant="primary"
          >
            Redeem
          </Button>
        </Box>
        <Text color="red.500">{errors.code?.message}</Text>
      </Box>
    </Box>
  )
}

const MyOrdersSection = observer(() => {
  useEffect(() => {
    if (UserStore.orders.loading) UserStore.fetchMyOrders()
  }, [])
  return (
    <Box py={3} maxW="container.lg" mx="auto">
      <Flex alignItems="center">
        <Heading flexGrow={1} fontSize="2xl">
          My Orders: {UserStore.orders.count}
        </Heading>
        <Link to="/order">
          <Button
            ml="auto"
            flexGrow={0}
            variant="primary"
            leftIcon={<TripIcon />}
          >
            Add Order
          </Button>
        </Link>
      </Flex>

      <SimpleGrid w="100%" spacing={5} columns={1}>
        {UserStore.orders.loading ? (
          <Spinner />
        ) : (
          UserStore.orders.results.map((order: Order) => (
            <MyOrderCard mx="auto" orderData={order} />
          ))
        )}
      </SimpleGrid>
    </Box>
  )
})

const MyTripsSections = observer(() => {
  useEffect(() => {
    if (UserStore.trips.loading) UserStore.fetchMyTrips()
  }, [])
  if (UserStore.trips.loading)
    return (
      <Box py={3} maxW="container.lg" mx="auto">
        <Loader mx="auto" />
      </Box>
    )
  if (UserStore.upcomingTrips.length) {
    return (
      <Box py={3} maxW="container.lg" mx="auto">
        <Flex alignItems="center">
          <Heading flexGrow={1} fontSize="2xl">
            Upcoming Trips: {UserStore.upcomingTrips.length}
          </Heading>
          <Link to="/travel">
            <Button
              ml="auto"
              flexGrow={0}
              variant="primary"
              leftIcon={<TripIcon />}
            >
              Add Trip
            </Button>
          </Link>
        </Flex>
        <SimpleGrid pt="20px" w="100%" spacing={5} columns={1}>
          {UserStore.upcomingTrips.length ? (
            UserStore.upcomingTrips.map((trip: Trip) => (
              <MyTripCard my="20px" mx="auto" trip={trip} />
            ))
          ) : (
            <Empty />
          )}
        </SimpleGrid>
        <Divider my={8} />
        <Heading fontSize="2xl">
          Past Trips: {UserStore.passedTrips.length}
        </Heading>
        <SimpleGrid pt="20px" w="100%" spacing={5} columns={1}>
          {UserStore.passedTrips.length ? (
            UserStore.passedTrips.map((trip: Trip) => (
              <MyTripCard my="20px" mx="auto" trip={trip} />
            ))
          ) : (
            <Empty />
          )}
        </SimpleGrid>
      </Box>
    )
  }
  return (
    <Box py={3} maxW="container.lg" mx="auto">
      <Flex alignItems="center">
        <Heading flexGrow={1} fontSize="2xl">
          Past Trips: {UserStore.passedTrips.length}
        </Heading>
        <Link to="/travel">
          <Button
            ml="auto"
            flexGrow={0}
            variant="primary"
            leftIcon={<TripIcon />}
          >
            Add Trip
          </Button>
        </Link>
      </Flex>
      <SimpleGrid pt="20px" w="100%" spacing={5} columns={1}>
        {UserStore.passedTrips.length ? (
          UserStore.passedTrips.map((trip: Trip) => (
            <MyTripCard my="20px" mx="auto" trip={trip} />
          ))
        ) : (
          <Empty />
        )}
      </SimpleGrid>
    </Box>
  )
})

const PAGE_INDEX_MAPPER = {
  profile: 0,
  trips: 1,
  orders: 2,
  redeem: 3,
  promo: 4,
}
// TO DO: Make INDEX_PAGE_MAPPER Dynamic from the PAGE_INDEX_MAPPER
const INDEX_PAGE_MAPPER = {
  0: "profile",
  1: "trips",
  2: "orders",
  3: "redeem",
  4: "promo",
}

const MyProfilePage = observer(({ location }) => {
  useAuthHook(user => user == false, "/login")
  const data = usePopulateQueryHook(location)
  const [openTab, setOpenTab] = useState(0)
  useEffect(() => {
    if (data?.page) {
      setOpenTab(PAGE_INDEX_MAPPER[data.page])
    }
  }, [data])
  if (UserStore.isLoggedIn == false) return null
  return (
    <>
      <NavbarDefault />
      <Container pt="50px" maxW="container.xl">
        <Flex mb="30px" w="100%">
          <Heading fontSize="5xl" as="h1">
            Profile
          </Heading>
        </Flex>
        <Tabs
          onChange={index => {
            navigate(`?page=${INDEX_PAGE_MAPPER[index]}`)
          }}
          index={openTab}
          variant="line"
          colorScheme="blue"
        >
          <TabList>
            <Tab>Personal Details</Tab>
            <Tab>My Trips</Tab>
            <Tab>My Orders</Tab>
            <Tab>Promo Code</Tab>
            <Tab>Earn Free Deliveries</Tab>
          </TabList>
          <TabPanels>
            <TabPanel pt="40px">
              <PersonalDetailsSection />
            </TabPanel>
            <TabPanel>
              <MyTripsSections />
            </TabPanel>
            <TabPanel>
              <MyOrdersSection />
            </TabPanel>
            <TabPanel>
              <RedeemCreditsSection />
            </TabPanel>
            <TabPanel>
              <EarnCreditsSection />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
})

export default MyProfilePage
