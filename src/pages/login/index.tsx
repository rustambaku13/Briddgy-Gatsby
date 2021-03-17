import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react"
import { PageProps } from "gatsby"
import { flowResult } from "mobx"
import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useAuthHook } from "../../hooks/useAuthHook"
import UserStore from "../../store/UserStore"
const Login = ({ data }: PageProps) => {
  const [loading, setLoading] = useState(false)
  const error_text = useRef(null)
  const { register, handleSubmit, errors } = useForm()
  useAuthHook(user => user == true, "/trips")
  const onSubmit = data => {
    setLoading(true)
    flowResult(UserStore.login(data.email, data.password))
      .then(e => {
        // Successfully Logged In
      })
      .catch(e => {
        error_text.current.innerHTML = "Invalid Credentials"
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
              ref={register({ required: "Email is Required" })}
              size="md"
              placeholder="someone@email.com"
              type="email"
              name="email"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              ref={register({
                required: "Password is Required",
                minLength: {
                  value: 6,
                  message: "Password should contain at least 6 characters",
                },
              })}
              placeholder="***"
              type="password"
              name="password"
            />
            <Text color="red.400" as="small">
              {errors.password?.message}
            </Text>
          </FormControl>
          <Text ref={error_text} color="red.400" as="small"></Text>
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
