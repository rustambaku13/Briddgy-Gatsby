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
import { HowToEarnMoney } from "../../components/Layout/HowToEarnMoney"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { NavigationContext } from "../../providers/navPage"
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
      <NavigationContext.Provider value={{ page: "travel" }}>
        <TravelNavbar />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Box
        overflow="hidden"
        bgGradient="linear(to-b,tealBlue.light,tealBlue.dark)"
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
              fontSize={["hb2", "hb4"]}
              color="white"
              as="h1"
              fontWeight="700"
              lineHeight="1.5"
            >
              Travel with minimum costs with Briddgy
            </Heading>
            <Text as="h2" mb={6} color="white">
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
        <Heading mb={10} fontSize="hb3" fontWeight="700" textAlign="center">
          Information for orderers
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
      <HowToEarnMoney />
      <Container mb={[20, 20, "150px"]} pt={8} maxW="full" as="section">
        <Heading mb={10} fontSize="hb3" fontWeight="700" textAlign="center">
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
      </Container>
      <Container bg="blue.50" py={8} as="section" maxW="full">
        <Heading mb={10} fontSize="hb3" fontWeight="700" textAlign="center">
          Frequently Asked Questions
        </Heading>
        <Container maxW="container.xl">
          <Stack textAlign="center" direction={["column", "row"]} spacing={12}>
            <Box flex={1}>
              <Heading mb={5} as="h3" fontSize="700" fontWeight="700">
                How is payment guaranteed?
              </Heading>
              <Text variant="secondary">
                Your payment is guaranteed and secured by Briddgy. Shoppers pay
                upfront and cannot cancel once paid.
              </Text>
            </Box>
            <Box flex={1}>
              <Heading mb={5} as="h3" fontSize="700" fontWeight="700">
                Who is paying for product?
              </Heading>
              <Text variant="secondary">
                You buy the product so that you own it and are aware of the
                contents.
              </Text>
            </Box>
            <Box flex={1}>
              <Heading mb={5} as="h3" fontSize="700" fontWeight="700">
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
