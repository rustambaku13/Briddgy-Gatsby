import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Center,
  Textarea,
  Heading,
  Box,
} from "@chakra-ui/react"
import Img from "gatsby-image"
import { graphql, StaticQuery } from "gatsby"
import React from "react"
import { IncrementalNumberSelector } from "../Inputs/IncrementalNumberSelector"
import { observer } from "mobx-react-lite"
import LayoutStore from "../../store/LayoutStore"
export const ConfirmEmailModal = observer(() => {
  let isOpen = LayoutStore.emailConfirmModalVisible
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
              LayoutStore.toggleEmailConfirmModal()
            }}
          >
            <ModalOverlay />
            <ModalContent maxW="600px" borderRadius="xl">
              <ModalCloseButton />
              <ModalBody>
                <Box w="80%" mx="auto" mb="8">
                  <Img fluid={email_confirm.childImageSharp.fluid} />
                </Box>
                <Heading
                  color="blue.400"
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
                  Your account has been successfuly registered. To confirm your
                  request please confirm check your email for validation
                  request!
                </Text>
              </ModalBody>

              {/* <ModalFooter>
            <Button
              variant="solid"
              _hover={{
                bgGradient: "linear(to-b, red.400,red.600)",
                boxShadow: "lg",
              }}
              color="white"
              mr="auto"
              px={10}
            >
              Add Trip
            </Button>
            <Button variant="link">Skip & Check Tickets</Button>
          </ModalFooter> */}
            </ModalContent>
          </Modal>
        )
      }}
    </StaticQuery>
  )
})
