import {
  Box,
  Center,
  Container,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react"
import { PageProps } from "gatsby"
import React from "react"
const Login = ({ data }: PageProps) => {
  return (
    <Center
      alignItems="flex-start"
      pt="100px"
      as="section"
      w="100%"
      minH="calc(100vh - 52px)"
    >
      <Container
        maxW="container.sm"
        w="100%"
        px={8}
        py={14}
        boxShadow="md"
        borderRadius="lg"
        borderColor="gray.200"
        borderWidth="1px"
      >
        <Heading mb={6} textAlign="center" as="h1">
          Welcome
        </Heading>
        <form>
          <FormControl w="100%" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              size="md"
              placeholder="someone@email.com"
              type="email"
              name="email"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input placeholder="***" type="password" name="password" />
          </FormControl>
          <Button fontWeight="600" w="100%" type="submit" variant="primary">
            Login
          </Button>
        </form>
      </Container>
    </Center>
  )
}
export default Login
