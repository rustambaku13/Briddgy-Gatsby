import {
  Box,
  Button,
  Center,
  Circle,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  Img as CImg,
  InputRightAddon,
  SimpleGrid,
  Tag,
  TagRightIcon,
  Text,
} from "@chakra-ui/react"
import Img from "gatsby-image"
import { ChevronRightIcon } from "../../icons/ChevronRight"
import { graphql } from "gatsby"
import React from "react"
import CheckIcon from "../../icons/Check"
import { Link } from "gatsby-plugin-intl"
import BulletTriangleIcon from "../../icons/BulletTriangle"
import { ProductCard } from "../../components/Cards/"
import { StepCircle } from "../../components/Misc/StepCircle"

import earth from "../../images/earthicon.svg"
import plane from "../../images/planeicon.svg"
import note from "../../images/noteicon.svg"
import card from "../../images/debit-cardicon.svg"
import { OrderTypeButton } from "../../components/Cards/Order/OrderTypeButton"
import { BlogLinkCard } from "../../components/Cards/Blog/BlogLinkCard"
import { TestimonialLinkCard } from "../../components/Cards/Testimonial/TestimonialLinkCard"

const AddTrip = ({ data }) => {
  console.log(data)
  return (
    <>
      <Box mb="50px" py="50px" bg="lightBlue.100" minW="100%" as="header">
        <Container mx="auto" minW="container.lg">
          <Heading
            as="h1"
            fontSize="4xl"
            mb="25px"
            fontWeight="bold"
            textAlign="center"
          >
            Shop Products from Around the World and save up to 40%
          </Heading>
          <Flex mb={8}>
            <Center
              mr={4}
              p={1}
              borderColor="blue.600"
              color="blue.600"
              borderWidth="1px"
              borderRadius="50%"
            >
              <CheckIcon />
            </Center>
            <Text mr="60px" variant="secondary">
              Delivered by our verified users
            </Text>
            <Center
              mr={4}
              p={1}
              borderColor="blue.600"
              color="blue.600"
              borderWidth="1px"
              borderRadius="50%"
            >
              <CheckIcon />
            </Center>
            <Text variant="secondary">
              Flexible & super fast delivery experience
            </Text>
          </Flex>
          <Flex
            mb={8}
            h="60px"
            w="100%"
            bg="white"
            pl={5}
            borderRadius="50px"
            borderWidth="1px"
          >
            <Input
              placeholder="Enter the URL of the item"
              height="inherit"
              border="none"
              variant="unstyled"
            />
            <Button
              h="50px"
              w="200px"
              p={0}
              variant="red_gradient"
              mt={"4px"}
              mr="8px"
              borderRadius="50px"
            >
              Create Order
            </Button>
          </Flex>
          <Text>
            <Link color="blue.400" to="/">
              <BulletTriangleIcon fill="blue.400" /> How to shop abroad with
              Briddgy?
            </Link>
          </Text>
          <Text my={8} fontSize="3xl" textAlign="center" fontWeight="600">
            OR
          </Text>
          <Flex w="100%" justifyContent="space-between">
            <OrderTypeButton
              fixedImage={data.thrift_shop.childImageSharp.fixed}
              title="Order from offline stores"
            />
            <OrderTypeButton
              fixedImage={data.delivery_bro.childImageSharp.fixed}
              title="Send your parcels"
            />
          </Flex>
        </Container>
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
    thrift_shop: file(relativePath: { eq: "thrift_shop.png" }) {
      childImageSharp {
        fixed(width: 250) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    delivery_bro: file(relativePath: { eq: "delivery_bro.png" }) {
      childImageSharp {
        fixed(width: 250) {
          ...GatsbyImageSharpFixed
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
export default AddTrip
