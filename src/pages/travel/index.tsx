import {
  Box,
  Center,
  Container,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Input,
  Img as CImg,
  Flex,
  Tabs,
  Tab,
  TabPanel,
  TabList,
  IconButton,
  TabPanels,
  Tag,
  SimpleGrid,
  HStack,
  Divider,
} from "@chakra-ui/react"
import { graphql, PageProps } from "gatsby"
import { Swiper, SwiperSlide } from "swiper/react"
import Img from "gatsby-image"
import { injectIntl, Link } from "gatsby-plugin-intl"
import React from "react"

import { AddTripForm } from "../../components/Form/AddTripForm"
import BulletTriangleIcon from "../../icons/BulletTriangle"
import { ChevronLeftIcon } from "../../icons/ChevronLeft"
import { ChevronRightIcon } from "../../icons/ChevronRight"
import { TravelDestinationCard } from "../../components/Cards/Trip/TravelDestination"
import earth from "../../images/earthicon.svg"
import plane from "../../images/planeicon.svg"
import note from "../../images/noteicon.svg"
import card from "../../images/debit-cardicon.svg"
import { StepCircle } from "../../components/Misc/StepCircle"
import { TravelNavbar } from "../../components/Navbar"

export const query = graphql`
  query {
    globe: file(relativePath: { eq: "travel_page_main.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    az: file(relativePath: { eq: "azerbaijan.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ru: file(relativePath: { eq: "russia.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    tr: file(relativePath: { eq: "turkey.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    en: file(relativePath: { eq: "england.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const AddTrip = ({ data }: PageProps) => {
  return (
    <>
      <TravelNavbar />
      <Box
        overflow="hidden"
        bgGradient="linear(to-b,blue.400,blue.500)"
        className="order-header"
        mb="50px"
        minW="100%"
        pos="relative"
        as="header"
      >
        <div className="overlay">
          <div></div>
        </div>
        <Flex
          alignItems="center"
          mx="auto"
          mb="100px"
          maxW="container.xxl"
          mt="40px"
        >
          <Box flex={3}>
            <Heading
              mb={5}
              fontSize="5xl"
              color="white"
              as="h2"
              lineHeight="1.5"
            >
              Travel with minimum costs with Briddgy
            </Heading>
            <Text mb={6} color="whiteAlpha.800">
              Search for tickets, hotels and share your trip in Briddgy
              <br /> Make deliveries and earn money!{" "}
            </Text>
            <Text color="white">
              <Link to="/">
                <BulletTriangleIcon /> How to earn with Briddgy?
              </Link>
            </Text>
          </Box>
          <Box flex={2}>
            <Box maxW="500px" ml="auto">
              <Img fluid={data.globe.childImageSharp.fluid} />
            </Box>
          </Box>
        </Flex>
      </Box>

      <Container my={8} as="section" maxW="container.xl">
        <Tabs variant="unstyled" isFitted={false}>
          <TabList color="gray.600">
            <Tab
              pl={0}
              _focus={{ border: "none" }}
              _selected={{ fontWeight: "600" }}
            >
              Popular
            </Tab>
            <Tab
              pl={0}
              _focus={{ border: "none" }}
              _selected={{ fontWeight: "600" }}
            >
              Recomendations
            </Tab>
            <Tab
              isDisabled={true}
              color="gray.400"
              pl={0}
              _focus={{ border: "none" }}
              _selected={{ fontWeight: "600" }}
            >
              Map
              <Tag ml={2} pos="relative" top="-10px" colorScheme="telegram">
                {" "}
                Soon
              </Tag>
            </Tab>
            <Box ml="auto">
              <IconButton
                size="lg"
                variant="outline"
                aria-label="Right"
                mr={3}
                icon={<ChevronLeftIcon />}
              />
              <IconButton
                size="lg"
                aria-label="Right"
                variant="outline"
                icon={<ChevronRightIcon />}
              />
            </Box>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              <Swiper
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                spaceBetween={40}
                breakpoints={{
                  450: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                <SwiperSlide>
                  <TravelDestinationCard
                    destinationId={1}
                    destinationName="Baku"
                    rewardsAvailable="10,302"
                    tripsCount="100"
                    ordersCount="300"
                    img={data.az.childImageSharp.fluid}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <TravelDestinationCard
                    destinationId={1}
                    destinationName="Moscow"
                    rewardsAvailable="15,302"
                    tripsCount="200"
                    ordersCount="350"
                    img={data.ru.childImageSharp.fluid}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <TravelDestinationCard
                    destinationId={1}
                    destinationName="Turkey"
                    rewardsAvailable="10,302"
                    tripsCount="100"
                    ordersCount="300"
                    img={data.tr.childImageSharp.fluid}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <TravelDestinationCard
                    destinationId={1}
                    destinationName="Turkey"
                    rewardsAvailable="10,302"
                    tripsCount="100"
                    ordersCount="300"
                    img={data.en.childImageSharp.fluid}
                  />
                </SwiperSlide>
              </Swiper>
            </TabPanel>
            <TabPanel>Recommendations</TabPanel>
            <TabPanel>Maps</TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <Container my="60px" as="section" maxW="container.lg">
        <Heading mb="50px" textAlign="center">
          Information for travelers
        </Heading>
        <Flex mb={8} minH="300px" maxW="800px" w="100%">
          <Box mr={6} flex="3" bg="purple.200" borderRadius="xl"></Box>
          <Box flex="2">
            <Tag colorScheme="purple" mb={5}>
              New
            </Tag>
            <Heading mb={5} fontSize="3xl" as="h3">
              How to add trip in Briddgy
            </Heading>
            <Text variant="secondary">
              Adding a trip in Briddgy is an essential step of earning. This
              post is going to guide you using Briddgy.
            </Text>
          </Box>
        </Flex>
        <HStack spacing="8">
          <Box>
            <Box mb={5} h="200px" bg="blue.200" borderRadius="xl"></Box>
            <Tag mb={5} colorScheme="blue">
              New
            </Tag>
            <Heading mb={5} fontSize="2xl" as="h3">
              Using your baggage space to the most
            </Heading>
            <Text variant="secondary">
              Adding a trip in Briddgy is an essential step of earning. This
              post is going to guide you using Briddgy.
            </Text>
          </Box>
          <Box>
            <Box mb={5} h="200px" bg="blue.200" borderRadius="xl"></Box>
            <Tag mb={5} colorScheme="blue">
              New
            </Tag>
            <Heading mb={5} fontSize="2xl" as="h3">
              Using your baggage space to the most
            </Heading>
            <Text variant="secondary">
              Adding a trip in Briddgy is an essential step of earning. This
              post is going to guide you using Briddgy.
            </Text>
          </Box>
          <Box>
            <Box mb={5} h="200px" bg="blue.200" borderRadius="xl"></Box>
            <Tag mb={5} colorScheme="blue">
              New
            </Tag>
            <Heading mb={5} fontSize="2xl" as="h3">
              Using your baggage space to the most
            </Heading>
            <Text variant="secondary">
              Adding a trip in Briddgy is an essential step of earning. This
              post is going to guide you using Briddgy.
            </Text>
          </Box>
        </HStack>
      </Container>
      <Divider />
      <Container my="60px" pt={8} maxW="full" as="section">
        <Heading textAlign="center" mb="80px">
          How to Earn Money Traveling
        </Heading>
        <HStack spacing={25} mx="auto" maxW="container.xl">
          <Box>
            <StepCircle
              mb={5}
              mx="auto"
              bg="blue.400"
              h="120px"
              w="120px"
              step={1}
            >
              <CImg height="60px" width="60px" src={earth} />
            </StepCircle>
            <Heading mb={5} textAlign="center" fontSize="2xl" as="h4">
              Add Trip
            </Heading>
            <Text variant="secondary" textAlign="center">
              Start by adding your trip information to see requested orders. It
              only takes 1 minute
            </Text>
          </Box>
          <Box maxW="400px">
            <StepCircle
              mb={5}
              mx="auto"
              bg="blue.400"
              step={2}
              h="120px"
              w="120px"
            >
              <CImg height="60px" width="60px" src={note} />
            </StepCircle>
            <Heading mb={5} textAlign="center" fontSize="2xl" as="h4">
              Make offers
            </Heading>
            <Text variant="secondary" textAlign="center">
              Offer delivery offers to the orderers, contact and chat with them.
            </Text>
          </Box>
          <Box maxW="400px">
            <StepCircle
              mb={5}
              mx="auto"
              bg="blue.400"
              step={3}
              h="120px"
              w="120px"
            >
              <CImg height="60px" width="60px" src={plane} />
            </StepCircle>
            <Heading mb={5} textAlign="center" fontSize="2xl" as="h4">
              Buy and/or deliver
            </Heading>
            <Text variant="secondary" textAlign="center">
              Depending on the order type you might need to buy & deliver or
              simply grab & deliver the porduct.
            </Text>
          </Box>
          <Box maxW="400px">
            <StepCircle
              mb={5}
              mx="auto"
              bg="blue.400"
              step={4}
              h="120px"
              w="120px"
            >
              <CImg height="60px" width="60px" src={card} />
            </StepCircle>
            <Heading mb={5} textAlign="center" fontSize="2xl" as="h4">
              Get Paid
            </Heading>
            <Text variant="secondary" textAlign="center">
              After you have delivered the item you are going to receive the
              payment.
            </Text>
          </Box>
        </HStack>

        <Box w="300px" mt="80px" mx="auto">
          <Button
            variant="solid"
            color="white"
            bg="blue.500"
            _hover={{ bg: "blue.600" }}
            w="inherit"
          >
            Add Trip
          </Button>
        </Box>
      </Container>
      <Container py={8} bg="blueAlpha.100" as="section" maxW="full">
        <Heading textAlign="center" mb="80px">
          Frequently Asked Questions
        </Heading>
        <Container maxW="container.xl">
          <HStack spacing={12}>
            <Box>
              <Heading mb={5} as="h4" fontSize="2xl">
                How is payment guaranteed?
              </Heading>
              <Text variant="secondary">
                Your payment is guaranteed and secured by Briddgy. Shoppers pay
                upfront and cannot cancel once paid.
              </Text>
            </Box>
            <Box>
              <Heading as="h4" mb={5} fontSize="2xl">
                Who is paying for product?
              </Heading>
              <Text variant="secondary">
                You buy the product so that you own it and are aware of the
                contents.
              </Text>
            </Box>
            <Box>
              <Heading as="h4" fontSize="2xl">
                How are deliveries arranged?
              </Heading>
              <Text variant="secondary">
                Arrange to meet in a public place with your shoppers via Grabr
                messenger.
              </Text>
            </Box>
          </HStack>
        </Container>
      </Container>
    </>
  )
}
export default injectIntl(AddTrip)
