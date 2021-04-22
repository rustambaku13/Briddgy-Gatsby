import {
  Box,
  chakra,
  Center,
  Flex,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react"
import React from "react"
import { CheckIcon } from "../../icons/Check"

export const Step = ({
  icon,
  title,
  step,
  last,
  selected,
}: {
  icon: any
  title: string
  last: any
  step: number
  selected: number
}) => {
  if (selected < step) {
    // Pending yet
    return (
      <VStack w={last ? "auto" : "100%"} alignItems="stretch" spacing={1}>
        <Flex w="100%" alignItems="center">
          <Center
            mr={3}
            color="outline.base"
            fontSize="500"
            transition=".5s ease"
            borderColor="outline.base"
            borderWidth="1px"
            borderRadius="50%"
            h="10"
            w="10"
          >
            {icon}
          </Center>
          {last ? null : (
            <Box
              overflow="hidden"
              bg="outline.medium"
              h="4px"
              borderRadius="base"
              flex={1}
            >
              <Box
                transition=".5s .5s ease"
                bg="crayolaGreen.base"
                h="100%"
                maxW="0%"
                w="100%"
              ></Box>
            </Box>
          )}
        </Flex>
        <Text fontSize="300" color="text.light" as="span">{`STEP ${
          step + 1
        }`}</Text>
        <Text whiteSpace="nowrap" color="text.medium" fontWeight="700">
          {title}
        </Text>
      </VStack>
    )
  }
  if (selected == step) {
    // This is progress
    return (
      <VStack w={last ? "auto" : "100%"} alignItems="stretch" spacing={1}>
        <Flex w="100%" alignItems="center">
          <Center
            mr={3}
            transition=".5s ease"
            color="crayolaGreen.base"
            fontSize="500"
            borderColor="crayolaGreen.base"
            borderWidth="1px"
            borderRadius="50%"
            h="10"
            w="10"
          >
            {icon}
          </Center>
          {last ? null : (
            <Box
              overflow="hidden"
              bg="outline.medium"
              h="4px"
              borderRadius="base"
              flex={1}
            >
              <Box
                bg="crayolaGreen.base"
                transition=".5s .5s ease"
                h="100%"
                w="100%"
                maxW="0%"
              ></Box>
            </Box>
          )}
        </Flex>
        <Text fontSize="300" color="text.light" as="span">{`STEP ${
          step + 1
        }`}</Text>
        <Text whiteSpace="nowrap" color="text.medium" fontWeight="700">
          {title}
        </Text>
      </VStack>
    )
  } else {
    // Done already
  }
  return (
    <VStack w={last ? "auto" : "100%"} alignItems="stretch" spacing={1}>
      <Flex w="100%" alignItems="center">
        <Center
          mr={3}
          transition=".5s ease"
          color="white"
          fontSize="500"
          bg="crayolaGreen.base"
          borderRadius="50%"
          borderWidth="1px"
          borderColor="crayolaGreen.base"
          h="10"
          w="10"
        >
          {icon}
        </Center>
        {last ? null : (
          <Box
            overflow="hidden"
            bg="outline.medium"
            h="4px"
            borderRadius="base"
            flex={1}
          >
            <Box
              bg="crayolaGreen.base"
              h="100%"
              maxW="100%"
              transition=".5s ease"
              w="100%"
            ></Box>
          </Box>
        )}
      </Flex>
      <Text fontSize="300" color="text.light" as="span">{`STEP ${
        step + 1
      }`}</Text>
      <Text whiteSpace="nowrap" color="text.medium" fontWeight="700">
        {title}
      </Text>
    </VStack>
  )
}

export const Steps = chakra(
  ({ children, className }: { className?: any; children: any[] }) => {
    return (
      <HStack alignItems="stretch" spacing={3} className={className} w="100%">
        {children}
      </HStack>
    )
  }
)
