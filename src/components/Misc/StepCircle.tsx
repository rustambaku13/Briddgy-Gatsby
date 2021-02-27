import { Center, chakra, Box } from "@chakra-ui/react"
import React from "react"
export const StepCircle = chakra(
  ({
    className,
    children,
    step,
  }: {
    step: number
    className?: string
    children: any
  }) => (
    <Center borderRadius="50%" className={className} position="relative">
      {children}
      <Box
        pos="absolute"
        bottom="0"
        right="0"
        h="27px"
        w="27px"
        borderRadius="50%"
        borderWidth="3px"
        boxSizing="content-box"
        borderColor="white"
        bg="black"
        lineHeight="30px"
        textAlign="center"
        color="white"
      >
        {step}
      </Box>
    </Center>
  )
)
