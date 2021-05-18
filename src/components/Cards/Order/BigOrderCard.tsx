import {
  AspectRatio,
  Box,
  chakra,
  Divider,
  Flex,
  Heading,
  Img,
  Text,
  Link as CLink,
  VStack,
  Button,
  HStack,
  Center,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { bmify, FRONTEND_DATE_FORMAT } from "../../../api"
import { LocationIcon } from "../../../icons/Location"
import { Order } from "../../../types/orders"
import { getCountryFromCode, trimCityEmpty } from "../../../utils/misc"
import { Avatar } from "../../Avatar/Avatar"
import ImageThumbnailViewer, {
  ImageViewer,
} from "../../Misc/ImageThumbnailViewer"
import { Rating } from "../../Misc/Rating"
import moment from "moment"
import { CurvedArrowRight } from "../../../icons/CurvedArrowRight"
import LayoutStore from "../../../store/LayoutStore"
export const BigOrderCard = chakra(
  ({ className, orderData,hideButton }: { className?: any; orderData: Order,hideButton?:any }) => {
    const [images, setImages] = useState([])
    useEffect(() => {
      setImages(
        orderData.orderimage.map(img => ({
          preview: bmify(img),
        }))
      )
    }, [orderData])
    return (
      <Box
        w="100%"
        boxShadow="md"
        p={[2, 4, 6]}
        bg="white"
        borderColor="outline.medium"
        borderWidth="1px"
        borderRadius="lg"
      >
        <Flex flexDir={["column-reverse", "column-reverse", "row"]} w="100%">
          <VStack
            alignItems="flex-start"
            mt={[8, 8, 0]}
            mr={[0, 0, 4]}
            spacing={4}
            flex={1}
          >
            <Flex alignItems="center" w="100%">
              <Avatar mr={2} user={orderData.owner} />
              <Box>
                <Text>{`${orderData.owner.first_name} ${orderData.owner.last_name}`}</Text>
                <Rating
                  fontSize="400"
                  readonly
                  rating={orderData.owner.rating}
                />
              </Box>
              <Text variant="light" textAlign="right" fontSize="400" flex={1}>
                {orderData.date}
              </Text>
            </Flex>
            <Text
              fontSize="700"
              w="100%"
              fontWeight="700"
              variant="secondary"
              as="h1"
            >
              {orderData.title}
            </Text>
            <Text
              minH={["unset", "unset", "7.5em"]}
              w="100%"
              fontSize="500"
              variant="light"
            >
              {orderData.description}
            </Text>
            <Box
              borderColor="outline.medium"
              borderWidth="1px"
              bg="lilaPurple.light"
              w="100%"
              mt={4}
              p={3}
              borderRadius="base"
            >
              <Text variant="light">
                Buy From{" "}
                <CLink href={orderData.order_url} color="warning.dark">
                  {orderData.host}
                </CLink>
              </Text>
              <Text variant="light">
                Product Price{" "}
                <Text color="text.medium" as="span">
                  ${orderData.item_price}
                </Text>
              </Text>
            </Box>
            <Divider my={0} />
            <Button
              d={hideButton?"none":"block"}
              onClick={() => {
                LayoutStore.toOrderProposalModalOpen({ order: orderData })
              }}
              size="lg"
              variant="primary_dark"
              w="100%"
            >
              Offer to deliver
            </Button>
          </VStack>
          <ImageViewer images={images}>
            <Center
              mr={[0, 0, 4]}
              mt={[2, 2, 0]}
              p={2}
              borderRadius="lg"
              borderColor="outline.medium"
              borderWidth={["0px", "0px", "1px"]}
              flex={1}
            >
              <ImageViewer.LargeImage />
            </Center>
            <ImageViewer.ImageThumbnails />
          </ImageViewer>
        </Flex>

        <Divider my={4} />
        <HStack flexWrap="wrap" alignItems="center" w="100%">
          <Text color="text.medium" as="span">{`${trimCityEmpty(
            orderData.src.city
          )}${orderData.src.country}`}</Text>
          <CurvedArrowRight color="text.light" />
          <Text color="text.medium" as="span">{`${trimCityEmpty(
            orderData.dest.city
          )}${orderData.dest.country}`}</Text>
          <Text fontSize="500" variant="light" flex={1} textAlign="right">
            Traveler's reward{" "}
            <Text as="strong" color="text.dark" fontSize="hb1" fontWeight="700">
              ${orderData.price}
            </Text>
          </Text>
        </HStack>
      </Box>
    )
  }
)
