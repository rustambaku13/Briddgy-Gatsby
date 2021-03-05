import {
  Box,
  Center,
  Text,
  Container,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  FormErrorMessage,
  FormErrorIcon,
} from "@chakra-ui/react"
import { PageProps } from "gatsby"
import { flowResult } from "mobx"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import UserStore from "../../store/UserStore"
const Login = ({ data }: PageProps) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, errors, setError } = useForm()
  const onSubmit = data => {
    setLoading(true)
    flowResult(UserStore.login(data.email, data.password))
      .then(e => {
        console.log(e)
      })
      .catch(e => {
        setError("global", { message: "Invalid Credentials" })
      })
      .finally(() => {
        setLoading(false)
      })
  }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl w="100%" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              ref={register({ required: true })}
              size="md"
              placeholder="someone@email.com"
              type="email"
              name="email"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              ref={register({ required: true, minLength: 6 })}
              placeholder="***"
              type="password"
              name="password"
            />
            <Text color="red.400" as="small">
              {errors.password == null
                ? null
                : "Password should contain at least 6 characters"}
            </Text>
          </FormControl>
          <Text color="red.400" as="small">
            {errors.global?.message}
          </Text>
          <Button
            isLoading={loading}
            fontWeight="600"
            w="100%"
            type="submit"
            variant="primary"
          >
            Login
          </Button>
        </form>
      </Container>
    </Center>
  )
}
export default Login
