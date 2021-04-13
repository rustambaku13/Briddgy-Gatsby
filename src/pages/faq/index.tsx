import React from "react"
import Helmet from "react-helmet"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { NavigationContext } from "../../providers/navPage"
import NavbarDefault from "../../components/Navbar"
import {
  Box,
  Container,
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
import { SearchIcon } from "../../icons/Search"
import { IconButton } from "@chakra-ui/button"
import { graphql } from "gatsby"
import { FaqElement } from "../../components/Cards/Faq/FaqElement"

const FaqPage = ({ data }) => {
  return (
    <>
      <Helmet title="Briddgy | Help Center" defer={false}>
        <meta
          name="description"
          content="Help Center and FAQ page. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money."
        />
      </Helmet>
      <NavigationContext.Provider value={{ page: "orders" }}>
        <NavbarDefault />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Container as="section" bg="tealBlue.base" py={16} maxW="full">
        <Heading
          color="white"
          mb={6}
          textAlign="center"
          fontWeight="700"
          fontSize="hb4"
        >
          Hi! How can we help you
        </Heading>
        <Box maxW="640px" mx="auto">
          <InputGroup
            borderWidth="1px"
            borderRadius="base"
            overflow="hidden"
            size="lg"
            variant="filled"
          >
            <Input borderRadius="base" placeholder="Seach your questions" />
            <InputRightElement bg="tealBlue.base" color="white">
              <IconButton
                variant="unstyled"
                aria-label="search"
                bg="tealBlue.base"
                icon={<SearchIcon />}
              />
            </InputRightElement>
            {/* <InputRightAddon right={} /> */}
          </InputGroup>
        </Box>
      </Container>
      <SimpleGrid
        mb={[20, 20, "150px"]}
        spacing={5}
        p={3}
        columns={[1, 2, 3, 6]}
        py={16}
        maxW="container.xxl"
        flexWrap="wrap"
        mx="auto"
        as="section"
      >
        <FaqElement
          to="/faq/get_started"
          text="Get Started"
          img={data.rocket}
        />
        <FaqElement to="/faq/general" text="General" img={data.home} />
        <FaqElement
          to="/faq/travelers"
          text="For Travelers"
          img={data.travelers}
        />
        <FaqElement
          to="/faq/orderers"
          text="For Orderers"
          img={data.orderers}
        />
        <FaqElement to="/faq/payment" text="Payment" img={data.payment} />
        <FaqElement to="/faq/tips" text="Tips" img={data.tips} />
      </SimpleGrid>
      <Box w="100%" as="section">
        <Container h="100%" maxW="container.xl">
          <Heading mb={10} fontSize="hb3" fontWeight="700" textAlign="center">
            Popular
          </Heading>
        </Container>
      </Box>
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
