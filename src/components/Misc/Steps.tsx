import { Box, chakra, Center, Flex, Text } from "@chakra-ui/react"
import React from "react"
import { CheckIcon } from "../../icons/Check"
export const Step = ({
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
      <Flex className={className} w="100%">
        {children}
      </Flex>
    )
  }
)
