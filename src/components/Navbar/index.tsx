import { Box, Container, Text, Heading, Flex, Button } from "@chakra-ui/react"
import { Link } from "gatsby-plugin-intl"
import React from "react"

export default () => {
  return (
    <Flex
      as="nav"
      p={3}
      alignItems="center"
      w="100%"
      h="55px"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
    >
      <Text display="inline-block" mr={10} fontSize="2xl" as="h1">
        Briddgy
      </Text>
      <Text mr={7} display="inline-block">
        <Link to="/trips">Trips</Link>
      </Text>
      <Text mr={7} display="inline-block">
        <Link to="/orders">Orders</Link>
      </Text>

      <Text ml="auto" mr={7} display="inline-block">
        <Link to="/login">Login</Link>
      </Text>
      <Text display="inline-block" mr={7}>
        <Link to="/signup">Sign Up</Link>
      </Text>
      <Text display="inline-block" mr={7}>
        <Link to="/travel">Travel & Earn</Link>
      </Text>
      <Button variant="primary_gradient" color="white">
        <Link to="/order">Create Order</Link>
      </Button>
    </Flex>
  )
}
