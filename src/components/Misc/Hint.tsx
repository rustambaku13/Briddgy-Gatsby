import { Box, chakra, Text } from "@chakra-ui/react"
import React from "react"
import LightBulbIcon from "../../icons/LightBulb"

export const Hint = chakra(({ text, className }) => {
  return (
    <Box
      className={className}
      borderRadius="base"
      w="100%"
      mb={3}
      p={3}
      bg="white"
      borderWidth="1px"
      as="aside"
    >
      <LightBulbIcon float="left" fontSize="xl" />
      <Text variant="secondary">{text}</Text>
    </Box>
  )
})
