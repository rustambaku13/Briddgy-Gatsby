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
import React from "react"
import { IncrementalNumberSelector } from "../Inputs/IncrementalNumberSelector"
export const AddTripDetailsModal = ({ isOpen, setOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setOpen(false)
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="3xl">You are almost done</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="600" as="label">
            Unused baggage
          </Text>
          <Text fontSize="sm" variant="secondary">
            How much baggage space you have left unused{" "}
          </Text>
          <Center>
            <IncrementalNumberSelector my={5} />
          </Center>
          <Text fontWeight="600" as="label">
            Description
          </Text>
          <Text fontSize="sm" variant="secondary">
            Description of items you can carry, forbidden items and etc
          </Text>
          <Textarea
            my={5}
            fontSize="sm"
            placeholder="I can carry electronics, documents and more. "
            borderColor="blue.400"
          ></Textarea>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="solid"
            bgGradient="linear(to-b, red.400,red.600)"
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
