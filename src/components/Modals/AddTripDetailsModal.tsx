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
} from "@chakra-ui/react"
import { Link } from "gatsby-plugin-intl"
import React from "react"
import { useForm } from "react-hook-form"
import { IncrementalNumberSelector } from "../Inputs/IncrementalNumberSelector"
export const AddTripDetailsModal = ({ isOpen, setOpen, callback }) => {
  const { register, getValues, handleSubmit, watch, errors } = useForm()
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setOpen(false)
      }}
    >
      <form onSubmit={handleSubmit(callback)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="hb1">You are almost done</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="600" as="label">
              Unused baggage
            </Text>
            <Text fontSize="400" variant="secondary">
              How much baggage space you have left unused{" "}
            </Text>
            <Center>
              <IncrementalNumberSelector
                name="weight_limit"
                parentRef={register()}
                my={5}
              />
            </Center>
            <Text fontWeight="600" htmlFor="description" as="label">
              Description
            </Text>
            <Text fontSize="400" variant="secondary">
              Description of items you can carry, forbidden items and etc
            </Text>
            <Textarea
              id="description"
              ref={register()}
              name="description"
              my={5}
              fontSize="sm"
              placeholder="I can carry electronics, documents and more. "
              borderColor="blue.400"
            ></Textarea>
          </ModalBody>

          <ModalFooter>
            <Link to="/faq/post/supported-countries-temp">Support countries</Link>
            <Button variant="red_gradient" type="submit" ml="auto" px={10}>
              Add Trip
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}
