import { Center, chakra, Flex, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { ChevronLeftIcon } from "../../icons/ChevronLeft"
import { ChevronRightIcon } from "../../icons/ChevronRight"
export const IncrementalNumberSelector = chakra(
  ({ className, name, parentRef }) => {
    const [value, setValue] = useState(5)
    return (
      <Flex className={className} alignItems="center">
        <ChevronLeftIcon
          onClick={() => {
            setValue(value => Math.max(1, value - 1))
          }}
          role="button"
          cursor="pointer"
          color="outline.base"
          fontSize="hb2"
        />
        <Center
          borderRadius="20px"
          bg="red.400"
          bgGradient="linear(-40deg,warning.base ,cherryRed.base )"
          boxShadow="lg"
          color="white"
          flexDir="column"
          h="50px"
          w="50px"
        >
          <Text fontSize="xl" fontWeight="600" mb="-8px">
            {value}
          </Text>
          <input value={value} type="hidden" name={name} ref={parentRef} />
          <Text fontSize="xs" fontWeight="600" as="small" m={0}>
            KG
          </Text>
        </Center>
        <ChevronRightIcon
          role="button"
          cursor="pointer"
          onClick={() => {
            setValue(value => value + 1)
          }}
          color="outline.base"
          fontSize="hb2"
        />
      </Flex>
    )
  }
)
