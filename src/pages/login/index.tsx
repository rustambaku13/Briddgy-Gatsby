import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react"
import { PageProps } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import { flowResult } from "mobx"
import React, { useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { useForm } from "react-hook-form"
import { useAuthHook } from "../../hooks/useAuthHook"
import logo from "../../images/icon_opaque.png"
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
    <>
      <Helmet title="Briddgy | Login" defer={false}>
        <meta
          name="description"
          content="Login to Briddgy. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money."
        />
      </Helmet>
      <Center
        alignItems="flex-start"
        pt="50px"
        as="section"
        w="100%"
        minH="calc(100vh - 52px)"
      >
        <Container maxW="container.sm" w="100%">
          <Center mb={7}>
            <Link to="/">
              <Image alt="Logo" w="100px" src={logo} />
            </Link>
          </Center>
          <Container maxW="container.sm">
            <Heading mb={6} textAlign="center" fontSize="4xl" as="h1">
              Welcome to Briddgy
            </Heading>
          </Container>
          <Box
            px={8}
            py={14}
            borderRadius="lg"
            borderColor="gray.200"
            borderWidth="1px"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl w="100%" mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                ref={register({ required: "Email is Required" })}
                size="md"
                placeholder="someone@email.com"
                type="email"
                name="email"
              />
              <Text color="red.400" as="small">
                {errors.email?.message}
              </Text>
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
          </Box>
          <Box
            px={3}
            mt={5}
            py={5}
            borderRadius="lg"
            borderColor="gray.200"
            borderWidth="1px"
          >
            <Text textAlign="center">
              New to Briddgy?{" "}
              <Link to="/signup">
                <Button color="blue.600" variant="link">
                  Create an account
                </Button>
              </Link>
            </Text>
          </Box>
        </Container>
      </Center>
    </>
  )
}

export default Login
