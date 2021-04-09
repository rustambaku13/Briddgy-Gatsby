import {
  Box,
  Center,
  LinkBox,
  Text,
  LinkOverlay as LL,
} from "@chakra-ui/layout"

import { useRadio } from "@chakra-ui/radio"
import { chakra } from "@chakra-ui/system"
import { Link, navigate } from "gatsby-plugin-intl"
import React, { useContext } from "react"
import TripIcon from "../../../icons/Trip"
import { NavigationContext } from "../../../providers/navPage"
import { LinkOverlay } from "../../Misc/LinkOverlay"
export const BottomNavigationItem = chakra(
  ({
    className,
    icon,
    to,
    text,
    contextKeys,
  }: {
    className?: any
    icon: any
    to: string
    text: string
    contextKeys: any
  }) => {
    const context = useContext(NavigationContext)
    const selected = contextKeys.includes(context.page)
    return (
      <LinkBox
        fontSize="700"
        flexDir="column"
        d="flex"
        justifyContent="center"
        alignItems="center"
        className={className}
        color={selected ? "tealBlue.base" : "text.light"}
        h="inherit"
      >
        <LinkOverlay to={to}>{icon}</LinkOverlay>
        <Text d={selected ? "block" : "none"} fontSize="300" as="small">
          {text}
        </Text>
      </LinkBox>
    )
  }
)
