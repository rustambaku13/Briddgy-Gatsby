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
} from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import moment from "moment"
import React, { useContext, useEffect, useState } from "react"
import { bmify, FRONTEND_DATE_FORMAT } from "../../../api"
import { removeContract } from "../../../api/contract"
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
                  Traveler's Reward
                </Text>
                <Text>${orderData.price}</Text>
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
                  {`${trimCityEmpty(
                    orderData.src.details[0].en.city
                  )}${getCountryFromCode(orderData.src.countryCode)}`}{" "}
                  <Text as="span" variant="secondary">
                    to{" "}
                  </Text>
                  {`${trimCityEmpty(
                    orderData.dest.details[0].en.city
                  )}${getCountryFromCode(orderData.dest.countryCode)}`}
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
                <Button w="100%" mb={5} variant="danger">
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
              <Text>
                {moment(contract.trip.date).format(FRONTEND_DATE_FORMAT)}
              </Text>
            </Box>
            <Box mb={5}>
              <Text as="label" variant="light">
                Deliver
              </Text>
              <Text fontWeight="600">
                <Text fontWeight="400" as="span" variant="secondary">
                  From{" "}
                </Text>
                {`${trimCityEmpty(
                  contract.trip.src.details[0].en.city
                )}${getCountryFromCode(contract.trip.src.countryCode)}`}{" "}
                <Text fontWeight="400" as="span" variant="secondary">
                  to{" "}
                </Text>
                {`${trimCityEmpty(
                  contract.trip.dest.details[0].en.city
                )}${getCountryFromCode(contract.trip.dest.countryCode)}`}
              </Text>
            </Box>
            <SendMessage user={contract.trip.owner} size="sm" variant="primary">
              Message Traveler
            </SendMessage>
          </AccordionPanel>
        </AccordionItem>
      </CollapsableOrderCard>
    )
  }
)
