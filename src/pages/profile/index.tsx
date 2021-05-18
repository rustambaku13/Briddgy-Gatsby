import {
  Box,
  Center,
  Circle,
  Container,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
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
  Tag,
  Text,
} from "@chakra-ui/react"
import { withPrefix } from 'gatsby'
import { Link } from "gatsby-plugin-intl"
import { observer } from "mobx-react-lite"
import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { useForm } from "react-hook-form"
import { bmify } from "../../api"
import { FriendsInvite } from "../../components/Animations/FriendsInvite"
import { MyMediumOrderCard } from "../../components/Cards/Order/MediumOrderCards"
import { ReviewCard } from "../../components/Cards/Review/ReviewCard"
import { MyMediumTripCard } from "../../components/Cards/Trip/MediumTripCards"
import Footer from "../../components/Footer"
import { Empty } from "../../components/Misc/Empty"
import { Loader } from "../../components/Misc/Loader"
import NavbarDefault from "../../components/Navbar"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { useAuthHook } from "../../hooks/useAuthHook"
import { usePopulateQueryHook } from "../../hooks/usePopulateQueryHook"
import { CheckIcon } from "../../icons/Check"
import ClipboardIcon from "../../icons/Clipboard"
import OrderIcon from "../../icons/Order"
import { TripIcon } from "../../icons/Trip"
import  SpecificProfilePage from '../../dynamic/Profile'
import { NavigationContext } from "../../providers/navPage"
import LayoutStore from "../../store/LayoutStore"
import UserStore from "../../store/UserStore"
import { Order } from "../../types/orders"
import { Review } from "../../types/review"
import { Trip } from "../../types/trip"
import { Router } from "@reach/router"
import { ImageChangeButton } from "../../components/Inputs/ImageChangeButton"
import { RedeemPromo } from "../../components/Promo/RedeemPromo"
const PersonalDetailsSection = observer(() => {
  useEffect(() => {
    if (UserStore.reviews.loading) UserStore.fetchMyReviews()
  }, [])
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
          <ImageChangeButton/>
        </Flex>
        <Flex
          alignItems="center"
          flex={1}
          flexWrap="wrap"
          flexDirection={["row"]}
        >
          <Heading
            mb={[3, 0]}
            flex="0 0 100%"
            fontSize="3xl"
          >{`${UserStore.me.first_name} ${UserStore.me.last_name}`}</Heading>
          <Box mb={[3, 0]} mr={14}>
            <Text>
              <Text as="label" fontWeight="600">
                E-Mail
              </Text>{" "}
              &nbsp;
              {UserStore.me.email} &nbsp;
              {UserStore.me.is_email_verified ? (
                <Tag ml={2} fontSize="xs" colorScheme="green">
                  Verfied
                </Tag>
              ) : (
                <Button
                  onClick={() => {
                    LayoutStore.emailConfirmModalOpen(() => {})
                  }}
                  variant="link"
                  color="blue.500"
                >
                  Verify Email
                </Button>
              )}
            </Text>
            <Text>
              <Text as="label" fontWeight="600">
                Traveler Profile
              </Text>{" "}
              {UserStore.me.is_stripe_verified == "C" ? (
                <Tag ml={2} fontSize="xs" colorScheme="green">
                  Verfied
                </Tag>
              ) : (
                <Button
                  onClick={() => {
                    LayoutStore.completeProfileModalToggle()
                  }}
                  variant="link"
                  color="blue.500"
                >
                  Complete Profile
                </Button>
              )}
            </Text>
          </Box>
        </Flex>
      </Flex>
      <SimpleGrid columns={[1, 2]} spacing={22} my="50px">
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
              Money that you can withdraw or use for your next purchase in Briddgy
            </Text>
          </Box>
          <Box ml={3} flex="0 0 auto">
            <Text fontSize="xl" as="strong">
              ${UserStore.me.balance}{" "}
            </Text>
          </Box>
        </Flex>
      </SimpleGrid>
      <Divider my={5} />
      <Box maxW="container.md" mx="auto">
        <Heading flexGrow={1} fontSize="2xl">
          My Reviews: {UserStore.reviews.count}
        </Heading>
        {UserStore.reviews.loading ? (
          <Loader />
        ) : (
          <VStack mt={8} spacing={8}>
            {UserStore.reviews.results.map((review: Review) => (
              <ReviewCard
                bg="white"
                p={5}
                borderWidth="1px"
                borderRadius="base"
                w="100%"
                review={review}
              />
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  )
})

const EarnCreditsSection = observer(() => {
  const { register, handleSubmit, errors } = useForm()
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
        <Heading my={8} textAlign="center" fontSize="hb1">
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
            Your friends will get USD 5.00 in Briddgy credits when they use your
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
            You’ll get USD 5.00 in Briddgy credits for each new registered
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
              _hover={{ bg: "outline.light" }}
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
        <Divider my={5} />
        {UserStore.me.used_promo?null:(
         <> <Heading my={8} textAlign="center" fontSize="hb1">
         Or use your friends promo code and save
       </Heading>
       <RedeemPromo/>
         </>
        )}
        
        
      </Box>
    </Box>
  )
})

const MyOrdersSection = observer(() => {
  useEffect(() => {
    if (UserStore.orders.loading) UserStore.fetchMyOrders()
  }, [])
  return (
    <Box py={3} maxW="container.md" mx="auto">
      <Flex alignItems="center">
        <Heading flexGrow={1} fontSize="2xl">
          My Orders: {UserStore.orders.count}
        </Heading>
        <Link to="/order">
          <Button
            ml="auto"
            flexGrow={0}
            variant="primary_dark"
            leftIcon={<OrderIcon />}
          >
            Add Order
          </Button>
        </Link>
      </Flex>

      <VStack spacing={10} pt={10}>
        {UserStore.orders.loading ? (
          <Spinner />
        ) : (
          UserStore.orders.results.map((order: Order) => (
            <MyMediumOrderCard orderData={order} />
          ))
        )}
      </VStack>
    </Box>
  )
})

const MyTripsSections = observer(() => {
  useEffect(() => {
    if (UserStore.trips.loading) UserStore.fetchMyTrips()
  }, [])
  if (UserStore.trips.loading)
    return (
      <Box py={3} maxW="container.md" mx="auto">
        <Loader mx="auto" />
      </Box>
    )
  if (UserStore.upcomingTrips.length) {
    return (
      <Box py={3} maxW="container.md" mx="auto">
        <Flex alignItems="center">
          <Heading flexGrow={1} fontSize="2xl">
            Upcoming Trips: {UserStore.upcomingTrips.length}
          </Heading>
          <Link to="/travel">
            <Button
              ml="auto"
              flexGrow={0}
              variant="primary_dark"
              leftIcon={<TripIcon />}
            >
              Add Trip
            </Button>
          </Link>
        </Flex>
        <VStack pt={10} spacing={10}>
          {UserStore.upcomingTrips.length ? (
            UserStore.upcomingTrips.map((trip: Trip) => (
              <MyMediumTripCard trip={trip} />
            ))
          ) : (
            <Empty text="No Upcoming Trips" />
          )}
        </VStack>
        <Divider my={8} />
        <Heading fontSize="2xl">
          Past Trips: {UserStore.passedTrips.length}
        </Heading>
        <VStack pt={10} spacing={10}>
          {UserStore.passedTrips.length ? (
            UserStore.passedTrips.map((trip: Trip) => (
              <MyMediumTripCard trip={trip} />
            ))
          ) : (
            <Empty text="No past Trips" />
          )}
        </VStack>
      </Box>
    )
  }
  return (
    <Box py={3} maxW="container.md" mx="auto">
      <Flex alignItems="center">
        <Heading flexGrow={1} fontSize="2xl">
          Past Trips: {UserStore.passedTrips.length}
        </Heading>
        <Link to="/travel">
          <Button
            ml="auto"
            flexGrow={0}
            variant="primary_dark"
            leftIcon={<TripIcon />}
          >
            Add Trip
          </Button>
        </Link>
      </Flex>
      <VStack pt={10} spacing={10}>
        {UserStore.passedTrips.length ? (
          UserStore.passedTrips.map((trip: Trip) => (
            <MyMediumTripCard trip={trip} />
          ))
        ) : (
          <Empty text="No Trips"/>
        )}
      </VStack>
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

const MyProfilePage = observer(({ location }) => {
  useAuthHook(user => user == false, "/login")
  const data = usePopulateQueryHook(location)
  const [openTab, setOpenTab] = useState(0)
  const [profileKey, setProfileKey] = useState("profile")
  useEffect(() => {
    if (data?.page) {
      setOpenTab(PAGE_INDEX_MAPPER[data.page])
    }
  }, [data])
  useEffect(() => {
    if (location.search.includes("trip")) setProfileKey("profile-trip")
    if (location.search.includes("order")) setProfileKey("profile-order")
  }, [location.search])
  if (UserStore.isLoggedIn == false) return null
  return (
    <>
      <Helmet title="Briddgy | My Profile" defer={false}>
        <meta
          name="description"
          content="My Profile. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money."
        />
      </Helmet>
      <NavigationContext.Provider value={{ page: profileKey }}>
        <NavbarDefault />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Container pt="50px" maxW="container.xl">
        <Flex mb="30px" w="100%">
          <Heading as="h1" mb={10} fontSize="hb3" fontWeight="700">
            Profile
          </Heading>
        </Flex>
        <Tabs
          minH="100vh"
          isFitted={true}
          onChange={index => {
            setOpenTab(index)
          }}
          variant="enclosed"
          orientation="horizontal"
          index={openTab}
        >
          <TabList style={{ "--count": "4" }} className="tabs">
            <Tab fontSize={[400, 500]}>Personal Details</Tab>
            <Tab fontSize={[400, 500]}>My Trips</Tab>
            <Tab fontSize={[400, 500]}>My Orders</Tab>
            <Tab fontSize={[400, 500]}>Promo Code</Tab>
            <li className="presentation-slider" role="presentation"></li>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <PersonalDetailsSection />
            </TabPanel>
            <TabPanel px={0}>
              <MyTripsSections />
            </TabPanel>
            <TabPanel px={0}>
              <MyOrdersSection />
            </TabPanel>
            <TabPanel px={0}>
              <EarnCreditsSection />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <Footer />
    </>
  )
})


export default MyProfilePage
