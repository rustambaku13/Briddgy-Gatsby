import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  Button,
  Center,
  Textarea,
  Heading,
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/bootstrap.css"

import Img from "gatsby-image"
import { graphql, StaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import { IncrementalNumberSelector } from "../Inputs/IncrementalNumberSelector"
import { observer } from "mobx-react-lite"
import LayoutStore from "../../store/LayoutStore"
import anime from "animejs/lib/anime.es.js"
import { FriendsInvite } from "../Animations/VerifyPhone"
import { PREFERRED_COUNTRIES } from "../../api"
import { useForm } from "react-hook-form"
import { askForPhoneCode, verifyPhoneNumber } from "../../api/user"
import { flowResult } from "mobx"
import UserStore from "../../store/UserStore"

let phone_number = null

const EnterPhonePage = ({ callback }) => {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    errors,
    setError,
  } = useForm()
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    anime({
      targets: ["#verify_image"],
      translateX: [100, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(100),
      easing: "spring(1, 80, 10, 0)",
    })
  }, [])

  const submit = () => {
    setLoading(true)
    askForPhoneCode("+" + value)
      .then(() => {
        // Change state
        callback()
        phone_number = "+" + value
      })
      .catch(e => {
        console.log()
        setError("phone", {
          message:
            e.response.data?.detail || "Please double check your phone number",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <>
      <Box w="80%" mx="auto" mb="8">
        <Heading color="blue.400" mb="5" fontSize="3xl" textAlign="center">
          Confirm your phone number!
        </Heading>
        <Box maxW="300px" w="100%" mx="auto">
          <FriendsInvite />
        </Box>
      </Box>
      <Text my={5} textAlign="center">
        You'll receive a 4 digit code to verify next
      </Text>
      <Flex onSubmit={handleSubmit(submit)} flexWrap="wrap" as="form" w="100%">
        <Box d="inline-block" mx="auto">
          <Box mr={3} maxW="300px" d="inline-block">
            <input
              type="hidden"
              value={value}
              name="phone"
              ref={register({ required: "Please enter your phone number" })}
            />
            <PhoneInput
              preferredCountries={PREFERRED_COUNTRIES}
              country={"us"}
              value={value}
              onChange={setValue}
            />
          </Box>
          <Button isLoading={loading} type="submit" h="63px" variant="primary">
            Continue
          </Button>
        </Box>
        <Box w="100%" mt={3}>
          {" "}
          <Text textAlign="center" color="red.400">
            {errors.phone?.message}
          </Text>
        </Box>
      </Flex>
    </>
  )
}

const EnterCodePage = ({ callback }) => {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    errors,
    setError,
  } = useForm()
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(false)

  const submit = ({ code }) => {
    setLoading(true)
    flowResult(UserStore.verifyPhoneNumber(code, phone_number))
      .then(() => {
        callback()
      })
      .catch(() => {
        setError("code", { message: "Please enter a correct code" })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <>
      <Box w="80%" mx="auto" mb="8">
        <Heading color="blue.400" mb="5" fontSize="3xl" textAlign="center">
          Enter the last 4 digits
        </Heading>
      </Box>
      <Text my={5} textAlign="center">
        Please enter the last 4 digit of the number calling you
      </Text>
      <Flex onSubmit={handleSubmit(submit)} flexWrap="wrap" as="form" w="100%">
        <input
          type="hidden"
          value={value}
          name="code"
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
          <HStack>
            <PinInput
              value={value}
              onChange={setValue}
              placeholder="👀"
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
            {errors.code?.message}
          </Text>
        </Box>
        <Box w="100%" maxW="300px" mt={3} mx="auto">
          <Button isLoading={loading} type="submit" w="100%" variant="primary">
            Verify my phone
          </Button>
        </Box>
      </Flex>
    </>
  )
}

export const PhoneNumberVerifyModal = observer(() => {
  let isOpen = LayoutStore.phoneConfirmModalVisible
  const [openTab, setOpenTab] = useState(1)
  useEffect(() => {
    setOpenTab(0)
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        LayoutStore.togglePhoneConfirmModal()
      }}
    >
      <ModalOverlay />
      <ModalContent maxW="600px" borderRadius="xl">
        <ModalCloseButton />
        <ModalBody>
          <Tabs index={openTab} variant="line" colorScheme="blue">
            <TabPanels>
              <TabPanel pt="40px">
                <EnterPhonePage
                  callback={() => {
                    setOpenTab(1)
                  }}
                />
              </TabPanel>
              <TabPanel>
                <EnterCodePage
                  callback={() => {
                    LayoutStore.togglePhoneConfirmModal()
                  }}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})
