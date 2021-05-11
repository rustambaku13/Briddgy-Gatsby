import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  LinkBox,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby-plugin-intl"
import React from "react"
import { Helmet } from "react-helmet"
import { BlogLinkCard } from "../../components/Cards/Blog/BlogLinkCard"
import { TestimonialLinkCard } from "../../components/Cards/Testimonial/TestimonialLinkCard"
import Footer from "../../components/Footer"
import { HowToOrder } from "../../components/Layout/HowToOrder"
import { ProductGrid } from "../../components/Layout/ProductGrid"
import { OrderNavbar } from "../../components/Navbar"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import SupportIcon from "../../icons/Support"
import { NavigationContext } from "../../providers/navPage"
const AddOrder = ({ data }) => {
  return (
    <>
      <Helmet title="Briddgy | Create Order" defer={false}>
        <meta
          name="description"
          content="Shop Worldwide with fastest and cheapest delivery. Briddgy postless, peer-to-peer delivery platform.Travel with minimum costs and earn money."
        />
      </Helmet>
      <NavigationContext.Provider value={{ page: "order" }}>
        <OrderNavbar />
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
          mt={["160px", "160px", "130px"]}
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
              Shop Product from Anywhere and save up to 40%
            </Heading>
            <Text mb={4} mr={4} d="inline-block" variant="transparentOutline">
              Delivered by our verified users
            </Text>
            <Text d="inline-block" variant="transparentOutline">
              Flexible and super fast delivery
            </Text>
          </Box>
          <Box d={["none", "none", "block"]} flex={2}>
            <Box maxW="500px" ml="auto">
              <Img
                alt="E-Commerce"
                fluid={data.ecommerce.childImageSharp.fluid}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Container
        mb={[20, 20, "150px"]}
        as="section"
        mx="auto"
        maxW="container.xl"
      >
        <Heading mb={10} fontSize="hb3" fontWeight="700" textAlign="center">
          Trending Products in Briddgy
        </Heading>

        <ProductGrid />
      </Container>
      <Container mb={[20, 20, "150px"]} as="section" maxW="container.lg">
        <Heading mb={10} fontSize="hb3" fontWeight="700" textAlign="center">
          Information for orderers
        </Heading>

        <Grid templateColumns="repeat(9, 1fr)" gap={[3, 5, 8]}>
          {data.blogs.edges.map(blog=>(
            <BlogLinkCard
            flexDir={["column", "column", "row"]}
            gridColumn={["1 / span 9"]}
            blog={blog.node.frontmatter}
          />
          ))}
        </Grid>
      </Container>
      <HowToOrder />
      <Container mb={[20, 20, "150px"]} pt={8} maxW="full" as="section">
        <Heading mb={10} fontSize="hb3" fontWeight="700" textAlign="center">
          Why our shoppers love Briddgy
        </Heading>
        <SimpleGrid
          spacing={7}
          columns={[1, 2, 3]}
          mx="auto"
          className="even-right-align"
          maxW="container.xl"
        >
          <TestimonialLinkCard
            testimonial={data.testimonials.edges[1].node.frontmatter}
          />
          <TestimonialLinkCard
            testimonial={data.testimonials.edges[1].node.frontmatter}
          />
          <TestimonialLinkCard
            testimonial={data.testimonials.edges[1].node.frontmatter}
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
            <Link to="/faq">
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
export const query = graphql`
  query {
    blogs: allMarkdownRemark(
      filter: {
        fields: { sourceName: { eq: "blogs" } }
        frontmatter: { scoppe_tag: { eq: "Orderer" } }
      }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            description
            title
            featuredimage {
              childImageSharp {
                fluid(fit: INSIDE) {
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

    testimonials: allMarkdownRemark(
      filter: { fields: { sourceName: { eq: "testimonial" } } }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            description
            featuredimage {
              childImageSharp {
                fluid(fit: INSIDE) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tag
            scoppe_tag
          }
        }
      }
    }
    # Images
    visa: file(relativePath: { eq: "visa.png" }) {
      childImageSharp {
        fixed(width: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    mastercard: file(relativePath: { eq: "mastercard.png" }) {
      childImageSharp {
        fixed(width: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ecommerce: file(relativePath: { eq: "orders_page_main.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ipad: file(relativePath: { eq: "ipad.png" }) {
      childImageSharp {
        fixed(height: 450) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    laptop: file(relativePath: { eq: "laptop.png" }) {
      childImageSharp {
        fixed(height: 450) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
export default AddOrder
