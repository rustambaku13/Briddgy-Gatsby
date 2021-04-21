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
} from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import React from "react"
import { bmify } from "../../../api"
import { Order } from "../../../types/orders"

export const CollapsableOrderCard = chakra(
  ({ className, orderData }: { className?: any; orderData: Order }) => {
    return (
      <VStack alignItems="stretch" spacing={5} w="100%">
        <HStack spacing={2} w="100%">
          <AspectRatio ratio={1} flex="0 0 80px">
            <Img
              alt="Product Image"
              float="left"
              src={bmify(orderData.orderimage)}
            />
          </AspectRatio>
          <Box>
            <Text
              className="clamp-2"
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
        <Accordion mt={0} allowToggle>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Deliverer Details
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    )
  }
)
