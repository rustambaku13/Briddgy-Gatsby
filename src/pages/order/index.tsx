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
import { PageProps } from "gatsby"
import React from "react"
import CheckIcon from "../../icons/Check"
import { Link } from "gatsby-plugin-intl"
import BulletTriangleIcon from "../../icons/BulletTriangle"
import { ProductCard } from "../../components/Cards/TravelDestination"
import { StepCircle } from "../../components/Misc/StepCircle"

import earth from "../../images/earthicon.svg"
import plane from "../../images/planeicon.svg"
import note from "../../images/noteicon.svg"
import card from "../../images/debit-cardicon.svg"

export const query = graphql`
  query {
    thrift_shop: file(relativePath: { eq: "thrift_shop.png" }) {
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
const AddTrip = ({ data }: PageProps) => {
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
              color="gray.400"
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
              color="gray.400"
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
              bg="red.400"
              color="white"
              mt={"4px"}
              mr="8px"
              borderRadius="50px"
              variant="solid"
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
            <Box
              bg="white"
              w="450px"
              minH="300px"
              pos="relative"
              cursor="pointer"
              px={5}
              pt={8}
              borderRadius="10px"
              borderWidth="1px"
              boxShadow="md"
            >
              <Heading w="190px" lineHeight="tall" fontSize="3xl">
                Order from offline stores
              </Heading>
              <Img
                style={{ position: "absolute", bottom: 0, right: 0 }}
                fixed={data.thrift_shop.childImageSharp.fixed}
              />
            </Box>
            <Box
              bg="white"
              w="450px"
              minH="300px"
              pos="relative"
              cursor="pointer"
              px={5}
              pt={8}
              borderRadius="10px"
              borderWidth="1px"
              boxShadow="md"
            >
              <Heading w="190px" lineHeight="tall" fontSize="3xl">
                Order from offline stores
              </Heading>
              <Img
                style={{ position: "absolute", bottom: 0, right: 0 }}
                fixed={data.thrift_shop.childImageSharp.fixed}
              />
            </Box>
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
              productId="1"
              price="1999"
              productName="Ipad Air 10.9 inch"
              store="apple.com"
              img={data.ipad.childImageSharp.fixed}
            />
            <ProductCard
              gridColumn="2 / span 2"
              productId="1"
              price="1999"
              productName="Ipad Air 10.9 inch"
              store="apple.com"
              img={data.ipad.childImageSharp.fixed}
            />
            <ProductCard
              productId="1"
              price="1999"
              productName="Ipad Air 10.9 inch"
              store="apple.com"
              img={data.ipad.childImageSharp.fixed}
            />
            <ProductCard
              productId="1"
              price="1999"
              productName="Ipad Air 10.9 inch"
              store="apple.com"
              img={data.ipad.childImageSharp.fixed}
            />
            <ProductCard
              productId="1"
              price="1999"
              productName="Ipad Air 10.9 inch"
              store="apple.com"
              img={data.ipad.childImageSharp.fixed}
            />
          </Grid>
        </Container>
      </Box>
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
    </>
  )
}

export default AddTrip
