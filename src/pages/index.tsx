import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Link as CLink,
  Text,
} from "@chakra-ui/react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { injectIntl, Link } from "gatsby-plugin-intl"
import React from "react"
import { PageProps } from "gatsby"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper.scss"
import {
  ProductCard,
  TravelDestinationCard,
} from "../components/Cards/TravelDestination"
import { TestimonialLanding } from "../components/Testimonials"
import { CalendarIcon } from "../icons/Calendar"
import { ChevronRightIcon } from "../icons/ChevronRight"
import { ClockIcon } from "../icons/Clock"
import { HeartIcon } from "../icons/Heart"
import { SmileIcon } from "../icons/Smile"
export const query = graphql`
  query {
    # Md

    # Images
    image1: file(relativePath: { eq: "traveling_man.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    image2: file(relativePath: { eq: "shopping_woman.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    app: file(relativePath: { eq: "application_in_hand.png" }) {
      childImageSharp {
        fluid {
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
    ipad: file(relativePath: { eq: "ipad.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    laptop: file(relativePath: { eq: "laptop.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
const Home = ({ data, intl }: PageProps) => {
  return (
    <>
      <Box w="100%" mb="100px" as="header">
        <Container
          display="flex"
          pr={0}
          mr={0}
          pt="50px"
          justifyContent="space-between"
          alignItems="center"
          h="100%"
          maxW="1500px"
        >
          <Box maxW="550px">
            <Heading as="h1" fontSize="5xl" lineHeight="1.3" mb={7}>
              Your first{" "}
              <Box color="blue.400" as="span">
                postless
              </Box>{" "}
              delivery platform
            </Heading>
            <Text w="100%" lineHeight="1.5" as="h2" mb={7} variant="secondary">
              Briddgy connects travelers and orderers, making delivery more
              accessible
            </Text>
            <Text w="100%" as="h3" fontSize="md" color="blue.400">
              <Link to="/how_it_works">How Briddgy works?</Link>
            </Text>
            <Box mt={5} w="100%">
              <Button variant="primary" size="lg" mr={3}>
                Order with Briddgy
              </Button>
              <Button bg="white" size="lg" variant="outline">
                Travel with Briddgy
              </Button>
            </Box>
          </Box>
          <Box bg="red.200" h="400px" maxW="800px" w="100%"></Box>
        </Container>
      </Box>
      <Box w="100%" mb="100px" as="section">
        <Container h="100%" maxW="1200px">
          <Heading mb={10} fontSize="5xl" fontWeight="600" textAlign="center">
            Travelers
          </Heading>
          <Flex justifyContent="space-between" h="100%" w="100%">
            <Box flex="1" maxW="600px">
              <Img fluid={data.image1.childImageSharp.fluid} />
            </Box>
            <Box maxW="480px" flex="1">
              <Flex flexDir="column" justifyContent="center" h="100%">
                <Text mb={7} fontSize="2xl" w="100%" textAlign="right" as="h2">
                  Travel cheaper by discounting travel expences with Briddgy
                </Text>
                <Box mb={7} ml="auto" display="flex" alignItems="center">
                  <Text
                    variant="secondary"
                    fontSize="lg"
                    display="inline-block"
                    as="h4"
                  >
                    Average earning per trip
                  </Text>
                  <Center
                    ml={3}
                    borderRadius="50%"
                    w="100px"
                    h="100px"
                    border="6px solid"
                    fontWeight={600}
                    fontSize="2xl"
                    borderColor="blue.500"
                  >
                    120 $
                  </Center>
                </Box>
                <Text color="blue.500" textAlign="right">
                  <Link to="how_to">How to start earning with Briddgy?</Link>
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Heading fontSize="2xl" as="h2" fontWeight="normal" mb={3} mt="75px">
            Top travel destinations
          </Heading>
          <Text variant="secondary">
            Pick a travel destination with most orders and travel with{" "}
            <strong>minimum</strong> costs
          </Text>
          <Text textAlign="right">
            <CLink as="span">
              <Link to="#">
                more destinations <ChevronRightIcon />
              </Link>
            </CLink>
          </Text>
          <Box pt="50px" w="100%">
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
          </Box>
          <Text mt="40px" fontSize="2xl" textAlign="right">
            Check our{" "}
            <Link to="/advice">
              <Text
                color="blue.400"
                variant="halfUnderline"
                fontWeight={600}
                as="span"
              >
                advice
              </Text>
            </Link>{" "}
            for travelers
          </Text>
        </Container>
      </Box>
      <Box w="100%" mb="100px" as="section">
        <Container h="100%" maxW="1200px">
          <Heading mb={10} fontSize="5xl" fontWeight="600" textAlign="center">
            Orderers
          </Heading>
          <Flex justifyContent="space-between" h="100%" w="100%">
            <Box maxW="480px" flex="1">
              <Flex flexDir="column" justifyContent="center" h="100%">
                <Text mb={7} fontSize="2xl" w="100%" as="h2">
                  Order and get your items delivered through travelers
                </Text>
                <Flex mt="-20px" wrap="wrap">
                  <Center mt="20px" mr={14}>
                    <Box mr="5px" d="inline-block">
                      <Center
                        h="42px"
                        fontSize="xl"
                        w="42px"
                        borderRadius="50%"
                        bg="blue.400"
                      >
                        <ClockIcon stroke="white" />
                      </Center>
                    </Box>
                    <Text fontSize="xl">Faster</Text>
                  </Center>
                  <Center mt="20px" mr={14}>
                    <Box mr="5px" d="inline-block">
                      <Center
                        h="42px"
                        fontSize="xl"
                        w="42px"
                        borderRadius="50%"
                        bg="blue.400"
                      >
                        <CalendarIcon stroke="white" />
                      </Center>
                    </Box>
                    <Text fontSize="xl">Flexible</Text>
                  </Center>
                  <Center mt="20px">
                    <Box mr="5px" d="inline-block">
                      <Center
                        h="42px"
                        fontSize="xl"
                        w="42px"
                        borderRadius="50%"
                        bg="blue.400"
                      >
                        <SmileIcon stroke="white" />
                      </Center>
                    </Box>
                    <Text fontSize="xl">Cheaper</Text>
                  </Center>
                </Flex>
                <Text mt={8} color="blue.500">
                  <Link to="how_to">How to order with Briddgy?</Link>
                </Text>
              </Flex>
            </Box>
            <Box flex="1" maxW="600px">
              <Img fluid={data.image2.childImageSharp.fluid} />
            </Box>
          </Flex>
          <Heading fontSize="2xl" as="h2" fontWeight="normal" mb={3} mt="75px">
            Items to purchase
          </Heading>
          <Text variant="secondary">
            Purchase the most <strong>interesting</strong> and
            <strong> exclusive</strong> items from any point in the world
          </Text>
          <Text textAlign="right">
            <CLink as="span">
              <Link to="#">
                more products <ChevronRightIcon />
              </Link>
            </CLink>
          </Text>
          <Flex pt="50px" h="400px" w="100%">
            <HStack d="flex" h="100%" w="100%" spacing="32px">
              <ProductCard
                productId="1"
                price="1999"
                productName="Ipad Air 10.9 inch"
                store="apple.com"
                img={data.ipad.childImageSharp.fluid}
              />
              <ProductCard
                productId="1"
                price="1999"
                productName="Ipad Air 10.9 inch"
                store="apple.com"
                img={data.ipad.childImageSharp.fluid}
              />
              <ProductCard
                productId="1"
                price="3000"
                flex="1"
                productName="ASUS Zenbook Pro 15 inch"
                store="asus.com"
                img={data.laptop.childImageSharp.fluid}
              />
            </HStack>
          </Flex>

          <Heading fontSize="2xl" as="h2" fontWeight="normal" mb={3} mt="75px">
            Or
          </Heading>
          <Text variant="secondary">
            Send your <strong>personal parcels</strong> through travelers right
            now
          </Text>
          <Text mt="40px" fontSize="2xl" textAlign="right">
            Check our{" "}
            <Link to="/advice">
              <Text
                color="blue.400"
                variant="halfUnderline"
                fontWeight={600}
                as="span"
              >
                advice
              </Text>
            </Link>{" "}
            for orderers
          </Text>
        </Container>
      </Box>
      <Box w="100%" mb="100px" as="section">
        <Container h="100%" maxW="1200px">
          <Heading mb="80px" fontSize="5xl" fontWeight="600" textAlign="center">
            Why people love Briddgy{" "}
            <HeartIcon display="inline-block" color="red.400" />
          </Heading>
          <TestimonialLanding />
        </Container>
      </Box>
      <Box w="100%">
        <Img fluid={data.app.childImageSharp.fluid} />
      </Box>
    </>
  )
}
export default injectIntl(Home)
