import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  useToast,
} from "@chakra-ui/react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import { flowResult } from "mobx"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { askForEmailCode } from "../../api/user"
import LayoutStore from "../../store/LayoutStore"
import UserStore from "../../store/UserStore"
export const ConfirmEmailModal = observer(() => {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    errors,
    setError,
  } = useForm()
  const [value, setValue] = useState()
  const toast = useToast()
  const isOpen = LayoutStore.emailConfirmModalVisible
  const [loading, setLoading] = useState(false)
  const resendCode = () => {
    askForEmailCode().then(() => {
      toast({
        title: "New Email has beed sent",
        description: "Confirm your email with newly sent code",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    })
  }
  const submit = ({ key }) => {
    setLoading(true)
    flowResult(UserStore.verifyEmail(key))
      .then(() => {
        LayoutStore.emailModalFormCallback()
        LayoutStore.emailConfirmModalClose()
        toast({
          title: "Email was confirmed",
          description: "Confirm your phone number and shop online",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      })
      .catch(() => {
        setError("key", { message: "Please enter a correct code" })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <StaticQuery
      query={graphql`
        query {
          email_confirm: file(relativePath: { eq: "email_confirm.png" }) {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
    >
      {({ email_confirm }) => {
        return (
          <Modal
            isOpen={isOpen}
            onClose={() => {
              LayoutStore.emailConfirmModalClose()
            }}
          >
            <ModalOverlay />
            <ModalContent maxW="600px" borderRadius="xl">
              <ModalCloseButton />
              <ModalBody>
                <Box w="80%" mx="auto" mb="8">
                  <Img
                    alt="Confirm Email"
                    fluid={email_confirm.childImageSharp.fluid}
                  />
                </Box>
                <Heading
                  color="tealBlue.base"
                  mb="5"
                  fontSize="3xl"
                  textAlign="center"
                >
                  Confirm your email!
                </Heading>
                <Text
                  mb="5"
                  textAlign="center"
                  fontSize="md"
                  variant="secondary"
                >
                  To confirm your request please confirm check your email for
                  validation request!
                </Text>
                <Box w="100%" onSubmit={handleSubmit(submit)} as="form">
                  <input
                    type="hidden"
                    value={value}
                    name="key"
                    ref={register({
                      required: "Please enter the 4-digit code",
                      maxLength: {
                        value: 4,
                        message: "The code should contain 4 digits",
                      },
                      minLength: {
                        value: 4,
                        message: "The code should contain 4 digits",
                      },
                    })}
                  />
                  <Box mx="auto">
                    <HStack justifyContent="center">
                      <PinInput
                        value={value}
                        onChange={setValue}
                        isInvalid={errors.code}
                        size="lg"
                      >
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                  </Box>
                  <Box w="100%" mt={3}>
                    {" "}
                    <Text textAlign="center" color="red.400">
                      {errors.key?.message}
                    </Text>
                  </Box>

                  <Box w="100%" maxW="300px" mt={3} mx="auto">
                    <Button
                      isLoading={loading}
                      type="submit"
                      w="100%"
                      variant="primary"
                    >
                      Verify my Email
                    </Button>
                    <Text my={3} variant="secondary">
                      Didn't receive an email{" "}
                      <Button
                        onClick={resendCode}
                        variant="link"
                        color="blue.500"
                      >
                        Resend Code
                      </Button>
                    </Text>
                  </Box>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        )
      }}
    </StaticQuery>
  )
})
