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
  ({
    children,
    className,
    horizontal = true,
  }: {
    className?: any
    children: any[]
    horizontal: boolean
  }) => {
    if (horizontal) {
      return (
        <HStack alignItems="stretch" spacing={3} className={className} w="100%">
          {children}
        </HStack>
      )
    }
    return (
      <VStack alignItems="stretch" spacing={3} className={className} w="100%">
        {children}
      </VStack>
    )
  }
)

interface StepItemInterface {
  icon: any
  title: string
  last?: boolean
  children?: any
  step?: number
  description?: string
}

const StepElement = (step: StepItemInterface) => {
  const isComplete = step.step < step.selected
  return (
    <Box className="step" zIndex={1}>
      <Box d={step.last ? "block" : "inline-block"} bg="white">
        <Center
          color={isComplete ? "crayolaGreen.base" : "outline.base"}
          fontSize="500"
          transition=".5s ease"
          borderColor={isComplete ? "crayolaGreen.base" : "outline.base"}
          borderWidth="1px"
          borderRadius="50%"
          h="10"
          w="10"
        >
          {step.icon}
        </Center>
      </Box>
      <Box>
        <Text fontSize="300" color="text.light" as="span">{`STEP ${
          step.step + 1
        }`}</Text>
        <Text whiteSpace="nowrap" color="text.medium" fontWeight="700">
          {step.title}
        </Text>
        <Text color="text.light" fontSize="400">
          {step.description}
        </Text>
        {step.children}
      </Box>
    </Box>
  )
}
export const StepsContainer = chakra(
  ({
    items,
    selected,
    className,
    horizontal = true,
  }: {
    className?: any
    selected: number
    items: StepItemInterface[]
    horizontal: boolean
  }) => {
    return (
      <>
        <Flex
          className={horizontal ? "steps" : "steps-vertical"}
          pos="relative"
          justifyContent="space-between"
          w="100%"
        >
          <Box
            overflow="hidden"
            className="slider"
            bg="outline.medium"
            pos="absolute"
            zIndex="0"
            borderRadius="base"
            flex={1}
          >
            <Box
              style={{ "--selected": selected, "--count": items.length - 1 }}
              bg="crayolaGreen.base"
              h="100%"
              w="100%"
              transition=".5s ease"
            ></Box>
          </Box>
          {items.map((item, step) => (
            <StepElement
              {...item}
              step={step}
              selected={selected}
              last={step == items.length - 1}
            />
          ))}
        </Flex>
      </>
    )
  }
)
