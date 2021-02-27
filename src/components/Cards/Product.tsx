import { Box, Center, chakra, Flex, Heading, Text, Img } from "@chakra-ui/react"

import React from "react"

const ProductCard = chakra(
  ({ img, productId, productName, store, price, className }) => {
    return (
      <Flex
        className={className}
        border="1px solid"
        borderRadius="lg"
        minW="280px"
        borderColor="gray.200"
        transition=".2s ease-in-out"
        _hover={{ bg: "gray.100" }}
        flexDir="column"
      >
        <Box p={3}>
          <Heading fontSize="xl" as="h4" mb={1}>
            {productName}
          </Heading>
          <Text fontSize="sm" as="p">
            from{" "}
            <Text as="span" color="blue.400">
              {store}
            </Text>
          </Text>
        </Box>
        <Box overflow="hidden" flexGrow={1}>
          <Center minH="300px" m="auto" w="60%">
            <Img src={img} />
          </Center>
        </Box>
        <Box p={2}>
          <Text textAlign="right" fontSize="xl" fontWeight={600}>
            {price}$
          </Text>
        </Box>
      </Flex>
    )
  }
)
export { ProductCard }
