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
  return (
    <VStack w={last ? "auto" : "100%"} alignItems="stretch" spacing={1}>
      <Flex w="100%" alignItems="center">
        <Center
          mr={2}
          color="white"
          fontSize="500"
          bg="crayolaGreen.base"
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
            <Box bg="crayolaGreen.base" h="100%" w="50%"></Box>
          </Box>
        )}
      </Flex>
      <Text fontSize="300" color="text.light" as="span">{`STEP ${step}`}</Text>
      <Text whiteSpace="nowrap" color="text.medium" fontWeight="700">
        {title}
      </Text>
    </VStack>
  )
}

export const Step2 = ({
  Icon,
  title,
  step,
  selected,
}: {
  Icon: any
  title: string
  step: number
  selected: number
}) => {
  return (
    <Box pos="relative" w="100%" flex="1">
      {step == 0 ? null : (
        <Flex
          h="32px"
          alignItems="center"
          zIndex="-1"
          w="100%"
          pos="absolute"
          left="-50%"
        >
          <Box w="100%" h="2px" bg="gray.100"></Box>
        </Flex>
      )}
      <Box w="100%" color="white" h="32px">
        <Center
          h="32px"
          w="32px"
          borderRadius="50%"
          p={3}
          transition=".3 ease-in-out"
          bg={selected >= step ? "blue.400" : "gray.300"}
          mx="auto"
        >
          {selected == step ? <Icon /> : null}
          {selected > step ? <CheckIcon /> : null}
        </Center>
      </Box>
      <Text
        mt={5}
        w="100%"
        color={selected >= step ? "blue.400" : "gray.300"}
        textAlign="center"
      >
        {title}
      </Text>
    </Box>
  )
}

export const Steps = chakra(
  ({ children, className }: { className?: any; children: any[] }) => {
    return (
      <HStack alignItems="stretch" spacing={6} className={className} w="100%">
        {children}
      </HStack>
    )
  }
)
