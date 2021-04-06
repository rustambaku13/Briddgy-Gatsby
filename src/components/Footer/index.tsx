import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Flex,
  HStack,
  Image,
} from "@chakra-ui/react"
import { Link } from "gatsby-plugin-intl"
import React from "react"
import logo from "../../images/icon_opaque.png"
import instagram from "../../images/instagram.svg"
import facebook from "../../images/facebook.svg"
import youtube from "../../images/youtube.svg"
const Footer = () => {
  return (
    <Box
      bg="blueAlpha.100"
      w="full"
      px={8}
      pt={16}
      pb={3}
      borderTopWidth="1px"
      as="footer"
    >
      <Flex
        mx="auto"
        maxW="container.xxl"
        flexDir={["column", "column", "row"]}
        w="full"
        pb={8}
      >
        <Box
          // pos="relative"
          // top="-15px"
          mb={12}
          mr={8}
          minW="150px"
          flex={1}
          maxW="800px"
        >
          <Flex alignItems="center" mb={3}>
            <Image mr={2} src={logo} h="55px" d="inline-block" />
            <Heading as="h2" fontSize="2xl" d="inline-block">
              Briddgy
            </Heading>
          </Flex>
          <Text fontWeight="300" variant="secondary">
            Your first postless delivery <br /> platform
          </Text>
        </Box>
        <SimpleGrid mb={5} flex={3} spacing={8} columns={[1, 2, 4]}>
          <Box>
            <Heading
              fontSize="xl"
              mb={5}
              flexShrink={1}
              fontWeight="600"
              as="h3"
            >
              Product
            </Heading>
            <Text fontWeight="300" mb={3}>
              <Link to="/">Home</Link>
            </Text>
            <Text fontWeight="300" mb={3}>
              <Link to="/login">Login</Link>
            </Text>
            <Text fontWeight="300" mb={3}>
              <Link to="/trips">Trips</Link>
            </Text>
            <Text fontWeight="300" mb={3}>
              <Link to="/orders">Orders</Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="xl" mb={5} fontWeight="600" as="h3">
              About Us
            </Heading>
            <Text fontWeight="300" mb={3}>
              <Link to="/">How it works?</Link>
            </Text>
            <Text fontWeight="300" mb={3}>
              <Link to="/">Blogs</Link>
            </Text>
            <Text fontWeight="300" mb={3}>
              <Link to="/">Collections</Link>
            </Text>
            <Text fontWeight="300" mb={3}>
              <Link to="/">Testimonials</Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="xl" mb={5} fontWeight="600" as="h3">
              Resources
            </Heading>
            <Text fontWeight="300" mb={3}>
              <Link to="/">Help Center</Link>
            </Text>
            <Text fontWeight="300" mb={3}>
              <Link to="/">Contact Us</Link>
            </Text>
            <Text fontWeight="300" mb={3}>
              <Link to="/">Terms & Conditions</Link>
            </Text>
            <Text fontWeight="300" mb={3}>
              <Link to="/">Privacy Policy</Link>
            </Text>
          </Box>
          <Flex flexDir="column">
            <Heading fontSize="xl" mb={5} fontWeight="600" as="h3">
              Get in touch
            </Heading>
            <Text fontWeight="300" mb={3}>
              Question or feedback <br />
              We'd love to hear from you :)
            </Text>
            <HStack
              mb={3}
              color="gray"
              mt="auto"
              spacing={4}
              verticalAlign="bottom"
            >
              <Link to="https://www.facebook.com/briddgyworld">
                <Image width="28px" src={facebook} />
              </Link>
              <Link to="https://www.instagram.com/briddgyworld/">
                <Image width="28px" src={instagram} />
              </Link>
              <Link to="#">
                <Image width="28px" src={youtube} />
              </Link>
            </HStack>
          </Flex>
        </SimpleGrid>
      </Flex>
      <Box maxW="container.xxl" mx="auto" w="100%">
        <Text variant="secondary" mt="auto" fontSize="md" as="small">
          @2021 Briddgy LLC
        </Text>
      </Box>
    </Box>
  )
}
export default Footer
