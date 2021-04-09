import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  LinkBox,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useRadioGroup,
} from "@chakra-ui/react"
import { Link, navigate } from "gatsby-plugin-intl"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useRef, useState } from "react"
import { bmify } from "../../../api"
import { ChevronDownIcon } from "../../../icons/ChevronDown"
import { HomeIcon } from "../../../icons/Home"
import LoginIcon from "../../../icons/Login"
import LogoutIcon from "../../../icons/Logout"
import OrderIcon from "../../../icons/Order"
import { PlaneIcon } from "../../../icons/Plane"
import ProfileIcon from "../../../icons/Profile"
import SupportIcon from "../../../icons/Support"
import TripIcon from "../../../icons/Trip"
import logo from "../../../images/icon_opaque.png"
import { NavigationContext } from "../../../providers/navPage"
import UserStore from "../../../store/UserStore"
import { AddOrderNavigationMenu } from "../../Form/AddOrderForm"
import { AddTripFormNavigationMenu } from "../../Form/AddTripForm"
import { BottomNavigationItem } from "./BottomNavigationItem"
const AuthorizedBottomNavbar = () => {
  return (
    <Box
      d={["flex", "flex", "none"]}
      borderTopRightRadius="xl"
      borderTopLeftRadius="xl"
      borderTopWidth="1px"
      boxShadow="bottom_nav"
      className="nav-bottom"
      as="nav"
      px={[3, 5]}
      zIndex={50}
      bottom="0px"
      h="65px"
      pos="fixed"
      bg="outline.light"
      w="100%"
    >
      <BottomNavigationItem
        to="/"
        text="Home"
        contextKeys={["home"]}
        icon={<HomeIcon />}
        w="25%"
      ></BottomNavigationItem>
      <BottomNavigationItem
        to="/trips"
        text="Trips"
        contextKeys={["trips"]}
        icon={<TripIcon />}
        w="25%"
      ></BottomNavigationItem>
      <BottomNavigationItem
        to="/orders"
        text="Orders"
        contextKeys={["orders"]}
        icon={<OrderIcon />}
        w="25%"
      ></BottomNavigationItem>
      <BottomNavigationItem
        w="25%"
        to="/login"
        contextKeys={["profile"]}
        icon={<ProfileIcon />}
        text="Profile"
      />
    </Box>
  )
}

const DefaultBottomNavbar = () => {
  return (
    <Box
      d={["flex", "flex", "none"]}
      borderTopRightRadius="xl"
      borderTopLeftRadius="xl"
      borderTopWidth="1px"
      boxShadow="bottom_nav"
      className="nav-bottom"
      as="nav"
      px={[3, 5]}
      zIndex={50}
      bottom="0px"
      h="65px"
      pos="fixed"
      bg="outline.light"
      w="100%"
    >
      <BottomNavigationItem
        to="/"
        text="Home"
        contextKeys={["home"]}
        icon={<HomeIcon />}
        w="25%"
      ></BottomNavigationItem>
      <BottomNavigationItem
        to="/trips"
        text="Trips"
        contextKeys={["trips"]}
        icon={<TripIcon />}
        w="25%"
      ></BottomNavigationItem>
      <BottomNavigationItem
        to="/orders"
        text="Orders"
        contextKeys={["orders"]}
        icon={<OrderIcon />}
        w="25%"
      ></BottomNavigationItem>
      <BottomNavigationItem
        w="25%"
        to="/login"
        contextKeys={["login", "signup"]}
        icon={<LoginIcon />}
        text="Authorize"
      />
    </Box>
  )
}

export const BottomNavbar = observer(() => {
  if (UserStore.isLoggedIn) {
    return <AuthorizedBottomNavbar />
  }
  return <DefaultBottomNavbar />
})
