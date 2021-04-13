import { Box, Center, chakra, Flex, Heading, Text } from "@chakra-ui/react"
import Img from "gatsby-image"
import React from "react"
import { Product } from "../../../types/product"

export const ProductCard = chakra(
  ({ className, product }: { className?: any; product: Product }) => {
    return (
      <Flex
        className={className}
        border="1px solid"
        cursor="pointer"
        borderRadius="lg"
        borderColor="gray.200"
        transition=".2s ease-in-out"
        _hover={{ bg: "gray.100" }}
        flexDir="column"
      >
        <Box p={3}>
          <Heading className="clamp-2" fontSize="xl" as="h4" mb={1}>
            {product.title}
          </Heading>
          <Text fontSize="sm" as="p">
            from{" "}
            <Text as="span" color="blue.400">
              {product.store}
            </Text>
          </Text>
        </Box>
        <Center flexGrow={1} overflow="hidden" m="auto" w="60%">
          <Img
            className="full-width"
            alt="Product Item"
            fluid={product.image.childImageSharp.fluid}
          />
        </Center>

        <Box p={2}>
          <Text textAlign="right" fontSize="xl" fontWeight={600}>
            {product.price}$
          </Text>
        </Box>
      </Flex>
    )
  }
)
