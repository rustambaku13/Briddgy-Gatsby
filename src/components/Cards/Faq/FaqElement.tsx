import { chakra, Center, Text, LinkBox } from "@chakra-ui/react"
import React from "react"
import Img from "gatsby-image"
import { LinkOverlay } from "../../Misc/LinkOverlay"
export const FaqElement = chakra(({ img, className, text, to }) => {
  return (
    <LinkBox
      flexDir="column"
      py={12}
      _hover={{
        bg: "outline.light",
      }}
      d="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="base"
      borderWidth="1px"
    >
      <Img fixed={img.childImageSharp.fixed} />
      <LinkOverlay to={to}>
        <Text mt={5} fontSize="700" fontWeight="600">
          {text}
        </Text>
      </LinkOverlay>
    </LinkBox>
  )
})
