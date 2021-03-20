import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Img as CImg,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"
import { graphql } from "gatsby"
import { navigate } from "gatsby-plugin-intl"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { getOrders } from "../../api/order"
import PublicOrderCard from "../../components/Cards/Order/PublicOrderCard"
import { TestimonialLinkCard } from "../../components/Cards/Testimonial/TestimonialLinkCard"
import { LocationAutoComplete } from "../../components/Inputs/LocationAutoComplete"
import { Empty } from "../../components/Misc/Empty"
import { Loader } from "../../components/Misc/Loader"
import { StepCircle } from "../../components/Misc/StepCircle"
import NavbarDefault from "../../components/Navbar"
import { ChevronDownIcon } from "../../icons/ChevronDown"
import RotateIcon from "../../icons/Rotate"
import card from "../../images/debit-cardicon.svg"
import earth from "../../images/earthicon.svg"
import note from "../../images/noteicon.svg"
import plane from "../../images/planeicon.svg"
import { defaultOrders, Order, Orders } from "../../types/orders"
import { filterObject } from "../../utils/misc"

const OrdersPage = ({ data, location }) => {
  const { register, handleSubmit, setValue } = useForm()

  const [results, setResults]: [Orders, any] = useState(defaultOrders)
  const [loading, setLoading] = useState(true)
  const updateFilters = () => {
    // Function to refetch new page based on current form value
    setLoading(true)
    const a = new URLSearchParams(location.search)
    const b = {}
    for (const [key, value] of a.entries()) {
      if (!value) continue
      setValue(key, value)
      b[key] = value
    }
    getOrders(b)
      .then(({ data }) => {
        setResults(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(updateFilters, [location.search])
  const onSubmit = data => {
    const filteredData = filterObject(data)
    const searchParams = new URLSearchParams(filteredData)
    navigate(`.?${searchParams.toString()}`)
  }

  return (
    <>
      <NavbarDefault />
      <Container pt="40px" as="section" minW="full">
        <Box
          action="#"
          onSubmit={handleSubmit(onSubmit)}
          as="form"
          maxW="container.xl"
          mx="auto"
        >
          <Flex mb="40px" alignItems="center" h="60px">
            <Flex
              mr={5}
              flex="1"
              bg="gray.100"
              alignItems="center"
              px={3}
              borderRadius="md"
              h="60px"
            >
              <Text as="label" fontSize="xl">
                From
              </Text>
              <LocationAutoComplete
                name="origin"
                placeholder="City or Country"
                fontSize="md"
                parentRef={register()}
              />
            </Flex>
            <RotateIcon mr={5} />
            <Flex
              mr={5}
              flex="1"
              bg="gray.100"
              alignItems="center"
              px={3}
              borderRadius="md"
              h="60px"
            >
              <Text as="label" fontSize="xl">
                To
              </Text>
              <LocationAutoComplete
                name="dest"
                placeholder="City or Country"
                fontSize="md"
                parentRef={register()}
              />
            </Flex>
            <Button type="submit" h="100%" size="lg" variant="primary_gradient">
              Find Trips
            </Button>
          </Flex>
        </Box>
      </Container>
      <Container pt="40px" as="section" maxW="full" bg="gray.100">
        <Flex mx="auto" maxW="container.xl" justifyContent="space-between">
          <Text variant="secondary">{results.count} ORDERS</Text>
          <Box>
            <Menu>
              <MenuButton type="button" mr={3} color="blue.400">
                Sort By <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuOptionGroup
                  onChange={value => {
                    setValue("sort_by", value)

                    handleSubmit(onSubmit)()
                  }}
                  type="radio"
                >
                  <MenuItemOption value="asc">Earliest Date</MenuItemOption>
                  <MenuItemOption value="desc">Highest Weight</MenuItemOption>
                  <MenuItemOption value="ranking">User Ranking</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
              <input
                type="hidden"
                name="sort_by"
                ref={register({ required: false })}
              />
            </Menu>

            <Menu>
              <MenuButton color="blue.400">
                Filters <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuOptionGroup defaultValue="asc" type="radio">
                  <MenuItemOption value="asc">Earliest Date</MenuItemOption>
                  <MenuItemOption value="desc">Highest Weight</MenuItemOption>
                  <MenuItemOption>User Ranking</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Container>
      <Container
        as="section"
        py="50px"
        bg="gray.100"
        minH="400px"
        pt={"1px"}
        maxW="full"
      >
        {loading ? null : results.results.length ? (
          <SimpleGrid maxW="container.xl" mx="auto" spacing={5} columns={2}>
            {results.results.map((order: Order) => (
              <PublicOrderCard mx="auto" orderData={order} />
            ))}
          </SimpleGrid>
        ) : (
          <Empty mb="50px" />
        )}
        {loading ? <Loader mx="auto" /> : null}
        {loading == false && results.next != null ? (
          <Box w="200px" mx="auto">
            <Button variant="outline" bg="white" w="200px">
              Load More
            </Button>
          </Box>
        ) : null}
      </Container>
      <Box bg="purple.300" h="320px" overflow="hidden" as="section">
        {/* <Img fixed={data.nature_travel.childImageSharp.fixed} /> */}
      </Box>
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
    </>
  )
}

export const query = graphql`
  query {
    nature_travel: file(relativePath: { eq: "nature_travel.png" }) {
      childImageSharp {
        fixed(fit: COVER) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
export default OrdersPage
