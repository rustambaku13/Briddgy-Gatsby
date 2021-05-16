import React, { useEffect, useRef, useState } from 'react'
import { usePopulateQueryHook } from '../../hooks/usePopulateQueryHook'
import Helmet from 'react-helmet'
import { NavigationContext } from '../../providers/navPage'
import NavbarDefault from '../../components/Navbar'
import { BottomNavbar } from '../../components/Navbar/BottomNavbar'
import { Box, Container, Divider, Flex, Heading, SimpleGrid, Text, VStack,Avatar, Circle, Center } from '@chakra-ui/react'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import Footer from '../../components/Footer'
import { getUserDetails, getUserOrders, getUserReviews, getUserTrips } from '../../api/user'
import { BigLoader, Loader } from '../../components/Misc/Loader'
import { User } from '../../types/user'

import { bmify } from '../../api'
import { Button } from '@chakra-ui/button'
import { Tag } from '@chakra-ui/tag'
import { Rating } from '../../components/Misc/Rating'
import { defaultOrders, Order } from '../../types/orders'
import { Review } from '../../types/review'
import { ReviewCard } from '../../components/Cards/Review/ReviewCard'
import { Link } from 'gatsby-plugin-intl'
import TripIcon from '../../icons/Trip'
import { PublicMediumTripCard } from '../../components/Cards/Trip/MediumTripCards'
import { Empty } from '../../components/Misc/Empty'
import { Trip } from '../../types/trip'
import moment from 'moment'
import OrderIcon from '../../icons/Order'
import { PublicMediumOrderCard } from '../../components/Cards/Order/MediumOrderCards'
import { FriendsInvite } from '../../components/Animations/FriendsInvite'
import ClipboardIcon from '../../icons/Clipboard'
import CheckIcon from '../../icons/Check'


const EarnCreditsSection = ({user}:{user:User}) => {
  const code = useRef(null)
  const [copied, setCopied] = useState(false)
  function copy(e) {
    code.current.select()
    e.target.focus()
    document.execCommand("copy")
    setCopied(true)
  }
  if(!user)return <Loader/>
  return (
    <Box py={3} maxW="container.lg" mx="auto">
      <Box mx="auto" maxW="500px" p={0}>
        <FriendsInvite fontSize="300px" w="300px" mt="40px" mx="auto" />
        <Heading my={8} textAlign="center" fontSize="hb1">
          User your friends promo and save
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
          You’ll get USD 3.00 in Briddgy credits for redeeming this code
            
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
          Your friend will get USD 3.00 in Briddgy credits when you user their code.
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
                <Text fontSize="2xl">{user.my_promo}</Text>
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
                value={user.my_promo}
              />
            </Box>
          </Button>
        </Box>
        </Box>
    </Box>
  )
}

const MyOrdersSection = ({user,userId}:{user:User,userId:number}) => {
  
  const [orders,setOrders] = useState({...defaultOrders,loading:true})
  useEffect(() => {
    
    getUserOrders(userId)
    .then(({data})=>{
      setOrders(data)  
    })
    .catch(()=>{

    }).finally(()=>{
    
    })
  }, [])
  if(orders.loading){
    return <Loader/>
  }
  
  return (
    <Box py={3} maxW="container.md" mx="auto">
      <Flex alignItems="center">
        <Heading flexGrow={1} fontSize="2xl">
          Orders: {orders.results.length}
        </Heading>
        <Link to="/travel">
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
      <VStack pt={10} spacing={10}>
        {orders.results.length ? (
          orders.results.map((order: Order) => (
            <PublicMediumOrderCard orderData={order} />
          ))
        ) : (
          <Empty text="No Orders Yet"/>
        )}
      </VStack>
    </Box>
  )
}





const MyTripsSections = ({user,userId}:{user:User,userId:number}) => {
  const [passedTrips,setPassedTrips] = useState([])
  const [loading,setLoading] = useState(true)
  const [upcomingTrips,setUpcomingTrips] = useState([])
  useEffect(() => {
    setLoading(true)
    getUserTrips(userId)
    .then(({data})=>{
      const now = moment(new Date())
      setPassedTrips(data.results.filter((item: Trip) => moment(item.date) <= now))
      setUpcomingTrips(data.results.filter((item: Trip) => moment(item.date) >now))
    })
    .catch(()=>{

    }).finally(()=>{
      setLoading(false)
    })
  }, [])
  if(loading){
    return <Loader/>
  }
  if (upcomingTrips.length) {
    return (
      <Box py={3} maxW="container.md" mx="auto">
        <Flex alignItems="center">
          <Heading flexGrow={1} fontSize="2xl">
            Upcoming Trips: {upcomingTrips.length}
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
          {upcomingTrips.length ? (
            upcomingTrips.map((trip: Trip) => (
              <PublicMediumTripCard trip={trip} />
            ))
          ) : (
            <Empty text="No Upcoming Trips" />
          )}
        </VStack>
        <Divider my={8} />
        <Heading fontSize="2xl">
          Past Trips: {passedTrips.length}
        </Heading>
        <VStack pt={10} spacing={10}>
          {passedTrips.length ? (
            passedTrips.map((trip: Trip) => (
              <PublicMediumTripCard trip={trip} />
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
          Past Trips: {passedTrips.length}
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
        {passedTrips.length ? (
          passedTrips.map((trip: Trip) => (
            <PublicMediumTripCard trip={trip} />
          ))
        ) : (
          <Empty text="No past Trips"/>
        )}
      </VStack>
    </Box>
  )
}






const PersonalDetailsSection = ({user,userId}:{user:User,userId:number}) => {
  if(!user) return <BigLoader/>
  const [reviews,setReviews] = useState({...defaultOrders,loading:true})
  useEffect(() => {
    getUserReviews(userId).then(({data})=>{
      setReviews(data) 
    }).catch(()=>{

    }).finally(()=>{

    })
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
            src={bmify(user.avatarpic)}
          />
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
          >{`${user.first_name} ${user.last_name}`}</Heading>
          <Box mb={[3, 0]} mr={14}>
            <Text>
              <Text as="label" fontWeight="600">
                E-Mail
              </Text>{" "}
              &nbsp;
              {user.is_email_verified ? (
                <Tag ml={2} fontSize="xs" colorScheme="green">
                  Verfied
                </Tag>
              ) : (
                <Tag ml={2} fontSize="xs" colorScheme="red">
                  Not Verified
                </Tag>
              )}
            </Text>
            <Text>
              <Text as="label" fontWeight="600">
                Traveler Profile
              </Text>{" "}
              {user.is_stripe_verified == "C" ? (
                <Tag ml={2} fontSize="xs" colorScheme="green">
                  Verfied
                </Tag>
              ) : (
                <Tag ml={2} fontSize="xs" colorScheme="red">
                  Not Verified
                </Tag>
              )}
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Divider my={7} />
      <Box maxW="container.md" mx="auto">
        <Heading flexGrow={1} fontSize="2xl">
          Rating <Rating  pos='relative' top="-0.2em" fontSize='0.8em' readonly rating={user.rating}/>
        </Heading>
        {reviews.loading ? (
          <Loader />
        ) : (
          reviews.results.length?<VStack mt={8} spacing={8}>
            {reviews.results.map((review: Review) => (
              <ReviewCard
                bg="white"
                p={5}
                borderWidth="1px"
                borderRadius="base"
                w="100%"
                review={review}
              />
            ))}
          </VStack>:<Empty text='No Review yet'/>
          
        )}
      </Box>
    </Box>
  )
}

const SpecificProfilePage = ({userId}) => {
    const [openTab, setOpenTab] = useState(0)
    const [user,setUser]:[User,any] = useState(null)
    useEffect(()=>{
      getUserDetails(userId)
      .then(({data})=>{
        setUser(data)
      })
      .catch(()=>{

      }).finally(()=>{

      })
    },[])
    return (
      <>
        <Helmet title={user==null?"Briddgy | User Profile":`Briddgy | ${user.first_name} ${user.last_name}`} defer={true}>
          <meta
            name="description"
            content="User Profile. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money."
          />
        </Helmet>
        <NavigationContext.Provider value={{ page: "profile" }}>
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
            <TabList style={{ "--count": "3" }} className="tabs">
              <Tab fontSize={[400, 500]}>Personal Details</Tab>
              <Tab fontSize={[400, 500]}>Trips</Tab>
              <Tab fontSize={[400, 500]}>Orders</Tab>
              {/* <Tab fontSize={[400, 500]}>Promo Code</Tab> */}
              <li className="presentation-slider" role="presentation"></li>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <PersonalDetailsSection userId={userId} user={user} />
              </TabPanel>
              <TabPanel px={0}>
                <MyTripsSections  userId={userId} user={user} />
              </TabPanel>
              <TabPanel px={0}>
                <MyOrdersSection userId={userId} user={user}/>
              </TabPanel>
              {/* <TabPanel px={0}>
                <EarnCreditsSection user={user} />
              </TabPanel> */}
            </TabPanels>
          </Tabs>
        </Container>
        <Footer />
      </>
    )
  }

export default SpecificProfilePage