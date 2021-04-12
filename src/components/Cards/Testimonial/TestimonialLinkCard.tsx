import {
  chakra,
  Box,
  Heading,
  Tag,
  Text,
  Flex,
  AspectRatio,
} from "@chakra-ui/react"
import Img from "gatsby-image"
import { Link } from "gatsby-plugin-intl"
import React from "react"
import { Testimonial } from "../../../types/testimonial"
// Switching Order Type Button. Used in Create Order Page
export const TestimonialLinkCard = chakra(
  ({
    testimonial,
    className,
  }: {
    testimonial: Testimonial
    className?: any
  }) => {
    return (
      <Flex
        maxH="400px"
        flexDir="column"
        className={className + " testimonial"}
        mb={8}
        w="100%"
      >
        <Img fluid={testimonial.featuredimage.childImageSharp.fluid} />

        <Box mt={3} flex={3}>
          <Link to="blog/">
            <Heading mb={5} fontSize="2xl" as="h3">
              {testimonial.title}
            </Heading>
          </Link>
          <Text className="clamp-2" variant="secondary">
            {testimonial.description}
          </Text>
          <Link to="blog/">
            <Text color="tealBlue.base" as="span">
              Read more
            </Text>
          </Link>
        </Box>
      </Flex>
    )

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
