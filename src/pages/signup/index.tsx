import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"
import { PageProps } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import { flowResult } from "mobx"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import NavbarDefault from "../../components/Navbar"
import { useAuthHook } from "../../hooks/useAuthHook"
import { useDidUpdateEffect } from "../../hooks/useDidUpdateEffect"
import GoogleIcon from "../../icons/Google"
import UserStore from "../../store/UserStore"
import { Helmet } from "react-helmet"
import { NavigationContext } from "../../providers/navPage"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
const SignUp = ({ data }: PageProps) => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
    getValues,
    watch,
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  useAuthHook(user => user == true, "/trips")
  const checked = watch("terms")
  const formSubmit = e => {
    // UserStore.
    setLoading(true)
    flowResult(UserStore.sign_up(e))
      .then(e => {})
      .catch(e => {
        setError("email", { message: "This Email is already in Use" })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useDidUpdateEffect(() => {
    if (modalOpen == false) {
      // The Email Modal was closed Continue Onboarding
      setLoading(true)
      const { email, password } = getValues()
      flowResult(UserStore.login(email, password))
        .then(e => {
          // Successfully Logged In
        })
        .catch(e => {})
        .finally(() => {
          setLoading(false)
        })
    }
  }, [modalOpen])
  return (
    <>
      <Helmet title="Briddgy | Create account" defer={false}>
        <meta
          name="description"
          content="Create account in Briddgy. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money."
        />
      </Helmet>
      <NavigationContext.Provider value={{ page: "signup" }}>
        <NavbarDefault />
        <BottomNavbar />
      </NavigationContext.Provider>
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
          d="flex"
          borderRadius="lg"
          borderColor="gray.200"
          borderWidth="1px"
        >
          <Box bg="blue.300" d={["none", "none", "block"]} flex="1"></Box>
          <Box px={5} py={10} minW="400px" flex="1">
            <Text variant="secondary" textAlign="right">
              Already have an account?{" "}
              <Text as="span" color="blue.400" fontWeight="600">
                <Link to="/login">Login</Link>
              </Text>
            </Text>
            <Heading as="h1" fontSize="3xl" my={8}>
              Create account
            </Heading>
            <SimpleGrid
              spacing={{ sm: "0 10px", md: "0 50px" }}
              columns={2}
              as="form"
              onSubmit={handleSubmit(formSubmit)}
            >
              <FormControl gridColumn={["span 2", "span 1"]} mb={7}>
                <FormLabel>Name</FormLabel>
                <Input
                  size="md"
                  placeholder="Your Name"
                  type="text"
                  name="first_name"
                  ref={register({ required: "First Name is required" })}
                />
                <Text color="red.400" as="small">
                  {errors.first_name?.message}
                </Text>
              </FormControl>
              <FormControl gridColumn={["span 2", "span 1"]} mb={7}>
                <FormLabel>Surname</FormLabel>
                <Input
                  ref={register({ required: "Last Name is required" })}
                  placeholder="Your Surname"
                  type="text"
                  name="last_name"
                />
                <Text color="red.400" as="small">
                  {errors.last_name?.message}
                </Text>
              </FormControl>
              <FormControl gridColumn="span 2" mb={7}>
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="someone@email.com"
                  type="email"
                  name="email"
                  ref={register({ required: "Email is Required" })}
                />
                <Text color="red.400" as="small">
                  {errors.email?.message}
                </Text>
              </FormControl>
              <FormControl gridColumn="span 2" mb={7}>
                <FormLabel>Password</FormLabel>
                <Input
                  ref={register({
                    required: "Password is Required",
                    minLength: {
                      value: 6,
                      message: "Password should contain at least 6 characters",
                    },
                  })}
                  placeholder="******"
                  type="password"
                  name="password"
                />
                <Text color="red.400" as="small">
                  {errors.password?.message}
                </Text>
              </FormControl>
              <FormControl gridColumn="span 2" mb={7}>
                <Checkbox
                  mt="3px"
                  display="inline-flex"
                  ref={register()}
                  name="terms"
                  mr="2"
                />
                <FormLabel display="inline-flex">
                  I have read and accepted the &nbsp;
                  <Text as="span" color="blue.500">
                    Terms & Conditions
                  </Text>
                </FormLabel>
              </FormControl>
              <Button
                size="lg"
                isLoading={loading}
                disabled={!checked}
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
    </>
  )
}
export default SignUp
