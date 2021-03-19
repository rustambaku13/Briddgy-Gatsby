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
  Text,
} from "@chakra-ui/react"
import anime from "animejs/lib/anime.es.js"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { ProductCard } from "../../components/Cards/"
import { BlogLinkCard } from "../../components/Cards/Blog/BlogLinkCard"
import { TestimonialLinkCard } from "../../components/Cards/Testimonial/TestimonialLinkCard"
import { AddOrderForm } from "../../components/Form/AddOrderForm"
import { StepCircle } from "../../components/Misc/StepCircle"
import { OrderNavbar } from "../../components/Navbar"
import card from "../../images/debit-cardicon.svg"
import earth from "../../images/earthicon.svg"
import note from "../../images/noteicon.svg"
import plane from "../../images/planeicon.svg"

const AddOrder = ({ data }) => {
  const { register, handleSubmit, errors } = useForm()
  useEffect(() => {
    const animationOrderMainInput = anime({
      targets: "#add_order_form",
      translateY: [0, -100],
      width: 0,
      opacity: 0,

      elasticity: 200,
      easing: "easeInOutSine",
      autoplay: false,
    })
    const functionReference = () => {
      let scrollTop = window.scrollY
      let docHeight = document.body.offsetHeight
      let winHeight = window.innerHeight
      let scrollPercent = scrollTop / (docHeight - winHeight)
      // animation.seek(animation.duration * (scrollPercent / 0.06))
      animationOrderMainInput.seek(
        animationOrderMainInput.duration * (scrollPercent / 0.04)
      )
    }
    window.addEventListener("scroll", functionReference, false)
    return function () {
      window.removeEventListener("scroll", functionReference)
    }
  })
  return (
    <>
      <OrderNavbar />
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

        <Container pt="60px" mx="auto" w="100%" maxW="container.lg">
          <AddOrderForm mx="auto" />
        </Container>
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
              Shop Product from Anywhere and save up to 40%
            </Heading>
            <Box
              mb={3}
              d="inline-block"
              px={3}
              py={1}
              borderRadius="md"
              bg="white"
            >
              <Text fontSize="lg"> Delivered by our verified users</Text>
            </Box>
            <br />
            <Box px={3} py={1} d="inline-block" borderRadius="md" bg="white">
              <Text fontSize="lg"> Flexible and super fast delivery</Text>
            </Box>
          </Box>
          <Box flex={2}>
            <Box maxW="500px" ml="auto">
              <Img fluid={data.ecommerce.childImageSharp.fluid} />
            </Box>
          </Box>
        </Flex>
      </Box>
      <Box mb="120px" as="section" minW="100%">
        <Container mx="auto" minW="container.xl">
          <Heading mb="60px" as="h1" textAlign="center">
            Trending Products in Briddgy
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={8}>
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
              gridColumn="2 / span 2"
              productId="1"
              price={data.products_horizontal.frontmatter.price}
              productName={data.products_horizontal.frontmatter.title}
              store={data.products_horizontal.frontmatter.store}
              img={data.products_horizontal.frontmatter.image}
            />
            <ProductCard
              productId={1}
              price={data.products_vertical.edges?.[1].node.frontmatter.price}
              productName={
                data.products_vertical.edges?.[1].node.frontmatter.title
              }
              store={data.products_vertical.edges?.[1].node.frontmatter.store}
              img={data.products_vertical.edges?.[1].node.frontmatter.image}
            />
            <ProductCard
              productId={1}
              price={data.products_vertical.edges?.[1].node.frontmatter.price}
              productName={
                data.products_vertical.edges?.[1].node.frontmatter.title
              }
              store={data.products_vertical.edges?.[1].node.frontmatter.store}
              img={data.products_vertical.edges?.[1].node.frontmatter.image}
            />
            <ProductCard
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
      </Box>
      <Container my="60px" as="section" maxW="container.lg">
        <Heading mb="50px" textAlign="center">
          Information for travelers
        </Heading>
        <BlogLinkCard
          title={data.blogs.edges[0].node.frontmatter.title}
          description={data.blogs.edges[0].node.frontmatter.description}
          tags={data.blogs.edges[0].node.frontmatter.tag}
          orientation="horizontal"
        />
        <HStack spacing="8">
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
        </HStack>
      </Container>
      <Container my="80px" pt={8} maxW="full" as="section">
        <Heading textAlign="center" mb="80px">
          How to shop from Abroad using Briddgy
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
              Create your Order
            </Heading>
            <Text variant="secondary" textAlign="center">
              Go to any online store and copy and paste the URL of the product
              you would like from abroad.
            </Text>
          </Box>
          <Box>
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
              Make/receive offers
            </Heading>
            <Text variant="secondary" textAlign="center">
              Make offers to travelers or wait for travelers to contact you to
              bring your order.
            </Text>
          </Box>
          <Box>
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
              Secure payment
            </Heading>
            <Text variant="secondary" textAlign="center">
              Secure the payment for the product price and travelers reward
            </Text>
          </Box>
          <Box>
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
              Get your item
            </Heading>
            <Text variant="secondary" textAlign="center">
              Meet with your traveler in a public place and get your item.
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
            Add Order
          </Button>
        </Box>
      </Container>
      <Container h="130px" bg="gray.100" my="80px" maxW="full" as="section">
        <Center justifyContent="space-between" w="300px" mx="auto" h="100%">
          <Img fixed={data.visa.childImageSharp.fixed} />

          <Img fixed={data.mastercard.childImageSharp.fixed} />
        </Center>
      </Container>
      <Container my="80px" pt={8} maxW="full" as="section">
        <Heading textAlign="center" mb="80px">
          Why our shoppers love Briddgy
        </Heading>
        <HStack spacing={25} mx="auto" maxW="container.xl">
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
        </HStack>
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
        featuredimage
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
            featuredimage
            tag
            color
          }
        }
      }
    }

    blogs: allMarkdownRemark(
      filter: {
        fields: { sourceName: { eq: "blogs" } }
        frontmatter: { scoppe_tag: { eq: "Orderer" } }
      }
      limit: 4
    ) {
      edges {
        node {
          frontmatter {
            description
            title
            image {
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
