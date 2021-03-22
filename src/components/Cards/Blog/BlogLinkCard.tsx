import { chakra, Box, Heading, Tag, Text, Flex } from "@chakra-ui/react"
import Img from "gatsby-image"
import React from "react"
// Switching Order Type Button. Used in Create Order Page
export const BlogLinkCard = chakra(
  ({
    title,
    tags,
    description,
    className,
    orientation = "vertical",
  }: {
    title: string
    tags: any[]
    description: string
    className?: any
    orientation: "horizontal" | "vertical"
  }) => {
    if (orientation == "horizontal") {
      return (
        <Flex className={className} mb={8} maxW="800px" w="100%">
          <Box mr={[2, 4, 6]} flex="3" bg="purple.200" borderRadius="xl"></Box>
          <Box flex="2">
            {tags.map(item => (
              <Tag mb={5} colorScheme="blue">
                {item}
              </Tag>
            ))}
            <Heading mb={5} fontSize="2xl" as="h3">
              {title}
            </Heading>
            <Text variant="secondary">{description}</Text>
          </Box>
        </Flex>
      )
    }
    return (
      <Box className={className}>
        <Box mb={5} h="200px" bg="blue.200" borderRadius="xl"></Box>
        {tags.map(item => (
          <Tag mb={5} colorScheme="blue">
            {item}
          </Tag>
        ))}
        <Heading mb={5} fontSize="2xl" as="h3">
          {title}
        </Heading>
        <Text variant="secondary">{description}</Text>
      </Box>
    )
  }
)
