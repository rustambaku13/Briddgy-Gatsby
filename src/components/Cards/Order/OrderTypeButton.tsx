import { chakra, Box, Heading } from "@chakra-ui/react"
import Img from "gatsby-image"
import React from "react"
export const OrderTypeButton = chakra(
  ({
    fixedImage,
    title,
    className,
  }: {
    fixedImage: any
    title: string
    className?: any
  }) => {
    return (
      <Box
        bg="white"
        w="450px"
        minH="300px"
        pos="relative"
        cursor="pointer"
        transition=".2s ease-in-out"
        _hover={{
          bg: "gray.100",
          boxShadow: "lg",
        }}
        px={5}
        pt={8}
        borderRadius="10px"
        className={className}
        borderWidth="1px"
        boxShadow="md"
      >
        <Heading w="190px" lineHeight="tall" fontSize="3xl">
          {title}
        </Heading>
        <Img
          style={{ position: "absolute", bottom: 0, right: 0 }}
          fixed={fixedImage}
        />
      </Box>
    )
  }
)
