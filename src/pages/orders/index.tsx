import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Img as CImg,
  LinkBox,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"
import { graphql } from "gatsby"
import { Link, navigate } from "gatsby-plugin-intl"
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
import { Helmet } from "react-helmet"
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
      <Helmet title="Briddgy | Available Orders" defer={false}>
        <meta
          name="description"
          content="List orders that are to be delivered. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money."
        />
      </Helmet>
      <NavbarDefault />
      <Container pt="40px" as="section" minW="full">
        <Box
          onSubmit={handleSubmit(onSubmit)}
          as="form"
          maxW="container.xl"
          mx="auto"
        >
          <Flex
            flexWrap={["wrap", "wrap", "nowrap"]}
            mb="40px"
            alignItems="center"
          >
            <Flex
              mb={5}
              w="100%"
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
            <IconButton
              variant="link"
              mx={["auto", "auto", 5]}
              mb={5}
              aria-label="Swap Button"
              icon={
                <RotateIcon
                  transform={["rotate(90deg)", "rotate(90deg)", "none"]}
                />
              }
            />
            <Flex
              mb={5}
              w="100%"
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
            <Button
              mb={5}
              ml={[0, 0, 5]}
              w={["100%", "100%", "auto"]}
              h="60px"
              type="submit"
              size="lg"
              variant="primary_gradient"
            >
              Find Trips
            </Button>
          </Flex>
        </Box>
      </Container>
      <Container minH="400px" pt="40px" as="section" maxW="full" bg="gray.100">
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
        {loading ? null : results.results.length ? (
          <SimpleGrid
            maxW="container.xl"
            mx="auto"
            py={9}
            spacing={10}
            columns={[1, 1, 1, 2]}
          >
            {results.results.map((order: Order) => (
              <PublicOrderCard my={[3, 3, 10]} mx="auto" orderData={order} />
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

      <Box
        mb={[20, 20, "150px"]}
        bg="purple.300"
        h="320px"
        overflow="hidden"
        as="section"
      >
        {/* <Img fixed={data.nature_travel.childImageSharp.fixed} /> */}
      </Box>
      <Container mb={[20, 20, "150px"]} maxW="full" as="section">
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
      <Container my="80px" pt={8} maxW="full" as="section">
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
