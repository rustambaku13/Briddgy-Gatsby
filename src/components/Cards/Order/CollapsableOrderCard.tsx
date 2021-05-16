import {
  AspectRatio,
  Box,
  Flex,
  VStack,
  Img,
  Text,
  HStack,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Center,
  Link,
  Button,
  useToast,
} from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import { navigate } from "gatsby-link"
import moment from "moment"
import React, { useContext, useEffect, useState } from "react"
import { bmify, FRONTEND_DATE_FORMAT } from "../../../api"
import { removeContract } from "../../../api/contract"
import { remvoeOrder } from "../../../api/order"
import { OrderPageState } from "../../../providers/navPage"
import LayoutStore from "../../../store/LayoutStore"
import { Contract } from "../../../types/contract"
import { Order } from "../../../types/orders"
import { getCountryFromCode, trimCityEmpty } from "../../../utils/misc"
import { Avatar } from "../../Avatar/Avatar"
import { ImageViewer } from "../../Misc/ImageThumbnailViewer"
import { Rating } from "../../Misc/Rating"
import { SendMessage } from "../../Misc/SendMessageButton"

export const CollapsableOrderCard = chakra(
  ({
    className,
    orderData,
    children,
    buttons,
  }: {
    className?: any
    orderData: Order
    children?: any
    buttons?: any
  }) => {

    const [loading,setLoading] = useState(false)
    const toast = useToast()


    const removeHandler = async ()=>{
      setLoading(true)
      return remvoeOrder(orderData.id).then(()=>{
          navigate('/profile')
      })
      .catch(()=>{
        toast({
          title: "Failed to delete Order",
          description: "Make sure to handle settled deals before deleting order",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      })
      .finally(()=>{
        setLoading(false)
      })
    }


    const [images, setImages] = useState([])
    useEffect(() => {
      setImages(
        orderData.orderimage.map(img => ({
          preview: bmify(img),
        }))
      )
    }, [])
    return (
      <VStack alignItems="stretch" spacing={5} w="100%">
        <HStack spacing={2} w="100%">
          <AspectRatio ratio={1} flex="0 0 4.5rem">
            <Img
              alt="Product Image"
              float="left"
              src={bmify(orderData.orderimage[0])}
            />
          </AspectRatio>
          <Box>
            <Text
              className="clamp-2"
              h="3rem"
              fontSize="600"
              color="text.medium"
              fontWeight="700"
              as="h2"
            >
              {orderData.title}
            </Text>
            <Text fontSize="500" color="text.medium" fontWeight="700" as="h2">
              ${orderData.item_price}
            </Text>
          </Box>
        </HStack>
        <Divider />
        <Accordion defaultIndex={1} mt={0} allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Order Details
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <ImageViewer images={images}>
                <Flex>
                  <ImageViewer.ImageThumbnails h={10} w={10} />
                  <AspectRatio ratio={1} w="250px">
                    <ImageViewer.LargeImage />
                  </AspectRatio>
                </Flex>
              </ImageViewer>
              <Box my={5}>
                <Text as="label" variant="light">
                  Item Price
                </Text>
                <Text>${orderData.item_price}</Text>
              </Box>
              <Box mb={5}>
                <Text as="label" variant="light">
                  Buy From
                </Text>
                <Text>
                  <Link href={orderData.order_url} color="warning.dark">
                    {orderData.host}
                  </Link>
                </Text>
              </Box>
              <Box mb={5}>
                <Text as="label" variant="light">
                  Deliver
                </Text>
                <Text>
                  <Text as="span" variant="secondary">
                    From{" "}
                  </Text>
                  {`${trimCityEmpty(orderData.src.city)}${
                    orderData.src.country
                  }`}{" "}
                  <Text as="span" variant="secondary">
                    to{" "}
                  </Text>
                  {`${trimCityEmpty(orderData.dest.city)}${
                    orderData.dest.country
                  }`}
                </Text>
              </Box>
              <Box mb={5}>
                <Text as="label" variant="light">
                  Description
                </Text>{" "}
                <Text>{orderData.description}</Text>
              </Box>
              <Box mb={5}>
                <Text as="label" variant="light">
                  Item Weight
                </Text>{" "}
                <Text>{orderData.weight} kg</Text>
              </Box>
              {buttons ? (
                buttons
              ) : (
                <Button onClick={()=>{
                  LayoutStore.alertDialogModalOpen({
                    title: "Removing Trip",
                    yes: "Remove",
                    callback: removeHandler,
                    no: "Cancel",
                    description: "Are you sure you want to remove your trip?",
                  })
                }} w="100%" mb={5} variant="danger">
                  Delete Order
                </Button>
              )}
            </AccordionPanel>
          </AccordionItem>
          {children}
        </Accordion>
      </VStack>
    )
  }
)

export const CollapsableOrderCardwTrip = chakra(
  ({ className, contract }: { className?: any; contract: Contract }) => {
    const context = useContext(OrderPageState)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
      contract.order.price = contract.price_bid
    }, [])
    const cancelHandler = async () => {
      try {
        setLoading(true)
        await removeContract(contract.id)
        context.setContract(null)
        context.setStep(0)
      } finally {
        setLoading(false)
      }
    }
    let buttons = <></>
    if (contract.state == "SET") {
      buttons = (
        <Button
          onClick={() => {
            LayoutStore.alertDialogModalOpen({
              title: "Cancel Deal",
              yes: "Yes",
              callback: cancelHandler,
              no: "No",
              description: "Are you sure you want to cancel the deal? ",
            })
          }}
          isLoading={loading}
          w="100%"
          mb={5}
          variant="danger"
        >
          Cancel Deal
        </Button>
      )
    }

    return (
      <CollapsableOrderCard buttons={buttons} orderData={contract.order}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Delivery Details
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>{" "}
          <AccordionPanel pb={4}>
            <Flex mb={5} alignItems="center" w="100%">
              <Avatar mr={2} user={contract.trip.owner} />
              <Box>
                <Text>{`${contract.trip.owner.first_name} ${contract.trip.owner.last_name}`}</Text>
                <Rating
                  fontSize="400"
                  readonly
                  rating={contract.trip.owner.rating}
                />
              </Box>
            </Flex>
            <Box mb={5}>
              <Text as="label" variant="light">
                Travel dates
              </Text>
              <Text>{contract.trip.date}</Text>
            </Box>
            <Box mb={5}>
              <Text as="label" variant="light">
                Deliver
              </Text>
              <Text fontWeight="600">
                <Text fontWeight="400" as="span" variant="secondary">
                  From{" "}
                </Text>
                {`${trimCityEmpty(contract.trip.src.city)}${
                  contract.trip.src.country
                }`}{" "}
                <Text fontWeight="400" as="span" variant="secondary">
                  to{" "}
                </Text>
                {`${trimCityEmpty(contract.trip.dest.city)}${
                  contract.trip.dest.country
                }`}
              </Text>
            </Box>
            <SendMessage user={contract.trip.owner} size="sm" variant="primary">
              Message Traveler
            </SendMessage>
          </AccordionPanel>
        </AccordionItem>
        {contract.total_price?(
          <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Payment Details
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          <Box my={5}>
                <Text as="label" variant="light">
                  Traveler's Reward
                </Text>
                <Text>${contract.price_bid}</Text>
              </Box>
              <Box my={5}>
                <Text as="label" variant="light">
                  Item Price
                </Text>
                <Text>${contract.item_price}</Text>
              </Box>
              <Box my={5}>
                <Text as="label" variant="light">
                  Transfer Commisions
                </Text>
                <Text>${(parseFloat(contract.total_price) - parseFloat(contract.price_bid) - parseFloat(contract.item_price)).toFixed(2)}</Text>
              </Box>
          </AccordionPanel>
        </AccordionItem>
        ):null}
      </CollapsableOrderCard>
    )
  }
)
