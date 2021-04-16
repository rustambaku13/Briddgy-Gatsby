import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import {
  AspectRatio,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Divider,
  HStack,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react"
import { Link } from "gatsby-plugin-intl"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { bmify } from "../../api"
import { addContract } from "../../api/contract"
import { getSuggestedOrders } from "../../api/trip"
import { LightBulbIcon } from "../../icons/LightBulb"
import LayoutStore from "../../store/LayoutStore"
import UserStore from "../../store/UserStore"
import { Order } from "../../types/orders"
import { Loader } from "../Misc/Loader"
export const MakeProposaltoTripModal = observer(() => {
  const [filteredOrders, setFilteredOrders] = useState({
    loading: true,
    results: [],
  })
  const toast = useToast()
  const [selectedData, setSelectedData] = useState([])
  const [loading, setLoading] = useState(false)
  const { handleSubmit, register, errors } = useForm()
  useEffect(() => {
    // Fetch the Trips suitable
    if (LayoutStore.toTripProposalModalVisible) {
      getSuggestedOrders(
        LayoutStore.toTripProposalModalContext.trip.id,
        UserStore.me.id
      ).then(orders => {
        setFilteredOrders({ loading: false, results: orders.data.results })
      })
    }
  }, [LayoutStore.toTripProposalModalVisible])
  const closeModal = () => {
    LayoutStore.toTripProposalModalOpen(null)
    setSelectedData([])
    setFilteredOrders({ results: [], loading: true })
  }
  const proposalHandler = data => {
    // Actually make a contract
    const index = parseInt(selectedData[0])
    const selectedOrder: Order = filteredOrders.results[index]
    setLoading(true)
    addContract({
      trip: LayoutStore.toTripProposalModalContext.trip.id,
      order: selectedOrder.id,
      price_bid: selectedOrder.price.toString(),
    })
      .then(e => {
        closeModal()
        toast({
          title: "Proposal was made",
          description: "Wait for the orderer to confirm your delivery",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      })
      .catch(() => {
        toast({
          title: "Error has occured",
          description: "Please try again later or contract our support",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Modal isOpen={LayoutStore.toTripProposalModalVisible} onClose={closeModal}>
      <ModalOverlay></ModalOverlay>
      <ModalContent
        onSubmit={handleSubmit(proposalHandler)}
        as="form"
        w="full"
        maxW="container.sm"
      >
        <ModalHeader>
          You have {filteredOrders.results.length} suitable Orders
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody fontSize="sm">
          <Text
            w="100%"
            px={2}
            bg="lilaPurple.light"
            mb={8}
            py={5}
            borderRadius="md"
          >
            <LightBulbIcon float="left" fontSize="500" />
            Select the orders that would like to offer for this trip
          </Text>
          {filteredOrders.loading ? <Loader mx="auto" /> : null}
          <CheckboxGroup
            onChange={e => {
              if (e.length) {
                setSelectedData([e[e.length - 1]])
                return
              }

              setSelectedData(e)
            }}
            value={selectedData}
          >
            {filteredOrders.results.map((order: Order, index) => (
              <div key={order.id}>
                <HStack my={2} spacing={4}>
                  <Checkbox outline="none" value={`${index}`} variant="light" />
                  <AspectRatio
                    h="16"
                    bg="outline.light"
                    borderRadius="base"
                    w="16"
                  >
                    <Image
                      maxW="100%"
                      maxH="100%"
                      src={bmify(order.orderimage[0])}
                    />
                  </AspectRatio>

                  <Link
                    style={{ flex: 1 }}
                    className="clamp-2"
                    to="/profile?page=orders"
                  >
                    <Text wordBreak="break-word">{order.title}</Text>
                  </Link>

                  <Text ml="auto" as="strong">
                    ${order.item_price}
                  </Text>
                </HStack>
                <Divider my={5} />
              </div>
            ))}
          </CheckboxGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={selectedData.length == 0}
            isLoading={loading}
            type="submit"
            variant="success"
          >
            Offer Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})
