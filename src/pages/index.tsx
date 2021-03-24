import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby-plugin-intl"
import React from "react"
import { Helmet } from "react-helmet"
import { Swiper, SwiperSlide } from "swiper/react"
import { ProductCard } from "../components/Cards/Order/Product"
import { TravelDestinationCard } from "../components/Cards/Trip/TravelDestination"
import Navbar from "../components/Navbar"
import { TestimonialLanding } from "../components/Testimonials"
import { CalendarIcon } from "../icons/Calendar"
import { ChevronRightIcon } from "../icons/ChevronRight"
import { ClockIcon } from "../icons/Clock"
import { HeartIcon } from "../icons/Heart"
import { SmileIcon } from "../icons/Smile"
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

      <Box w="100%" mb={[20, 20, "150px"]} as="header">
        <Box d={["block", "block", "none"]} w="100%">
          <Img
            alt="Briddgy postless delivery platform"
            fluid={data.landing_image.childImageSharp.fluid}
          />
        </Box>
        <Container
          display="flex"
          pr={0}
          pl={0}
          mr={0}
          pt="50px"
          justifyContent={["center", "center", "space-between"]}
          alignItems="center"
          h="100%"
          maxW="1500px"
        >
          <Box
            ml={[3, 3, 5]}
            mr={[3, 3, 0]}
            flex={3}
            maxW={["unset", "unset", "550px"]}
          >
            <Heading as="h1" fontSize={["4xl", "5xl"]} lineHeight="1.3" mb={7}>
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
              <Button
                w={["100%", "100%", "auto"]}
                mb={3}
                variant="primary"
                size="lg"
                mr={3}
              >
                Order with Briddgy
              </Button>
              <Button
                w={["100%", "100%", "auto"]}
                mb={3}
                bg="white"
                size="lg"
                variant="outline"
              >
                Travel with Briddgy
              </Button>
            </Box>
          </Box>
          <Box
            d={["none", "none", "block"]}
            flex={2}
            h="500px"
            maxW="800px"
            w="100%"
          >
            <Img
              alt="Briddgy postless delivery platform"
              fluid={data.landing_image.childImageSharp.fluid}
            />
          </Box>
        </Container>
      </Box>
      <Box w="100%" mb={[20, 20, "150px"]} as="section">
        <Container h="100%" maxW="1200px">
          <Heading mb={10} fontSize="5xl" fontWeight="600" textAlign="center">
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
      <Box w="100%" mb={[20, 20, "150px"]} as="section">
        <Container h="100%" maxW="1200px">
          <Heading mb={10} fontSize="5xl" fontWeight="600" textAlign="center">
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
            <Box d={["none", "none", "block"]} flex="1" maxW="600px">
              <Img
                alt="Order with minimum costs"
                fluid={data.image2.childImageSharp.fluid}
              />
            </Box>
          </Flex>
          <Heading fontSize="2xl" as="h2" fontWeight="normal" mb={3} mt="75px">
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
          <Flex pt="50px" w="100%">
            <Grid
              gridTemplateColumns={[
                "repeat(1, 1fr)",
                "repeat(2, 1fr)",
                "repeat(4, 1fr)",
                "repeat(4, 1fr)",
              ]}
              gap="32px"
              w="100%"
            >
              <ProductCard
                productId={1}
                price={data.products_vertical.edges?.[0].node.frontmatter.price}
                productName={
                  data.products_vertical.edges?.[0].node.frontmatter.title
                }
                store={data.products_vertical.edges?.[0].node.frontmatter.store}
                img={data.products_vertical.edges?.[0].node.frontmatter.image}
              />
              <ProductCard
                productId="1"
                price={data.products_vertical.edges?.[1].node.frontmatter.price}
                productName={
                  data.products_vertical.edges?.[1].node.frontmatter.title
                }
                store={data.products_vertical.edges?.[1].node.frontmatter.store}
                img={data.products_vertical.edges?.[1].node.frontmatter.image}
              />
              <ProductCard
                gridColumn={["1 / span 1", "1 / span 2", "3 / span 2"]}
                productId="1"
                price={data.products_horizontal.frontmatter.price}
                productName={data.products_horizontal.frontmatter.title}
                store={data.products_horizontal.frontmatter.store}
                img={data.products_horizontal.frontmatter.image}
              />
            </Grid>
          </Flex>

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
        <Container h="100%" maxW="1200px">
          <Heading
            mb="80px"
            fontSize={["4xl", "4xl", "5xl"]}
            fontWeight="600"
            textAlign="center"
          >
            Why people love Briddgy &nbsp;
            <HeartIcon display="inline-block" color="red.400" />
          </Heading>
          <TestimonialLanding />
        </Container>
      </Box>
      <Box w="100%">
        <Img alt="Mobile Application" fluid={data.app.childImageSharp.fluid} />
      </Box>
    </>
  )
}

export const query = graphql`
  query {
    products_vertical: allMarkdownRemark(
      filter: {
        fields: { sourceName: { eq: "products" } }
        frontmatter: { vertical: { eq: true } }
      }
      limit: 2
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            store
            vertical
            price
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            templateKey
            description
            featuredpost
            featuredimage
            tag
            color
          }
        }
      }
    }
    products_horizontal: markdownRemark(
      fields: { sourceName: { eq: "products" } }
      frontmatter: { vertical: { eq: false } }
    ) {
      frontmatter {
        title
        date
        store
        vertical
        price
        image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        templateKey
        description
        featuredpost
        featuredimage
        tag
        color
      }
    }
    landing_image: file(relativePath: { eq: "landing_image.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
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

export default Home
