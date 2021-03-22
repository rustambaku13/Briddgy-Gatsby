import { Box, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout"
import { useRadio } from "@chakra-ui/radio"
import { Link, navigate } from "gatsby-plugin-intl"
import React from "react"
import TripIcon from "../../icons/Trip"
export const BottomNavigationItem = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const Icon = props.icon
  const input = getInputProps()
  const checkbox = getCheckboxProps()
  return (
    <Box as="label" color="whiteAlpha.800">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        _checked={{
          color: "white",
          fontWeight: "bold",
        }}
      >
        <Box>
          <Box fontSize="26px" textAlign="center">
            {Icon}
          </Box>

          <Text textAlign="center">{props.text}</Text>
        </Box>
      </Box>
    </Box>
  )
}
