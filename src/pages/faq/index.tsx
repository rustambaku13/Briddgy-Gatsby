import React from "react"
import Helmet from "react-helmet"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { NavigationContext } from "../../providers/navPage"
import NavbarDefault from "../../components/Navbar"
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/layout"
import {
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/input"
import Footer from "../../components/Footer"
import { SearchIcon } from "../../icons/Search"
import { IconButton } from "@chakra-ui/button"
import { graphql } from "gatsby"
import { FaqElement } from "../../components/Cards/Faq/FaqElement"
import { PopularFaq } from "../../components/Layout/PopularFaq"

const FaqPage = ({ data }) => {
  return (
    <>
      <Helmet title="Briddgy | Help Center" defer={false}>
        <meta
          name="description"
          content="Help Center and FAQ page. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money."
        />
      </Helmet>
      <NavigationContext.Provider value={{ page: "faq" }}>
        <NavbarDefault />
        <BottomNavbar />
      </NavigationContext.Provider>

      <Container as="section" bg="outline.light" py={[16, "100px"]} maxW="full">
        <Container maxW="container.xxl">
          <Heading mb={10} fontWeight="700" fontSize="hb4">
            How can we help?
          </Heading>
          {/* <Box maxW="640px">
            <InputGroup
              borderWidth="1px"
              borderRadius="base"
              overflow="hidden"
              size="lg"
              variant="filled"
            >
              <Input
                bg="white"
                borderRadius="base"
                placeholder="Seach your questions"
              />
              <InputRightElement bg="tealBlue.base" color="white">
                <IconButton
                  variant="unstyled"
                  aria-label="search"
                  bg="tealBlue.base"
                  icon={<SearchIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </Box> */}
        </Container>
      </Container>
      <Box bg="white" as="section" w="full" py={16}>
        <SimpleGrid
          spacingX={8}
          spacingY={12}
          p={3}
          columns={[1, 2, 3, 4]}
          maxW="container.xxl"
          flexWrap="wrap"
          mx="auto"
        >
          <FaqElement
            img={data.rocket}
            topic="get_started"
            title="Get Started"
          />
          <FaqElement
            img={data.orderers}
            topic="orderer"
            title="For Travelers"
          />
          <FaqElement
            img={data.travelers}
            topic="traveler"
            title="For Orderers"
          />
          <FaqElement img={data.payment} topic="payment" title="Payment" />
        </SimpleGrid>
      </Box>
      <Divider my={[12]} />
      <Box pt={10} pb={[20, 20, "150px"]} w="100%" as="section">
        <Container h="100%" maxW="container.lg">
          <Heading mb={10} fontSize="hb3" fontWeight="700" textAlign="center">
            Popular
          </Heading>
          <PopularFaq />
        </Container>
      </Box>
      <Footer />
    </>
  )
}
export const query = graphql`
  query {
    rocket: file(relativePath: { eq: "faq/rocket_faq.png" }) {
      childImageSharp {
        fixed(height: 100, cropFocus: CENTER) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    home: file(relativePath: { eq: "faq/home_faq.png" }) {
      childImageSharp {
        fixed(height: 100, cropFocus: CENTER) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    travelers: file(relativePath: { eq: "faq/travelers_faq.png" }) {
      childImageSharp {
        fixed(height: 100, cropFocus: CENTER) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    orderers: file(relativePath: { eq: "faq/orderers_faq.png" }) {
      childImageSharp {
        fixed(height: 100, cropFocus: CENTER) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    payment: file(relativePath: { eq: "faq/payment_faq.png" }) {
      childImageSharp {
        fixed(height: 100, cropFocus: CENTER) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    tips: file(relativePath: { eq: "faq/tips_faq.png" }) {
      childImageSharp {
        fixed(height: 100, cropFocus: CENTER) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default FaqPage
