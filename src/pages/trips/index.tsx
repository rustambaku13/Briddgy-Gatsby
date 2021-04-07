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
  VStack,
} from "@chakra-ui/react"
import { Link, navigate } from "gatsby-plugin-intl"
import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useForm } from "react-hook-form"
import { getTrips } from "../../api/trip"
import { TestimonialLinkCard } from "../../components/Cards/Testimonial/TestimonialLinkCard"
import { PublicMediumTripCard } from "../../components/Cards/Trip/MediumTripCards"
import Footer from "../../components/Footer"
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
import { defaultTrips, Trip, Trips } from "../../types/trip"
import { filterObject } from "../../utils/misc"
import { HowToEarnMoney } from "../../components/Layout/HowToEarnMoney"

const TripsPage = ({ data, location }) => {
  const { register, handleSubmit, setValue } = useForm()
  const [results, setResults]: [Trips, any] = useState(defaultTrips)
  const [loading, setLoading] = useState(true)
  const updateFilters = () => {
    const a = new URLSearchParams(location.search)
    const b = {}
    for (const [key, value] of a.entries()) {
      if (!value) continue
      setValue(key, value)

      b[key] = value
    }
    getTrips(b)
      .then(({ data }) => {
        setResults(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(updateFilters, [location])
  const onSubmit = data => {
    const filteredData = filterObject(data)
    const searchParams = new URLSearchParams(filteredData)
    navigate(`.?${searchParams.toString()}`)
  }
  return (
    <>
      <Helmet title="Briddgy | Available Travelers" defer={false}>
        <meta
          name="description"
          content="List available travelers who are ready to deliver. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money."
        />
      </Helmet>
      <NavbarDefault />
      <Container pt="40px" as="section" minW="full">
        <Box
          onSubmit={handleSubmit(onSubmit)}
          as="form"
          maxW="container.lg"
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
              bg="outline.light"
              alignItems="center"
              px={3}
              borderRadius="md"
              h="60px"
            >
              <Text color="text.medium" as="label">
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
              bg="outline.light"
              alignItems="center"
              px={3}
              borderRadius="md"
              h="60px"
            >
              <Text as="label" color="text.medium">
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
              variant="primary"
            >
              Find Trips
            </Button>
          </Flex>
        </Box>
      </Container>
      <Container minH="400px" pt="40px" as="section" maxW="full" bg="gray.100">
        <Flex mx="auto" maxW="container.md" justifyContent="space-between">
          <Text variant="secondary">{results.count} TRIPS</Text>
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
          <VStack maxW="container.md" w="100%" mx="auto" py={9} spacing={10}>
            {results.results.map((trip: Trip) => (
              <PublicMediumTripCard mx="auto" trip={trip} />
            ))}
          </VStack>
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

      <HowToEarnMoney />
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

      <Footer />
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
export default TripsPage
