import {
  Box,
  Center,
  Container,
  Button,
  FormControl,
  Text,
  FormLabel,
  Link as ALink,
  Heading,
  Input,
  Flex,
  SimpleGrid,
  Checkbox,
  Divider,
} from "@chakra-ui/react"
import { Link } from "gatsby-plugin-intl"
import React from "react"
import { PageProps } from "gatsby"
import GoogleIcon from "../../icons/Google"
const SignUp = ({ data }: PageProps) => {
  return (
    <Center
      alignItems="flex-start"
      pt="100px"
      as="section"
      w="100%"
      minH="calc(100vh - 52px)"
    >
      <Box
        w="100%"
        maxW="container.xl"
        boxShadow="md"
        d="flex"
        borderRadius="lg"
        borderColor="gray.200"
        borderWidth="1px"
      >
        <Box bg="blue.300" flex="1"></Box>
        <Box px={10} py={8} minW="400px" flex="1">
          <Text variant="secondary" textAlign="right">
            Already have an account?{" "}
            <Text as="span" color="blue.400" fontWeight="600">
              <Link to="/login">Login</Link>
            </Text>
          </Text>
          <Heading fontSize="3xl" my={8}>
            Create account
          </Heading>
          <SimpleGrid
            spacing={{ sm: "0 20px", md: "0 50px" }}
            columns={2}
            as="form"
          >
            <FormControl mb={7}>
              <FormLabel>Name</FormLabel>
              <Input
                size="md"
                placeholder="Your Name"
                type="text"
                name="first_name"
              />
            </FormControl>
            <FormControl mb={7}>
              <FormLabel>Surname</FormLabel>
              <Input placeholder="Your Surname" type="text" name="last_name" />
            </FormControl>
            <FormControl gridColumn="span 2" mb={7}>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="someone@email.com"
                type="email"
                name="email"
              />
            </FormControl>
            <FormControl gridColumn="span 2" mb={7}>
              <FormLabel>Password</FormLabel>
              <Input placeholder="***" type="password" name="password" />
            </FormControl>
            <Flex alignItems="center" gridColumn="span 2" mb={7}>
              <Checkbox mr="2" />
              <Text variant="secondary">
                I have read and accepted the{" "}
                <Text as="span" color="blue.500">
                  Terms & Conditions
                </Text>
              </Text>
            </Flex>
            <Button
              size="lg"
              gridColumn="span 2"
              fontWeight="600"
              w="100%"
              type="submit"
              variant="primary"
            >
              Create Account
            </Button>
            <Divider gridColumn="span 2" my={7} orientation="horizontal" />
            <Button
              size="lg"
              gridColumn="span 2"
              fontWeight="600"
              leftIcon={<GoogleIcon fontSize="2xl" />}
              w="100%"
              type="submit"
              borderRadius="3xl"
              variant="outline"
            >
              Continue with Google
            </Button>
          </SimpleGrid>
        </Box>
      </Box>
    </Center>
  )
}
export default SignUp
