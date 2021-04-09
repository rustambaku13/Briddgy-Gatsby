import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Img as CImg,
  LinkBox,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import anime from "animejs/lib/anime.es.js"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby-plugin-intl"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { BlogLinkCard } from "../../components/Cards/Blog/BlogLinkCard"
import { ProductCard } from "../../components/Cards/Order/Product"
import { TestimonialLinkCard } from "../../components/Cards/Testimonial/TestimonialLinkCard"
import { StepCircle } from "../../components/Misc/StepCircle"
import { OrderNavbar } from "../../components/Navbar"
import SupportIcon from "../../icons/Support"
import card from "../../images/debit-cardicon.svg"
import earth from "../../images/earthicon.svg"
import note from "../../images/noteicon.svg"
import plane from "../../images/planeicon.svg"
import { Helmet } from "react-helmet"
import Footer from "../../components/Footer"
import { HowToEarnMoney } from "../../components/Layout/HowToEarnMoney"
import { NavigationContext } from "../../providers/navPage"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
const AddOrder = ({ data }) => {
  const { register, handleSubmit, errors } = useForm()
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
          mt="130px"
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

        <Grid templateColumns="repeat(6, 1fr)" gap={[3, 5, 8]}>
          <ProductCard
            gridColumn={["1 / span 3", "1 / span 2"]}
            productId={1}
            price={data.products_vertical.edges?.[0].node.frontmatter.price}
            productName={
              data.products_vertical.edges?.[0].node.frontmatter.title
            }
            store={data.products_vertical.edges?.[0].node.frontmatter.store}
            img={data.products_vertical.edges?.[0].node.frontmatter.image}
          />
          <ProductCard
            gridColumn={["1 / span 6", "3 / span 4"]}
            productId="1"
            price={data.products_horizontal.frontmatter.price}
            productName={data.products_horizontal.frontmatter.title}
            store={data.products_horizontal.frontmatter.store}
            img={data.products_horizontal.frontmatter.image}
          />
          <ProductCard
            gridColumn={["1 / span 3", "1 / span 2"]}
            productId={1}
            price={data.products_vertical.edges?.[1].node.frontmatter.price}
            productName={
              data.products_vertical.edges?.[1].node.frontmatter.title
            }
            store={data.products_vertical.edges?.[1].node.frontmatter.store}
            img={data.products_vertical.edges?.[1].node.frontmatter.image}
          />
          <ProductCard
            gridColumn={["4 / span 3", "3 / span 2"]}
            productId={1}
            price={data.products_vertical.edges?.[1].node.frontmatter.price}
            productName={
              data.products_vertical.edges?.[1].node.frontmatter.title
            }
            store={data.products_vertical.edges?.[1].node.frontmatter.store}
            img={data.products_vertical.edges?.[1].node.frontmatter.image}
          />
          <ProductCard
            gridRow={["1", "2"]}
            gridColumn={["4 / span 3", "5 / span 2"]}
            productId={1}
            price={data.products_vertical.edges?.[1].node.frontmatter.price}
            productName={
              data.products_vertical.edges?.[1].node.frontmatter.title
            }
            store={data.products_vertical.edges?.[1].node.frontmatter.store}
            img={data.products_vertical.edges?.[1].node.frontmatter.image}
          />
        </Grid>
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
export const query = graphql`
  query {
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
        tag
        color
      }
    }
    products_vertical: allMarkdownRemark(
      filter: {
        fields: { sourceName: { eq: "products" } }
        frontmatter: { vertical: { eq: true } }
      }
      limit: 4
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
            tag
            color
          }
        }
      }
    }

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
