import {
  Box,
  chakra,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { bmify } from "../../../api"
import { LocationIcon } from "../../../icons/Location"
import { Order } from "../../../types/orders"
import { trimCityEmpty } from "../../../utils/misc"
import ImageThumbnailViewer from "../../Misc/ImageThumbnailViewer"

export const BigOrderCard = chakra(
  ({ className, orderData }: { className?: any; orderData: Order }) => {
    console.log(orderData)

    const [images, setImages] = useState([])
    useEffect(() => {
      const imgs = orderData.orderimage.map(item => {
        return {
          preview: bmify(item),
        }
      })
      setImages(imgs)
    }, [orderData])
    return (
      <Box maxW="500px" className={className} w="100%">
        <Flex
          mb={5}
          borderWidth="1px"
          flexDir="column"
          px={5}
          py={8}
          w="100%"
          borderRadius="xl"
          bg="white"
        >
          <ImageThumbnailViewer images={images} />
          <Divider my={5} />
          <Heading mb={5} fontSize="2xl">
            {orderData.title}
          </Heading>
          <Text variant="secondary">{orderData.description}</Text>
        </Flex>
        <VStack
          borderWidth="1px"
          px={5}
          py={8}
          w="100%"
          borderRadius="xl"
          bg="white"
          spacing={5}
        >
          <Text fontSize="sm" variant="secondary" textAlign="center">
            You requrested this product to be bought and delivered 8 days ago{" "}
            <br /> from amazon.com
          </Text>
          <Text w="100%" verticalAlign="baseline">
            Traveler's reward{" "}
            <Text as="strong" mt="-8px" fontSize="3xl">
              ${orderData.price}
            </Text>
          </Text>
          <Divider />
          <Box w="100%">
            <Text variant="secondary" as="label" size="sm">
              From
            </Text>
            <Text pl={3}>
              <LocationIcon />{" "}
              {`${trimCityEmpty(orderData.source.city)}${
                orderData.source.country_en
              }`}
            </Text>
          </Box>
          <Box w="100%">
            <Text variant="secondary" as="label" size="sm">
              To
            </Text>
            <Text pl={3}>
              <LocationIcon />{" "}
              {`${trimCityEmpty(orderData.destination.city)}${
                orderData.destination.country_en
              }`}
            </Text>
          </Box>
        </VStack>
      </Box>
    )
  }
)
