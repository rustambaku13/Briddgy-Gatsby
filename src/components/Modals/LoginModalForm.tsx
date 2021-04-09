import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Box } from "@chakra-ui/layout"
import { Button, Text } from "@chakra-ui/react"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import { flowResult } from "mobx"
import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import UserStore from "../../store/UserStore"
import { Link } from "gatsby-plugin-intl"
import { observer } from "mobx-react-lite"
import LayoutStore from "../../store/LayoutStore"

export const LoginModalForm = observer(({}: {}) => {
  const { register, handleSubmit, errors } = useForm()
  const [loading, setLoading] = useState(false)
  const error_text = useRef(null)
  const onSubmit = data => {
    setLoading(true)
    flowResult(UserStore.login(data.email, data.password))
      .then(e => {
        // Successfully Logged In
        LayoutStore?.loginModalFormCallback() //optional chaining
        LayoutStore.loginModalFormClose()
      })
      .catch(e => {
        error_text.current.innerHTML = "Invalid Credentials"
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Modal
      isOpen={LayoutStore.loginModalFormVisible} //true
      onClose={() => {
        LayoutStore.loginModalFormClose()
      }}
    >
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader fontSize="3xl" textAlign="center">
          Login
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box onSubmit={handleSubmit(onSubmit)} as="form">
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
              mb={5}
              isLoading={loading}
              fontWeight="600"
              w="100%"
              type="submit"
              variant="primary"
            >
              Login
            </Button>
            <Text mb={5} variant="secondary">
              Don't have an account{" "}
              <Link to="/signup">
                <Text as="span" color="blue.400">
                  Sign Up
                </Text>
              </Link>
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})
