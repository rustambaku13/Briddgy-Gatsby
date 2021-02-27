import { Flex, Image, Text, Box, useRadio } from "@chakra-ui/react"
import React from "react"
import { chakra } from "@chakra-ui/react"

export const MiniTestimonialCard = chakra(
  ({ firstName, lastName, img, memberSince, className, ...props }) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)
    const input = getInputProps()
    const checkbox = getCheckboxProps()
    return (
      <Box as="label">
        <input {...input} />
        <Flex
          {...checkbox}
          alignItems="center"
          overflow="hidden"
          cursor="pointer"
          borderRadius="md"
          w="100%"
          className={className}
        >
          <Box h="70px" w="70px" borderRadius="50%">
            <Image
              width="70"
              height="70"
              srcSet={
                "https://cdn0.iconfinder.com/data/icons/avatar-78/128/12-512.png"
              }
            />
          </Box>
          <Box ml={3}>
            <Box>
              <Text mb={1} as="h4" fontSize="xl">
                {`${firstName} ${lastName}`}
              </Text>
              <Text as="h4" variant="secondary" fontSize="sm">
                Member Since {memberSince}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    )
  }
)
