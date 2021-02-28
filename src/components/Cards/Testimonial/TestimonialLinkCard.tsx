import { chakra, Box, Heading, Tag, Text, Flex } from "@chakra-ui/react"
import Img from "gatsby-image"
import React from "react"
// Switching Order Type Button. Used in Create Order Page
export const TestimonialLinkCard = chakra(
  ({
    title,
    
    description,
    className,
    orientation = "vertical",
  }: {
    title: string
    
    description: string
    className?: any
    orientation: "horizontal" | "vertical"
  }) => {
    if (orientation == "horizontal") {
      return (
        <Flex mb={8} minH="300px" maxW="800px" w="100%">
          <Box mr={6} flex="3" bg="purple.200"></Box>
          <Box flex="2">
            <Heading mb={5} fontSize="3xl" as="h3">
              {title}
            </Heading>
            <Text variant="secondary">{description}</Text>
          </Box>
        </Flex>
      )
    }
    return (
      <Box className={className}>
        <Box mb={5} h="200px" bg="blue.200"></Box>

        <Heading mb={5} fontSize="2xl" as="h3">
          {title}
        </Heading>
        <Text variant="secondary">{description}</Text>
      </Box>
    )
  }
)
