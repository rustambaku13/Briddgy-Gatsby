import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby-plugin-intl"
import React from "react"
import { Helmet } from "react-helmet"
import { Swiper, SwiperSlide } from "swiper/react"
import { TravelDestinationCard } from "../components/Cards/Trip/TravelDestination"
import Footer from "../components/Footer"
import { ProductGrid } from "../components/Layout/ProductGrid"
import { TextAnimate } from "../components/Animations/TextAnimate"
import Navbar from "../components/Navbar"
import { BottomNavbar } from "../components/Navbar/BottomNavbar"
import { TestimonialLanding } from "../components/Testimonials"
import { CalendarIcon } from "../icons/Calendar"
import { ChevronRightIcon } from "../icons/ChevronRight"
import { ClockIcon } from "../icons/Clock"
import { HeartIcon } from "../icons/Heart"
import { SmileIcon } from "../icons/Smile"
import { DeliveryBoxIcon } from "../icons/DeliveryBox"
import { PlaneIcon } from "../icons/Plane"
const Home = ({ data }) => {
  return (
    <>
      <Helmet
        title="Briddgy | Your first postless delivery platform"
        defer={false}
      >
        <meta
          name="description"
          content="Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money."
        />
      </Helmet>
      <Navbar />
      <BottomNavbar />
      <Container
        minH="700px"
        w="100%"
        maxW="full"
        mb={[20]}
        as="main"
        // bgGradient="linear(to-t,crayolaGreen.base,tealBlue.dark)"
        className="landing-header"
      >
        <Box pl={[0, 0, 10]} pt={[14, 14, "120px"]} w="100%">
          <Heading
            color="white"
            mb={12}
            textAlign="left"
            fontWeight="600"
            fontSize={["hb3", "hb3", "60px"]}
          >
            Save up to{" "}
            <TextAnimate
              delay={8000}
              texts={["40%", "55%", "35%", "45%", "60%"]}
            />{" "}
            <br />
            by ordering from{" "}
            <TextAnimate
              delay={4000}
              texts={["USA", "UK", "China", "Germany"]}
            />
            <br />
            delivered by traveler going to{" "}
            <TextAnimate
              delay={2000}
              texts={[
                "Argentina",
                "Brazil",
                "Chile",
                "Peru",
                "Russia",
                "India",
              ]}
            />
          </Heading>
          <Text color="white" mb={12} fontSize="600" textAlign="left">
            We connect travelers and orderers, making delivery more accessible
          </Text>
          <Flex>
            <Box w="100%">
              <Link to="/order">
                <Button
                  mb={5}
                  w={["100%", "100%", "auto"]}
                  mr={4}
                  variant="outline"
                  size="lg"
                >
                  Order with Briddgy
                </Button>
              </Link>
              <Link to="/travel">
                <Button
                  color="text.dark"
                  mb={5}
                  w={["100%", "100%", "auto"]}
                  variant="outline"
                  size="lg"
                >
                  Travel with Briddgy
                </Button>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Container>
      <Box w="100%" mb={[20, 20, "150px"]} as="section">
        <Container h="100%" maxW="container.xl">
          <Heading mb={10} fontSize="hb3" fontWeight="700" textAlign="center">
            Orderers
          </Heading>
          <Box mb={7} d={["block", "block", "none"]} w="100%">
            <Img
              alt="Order with minimum costs"
              fluid={data.image2.childImageSharp.fluid}
            />
          </Box>
          <Flex justifyContent="space-between" h="100%" w="100%">
            <Box maxW="480px" flex="1">
              <Flex flexDir="column" justifyContent="center" h="100%">
                <Text mb={7} fontSize="hb1" w="100%" as="h2">
                  Order and get your items delivered through travelers
                </Text>
                <Flex mt="-20px" wrap="wrap">
                  <Center mt="20px" mr={14}>
                    <Box mr="5px" d="inline-block">
                      <Center
                        h="42px"
                        fontSize="600"
                        w="42px"
                        borderRadius="50%"
                        bg="tealBlue.light"
                      >
                        <ClockIcon stroke="white" />
                      </Center>
                    </Box>
                    <Text fontSize="600">Faster</Text>
                  </Center>
                  <Center mt="20px" mr={14}>
                    <Box mr="5px" d="inline-block">
                      <Center
                        h="42px"
                        fontSize="600"
                        w="42px"
                        borderRadius="50%"
                        bg="tealBlue.light"
                      >
                        <CalendarIcon stroke="white" />
                      </Center>
                    </Box>
                    <Text fontSize="600">Flexible</Text>
                  </Center>
                  <Center mt="20px">
                    <Box mr="5px" d="inline-block">
                      <Center
                        h="42px"
                        fontSize="600"
                        w="42px"
                        borderRadius="50%"
                        bg="tealBlue.light"
                      >
                        <SmileIcon stroke="white" />
                      </Center>
                    </Box>
                    <Text fontSize="600">Cheaper</Text>
                  </Center>
                </Flex>
                <Text mt={8} color="oxfordBlue.base">
                  <Link to="faq/post/adding-order">
                    How to order with Briddgy?
                  </Link>
                </Text>
              </Flex>
            </Box>
            <Box d={["none", "none", "block"]} flex="1" maxW="600px">
              <Img
                alt="Order with minimum costs"
                fluid={data.image2.childImageSharp.fluid}
              />
            </Box>
          </Flex>
          <Heading fontSize="hb1" as="h2" fontWeight="normal" mb={3} mt="75px">
            Items to purchase
          </Heading>
          <Text mb={5} variant="secondary">
            Purchase the most <strong>interesting</strong> and
            <strong> exclusive</strong> items from any point in the world
          </Text>
          <Text textAlign="right">
            <Text _hover={{ textDecor: "underline" }} as="span">
              <Link to="#">
                more products <ChevronRightIcon />
              </Link>
            </Text>
          </Text>

          <ProductGrid />

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

      <Box w="100%" mb={[20, 20, "150px"]} as="section">
        <Container h="100%" maxW="container.xl">
          <Heading mb={10} fontSize="hb3" fontWeight="700" textAlign="center">
            Travelers
          </Heading>
          <Box mb={7} d={["block", "block", "none"]} w="100%">
            <Img
              alt="Travel and Earn"
              fluid={data.image1.childImageSharp.fluid}
            />
          </Box>
          <Flex justifyContent="space-between" h="100%" w="100%">
            <Box d={["none", "none", "block"]} flex="1" maxW="600px">
              <Img
                alt="Travel and Earn"
                fluid={data.image1.childImageSharp.fluid}
              />
            </Box>
            <Box ml="auto" w="100%" maxW="480px" flex="1">
              <Flex flexDir="column" justifyContent="center" h="100%">
                <Text mb={7} fontSize="hb1" w="100%" textAlign="right" as="h2">
                  Travel cheaper by discounting travel expences with Briddgy
                </Text>
                <Box mb={7} ml="auto" display="flex" alignItems="center">
                  <Text variant="secondary" display="inline-block" as="h4">
                    Average earning per trip
                  </Text>
                  <Center
                    ml={3}
                    borderRadius="50%"
                    w="100px"
                    h="100px"
                    border="6px solid"
                    fontWeight="bold"
                    fontSize="700"
                    color="text.medium"
                    borderColor="crayolaGreen.base"
                  >
                    120 $
                  </Center>
                </Box>
                <Text color="oxfordBlue.base" textAlign="right">
                  <Link to="/faq/post/adding-trip">
                    How to start earning with Briddgy?
                  </Link>
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Heading fontSize="hb1" as="h2" fontWeight="normal" mb={3} mt="80px">
            Top travel destinations
          </Heading>
          <Text mb={5} variant="secondary">
            Pick a travel destination with most orders and travel with{" "}
            <strong>minimum</strong> costs
          </Text>
          <Text textAlign="right">
            <Text _hover={{ textDecor: "underline" }} as="span">
              <Link to="#">
                more destinations <ChevronRightIcon />
              </Link>
            </Text>
          </Text>
          <Box pt="50px" w="100%">
            <Swiper
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              spaceBetween={40}
              breakpoints={{
                500: {
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
                  img={data.az.childImageSharp.fixed}
                />
              </SwiperSlide>
              <SwiperSlide>
                <TravelDestinationCard
                  destinationId={1}
                  destinationName="Moscow"
                  rewardsAvailable="15,302"
                  tripsCount="200"
                  ordersCount="350"
                  img={data.ru.childImageSharp.fixed}
                />
              </SwiperSlide>
              <SwiperSlide>
                <TravelDestinationCard
                  destinationId={1}
                  destinationName="Turkey"
                  rewardsAvailable="10,302"
                  tripsCount="100"
                  ordersCount="300"
                  img={data.tr.childImageSharp.fixed}
                />
              </SwiperSlide>
              <SwiperSlide>
                <TravelDestinationCard
                  destinationId={1}
                  destinationName="Turkey"
                  rewardsAvailable="10,302"
                  tripsCount="100"
                  ordersCount="300"
                  img={data.en.childImageSharp.fixed}
                />
              </SwiperSlide>
            </Swiper>
          </Box>
          <Text mt="50px" fontSize="hb1" textAlign="right">
            Check our{" "}
            <Link to="/advice">
              <Text
                color="tealBlue.base"
                variant="halfUnderline"
                fontWeight={700}
                as="span"
              >
                advice
              </Text>
            </Link>{" "}
            for travelers
          </Text>
        </Container>
      </Box>

      <Box w="100%" mb={[20, 20, "150px"]} as="section">
        <Container h="100%" maxW="container.xl">
          <Heading mb="10" fontSize="hb3" fontWeight="700" textAlign="center">
            Why people love Briddgy &nbsp;
            <HeartIcon display="inline-block" color="red.400" />
          </Heading>
          <TestimonialLanding />
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export const query = graphql`
  query {
    # landing_plane: file(relativePath: { eq: "langin-plane.png" }) {
    #   childImageSharp {
    #     fluid {
    #       ...GatsbyImageSharpFluid
    #     }
    #   }
    # }
    # shopping_map: file(relativePath: { eq: "landing_image.jpg" }) {
    #   childImageSharp {
    #     fluid {
    #       ...GatsbyImageSharpFluid
    #     }
    #   }
    # }
    overlay: file(relativePath: { eq: "landing-overlay.png" }) {
      childImageSharp {
        fixed(width: 500) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    image1: file(relativePath: { eq: "traveling_man.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    image2: file(relativePath: { eq: "shopping_man.jpg" }) {
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
        fixed(height: 400, cropFocus: CENTER, width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ru: file(relativePath: { eq: "russia.jpg" }) {
      childImageSharp {
        fixed(height: 400, cropFocus: CENTER, width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    tr: file(relativePath: { eq: "turkey.jpg" }) {
      childImageSharp {
        fixed(height: 400, cropFocus: CENTER, width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    en: file(relativePath: { eq: "england.jpg" }) {
      childImageSharp {
        fixed(height: 400, cropFocus: CENTER, width: 300) {
          ...GatsbyImageSharpFixed
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

export default Home
