import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  IconButton,
  Img as CImg,
  LinkBox,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
} from "@chakra-ui/react"
import { graphql, PageProps } from "gatsby"
import Img from "gatsby-image"
import { injectIntl, Link } from "gatsby-plugin-intl"
import React from "react"
import { Helmet } from "react-helmet"
import { Swiper, SwiperSlide } from "swiper/react"
import { BlogLinkCard } from "../../components/Cards/Blog/BlogLinkCard"
import { TestimonialLinkCard } from "../../components/Cards/Testimonial/TestimonialLinkCard"
import { TravelDestinationCard } from "../../components/Cards/Trip/TravelDestination"
import { StepCircle } from "../../components/Misc/StepCircle"
import { TravelNavbar } from "../../components/Navbar"
import BulletTriangleIcon from "../../icons/BulletTriangle"
import { ChevronLeftIcon } from "../../icons/ChevronLeft"
import { ChevronRightIcon } from "../../icons/ChevronRight"
import SupportIcon from "../../icons/Support"
import card from "../../images/debit-cardicon.svg"
import earth from "../../images/earthicon.svg"
import note from "../../images/noteicon.svg"
import plane from "../../images/planeicon.svg"
import Footer from "../../components/Footer"
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
    # Blogs
    blogs: allMarkdownRemark(
      filter: {
        fields: { sourceName: { eq: "blogs" } }
        frontmatter: { scoppe_tag: { eq: "Traveler" } }
      }
      limit: 4
    ) {
      edges {
        node {
          frontmatter {
            description
            title
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date
            tag
          }
        }
      }
    }
  }
`

const AddTrip = ({ data }: PageProps) => {
  return (
    <>
      <Helmet title="Briddgy | Add Trip" defer={false}>
        <meta
          name="description"
          content="Travel with minimum costs and earn money. Briddgy postless, peer-to-peer delivery platform. Shop Worldwide with fastest and cheapest delivery."
        />
      </Helmet>
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
        <Container
          d="flex"
          alignItems="center"
          mx="auto"
          mb="100px"
          maxW="container.xxl"
          mt={["300px", "300px", "130px"]}
        >
          <Box flex={3}>
            <Heading
              mb={5}
              fontSize="5xl"
              color="white"
              as="h1"
              lineHeight="1.5"
            >
              Travel with minimum costs with Briddgy
            </Heading>
            <Text as="h2" mb={6} color="whiteAlpha.800">
              Search for tickets, hotels and share your trip in Briddgy
              <br /> Make deliveries and earn money!{" "}
            </Text>
            <Text color="white">
              <Link to="/">
                <BulletTriangleIcon /> How to earn with Briddgy?
              </Link>
            </Text>
          </Box>
          <Box d={["none", "none", "block"]} flex={2}>
            <Box maxW="500px" ml="auto">
              <Img alt="Worldwide " fluid={data.globe.childImageSharp.fluid} />
            </Box>
          </Box>
        </Container>
      </Box>

      <Container mb={[20, 20, "150px"]} as="section" maxW="container.xl">
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
      <Container mb={[20, 20, "150px"]} as="section" maxW="container.lg">
        <Heading mb="50px" textAlign="center">
          Information for travelers
        </Heading>
        <BlogLinkCard
          title={data.blogs.edges[0].node.frontmatter.title}
          description={data.blogs.edges[0].node.frontmatter.description}
          tags={data.blogs.edges[0].node.frontmatter.tag}
          orientation="horizontal"
        />
        <SimpleGrid columns={[1, 2, 3]} spacing="8">
          <BlogLinkCard
            title={data.blogs.edges[0].node.frontmatter.title}
            description={data.blogs.edges[0].node.frontmatter.description}
            tags={data.blogs.edges[0].node.frontmatter.tag}
            orientation="vertical"
          />
          <BlogLinkCard
            title={data.blogs.edges[0].node.frontmatter.title}
            description={data.blogs.edges[0].node.frontmatter.description}
            tags={data.blogs.edges[0].node.frontmatter.tag}
            orientation="vertical"
          />
          <BlogLinkCard
            title={data.blogs.edges[0].node.frontmatter.title}
            description={data.blogs.edges[0].node.frontmatter.description}
            tags={data.blogs.edges[0].node.frontmatter.tag}
            orientation="vertical"
          />
        </SimpleGrid>
      </Container>
      <Divider />
      <Container mb={[20, 20, "150px"]} pt={8} maxW="full" as="section">
        <Heading textAlign="center" mb="80px">
          How to Earn Money Traveling
        </Heading>
        <SimpleGrid
          spacing={25}
          columns={[1, 2, 4]}
          mx="auto"
          maxW="container.xl"
        >
          <Box>
            <StepCircle
              mb={5}
              mx="auto"
              bg="blue.400"
              h="120px"
              w="120px"
              step={1}
            >
              <CImg alt="Add Trip" height="60px" width="60px" src={earth} />
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
              <CImg alt="Make Offers" height="60px" width="60px" src={note} />
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
              <CImg
                alt="Buy and deliver"
                height="60px"
                width="60px"
                src={plane}
              />
            </StepCircle>
            <Heading mb={5} textAlign="center" fontSize="2xl" as="h4">
              Buy and deliver
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
              <CImg alt="Earn money" height="60px" width="60px" src={card} />
            </StepCircle>
            <Heading mb={5} textAlign="center" fontSize="2xl" as="h4">
              Earn money
            </Heading>
            <Text variant="secondary" textAlign="center">
              After you have delivered the item you are going to receive the
              payment.
            </Text>
          </Box>
        </SimpleGrid>

        <LinkBox mt={16} mx="auto" w="300px">
          <Link to="/travel">
            <Button
              mx="auto"
              variant="solid"
              color="white"
              bg="blue.500"
              _hover={{ bg: "blue.600" }}
              w="100%"
            >
              Add Trip
            </Button>
          </Link>
        </LinkBox>
      </Container>
      <Container mb={[20, 20, "150px"]} pt={8} maxW="full" as="section">
        <Heading textAlign="center" mb="80px">
          Why our shoppers love Briddgy
        </Heading>
        <SimpleGrid
          spacing={7}
          columns={[1, 1, 3]}
          mx="auto"
          className="even-right-align"
          maxW="container.xl"
        >
          <TestimonialLinkCard
            title="Rustam Quliyev"
            description="Menim fikirimce asdasda sda sda sd asd asd Menim fikirimce asdasda sda sda sd asd asd Menim fikirimce "
          />
          <TestimonialLinkCard
            title="Rustam Quliyev"
            description="Menim fikirimce asdasda sda sda sd asd asd Menim fikirimce asdasda sda sda sd asd asd Menim fikirimce "
          />
          <TestimonialLinkCard
            title="Rustam Quliyev"
            description="Menim fikirimce asdasda sda sda sd asd asd Menim fikirimce asdasda sda sda sd asd asd Menim fikirimce "
          />
        </SimpleGrid>
        <LinkBox mt={16} mx="auto" w="300px">
          <Link to="/order">
            <Button
              mx="auto"
              variant="solid"
              color="white"
              bg="blue.500"
              _hover={{ bg: "blue.600" }}
              w="100%"
            >
              More of our stories
            </Button>
          </Link>
        </LinkBox>
      </Container>
      <Container py={8} bg="blueAlpha.100" as="section" maxW="full">
        <Heading textAlign="center" mb="80px">
          Frequently Asked Questions
        </Heading>
        <Container maxW="container.xl">
          <Stack direction={["column", "row"]} spacing={12}>
            <Box>
              <Heading mb={5} as="h3" fontSize="2xl">
                How is payment guaranteed?
              </Heading>
              <Text variant="secondary">
                Your payment is guaranteed and secured by Briddgy. Shoppers pay
                upfront and cannot cancel once paid.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" mb={5} fontSize="2xl">
                Who is paying for product?
              </Heading>
              <Text variant="secondary">
                You buy the product so that you own it and are aware of the
                contents.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" fontSize="2xl">
                How are deliveries arranged?
              </Heading>
              <Text variant="secondary">
                Arrange to meet in a public place with your shoppers via Grabr
                messenger.
              </Text>
            </Box>
          </Stack>
          <LinkBox mt={16} mx="auto" w="300px">
            <Link to="/order">
              <Button
                leftIcon={<SupportIcon />}
                mx="auto"
                variant="outline"
                bg="white"
                w="100%"
              >
                Help Center
              </Button>
            </Link>
          </LinkBox>
        </Container>
      </Container>
      <Footer />
    </>
  )
}
export default injectIntl(AddTrip)
