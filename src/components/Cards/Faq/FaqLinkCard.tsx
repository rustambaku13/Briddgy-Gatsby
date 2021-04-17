import React from "react"
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react"
import { LinkOverlay } from "../../Misc/LinkOverlay"
import { ChevronRightIcon } from "../../../icons/ChevronRight"

export const FaqLinkCard = ({ data }) => {
  return (
    <Flex
      _hover={{ color: "tealBlue.base" }}
      pos="relative"
      borderBottomWidth="1px"
      w="100%"
      py={3}
      px={2}
    >
      <LinkOverlay to="/trips/">
        <Text _hover={{ color: "tealBlue.base" }}>
          {data.frontmatter.title}
        </Text>
      </LinkOverlay>{" "}
      <ChevronRightIcon ml="auto" />
    </Flex>
  )
}
