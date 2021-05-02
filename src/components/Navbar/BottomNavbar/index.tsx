import { Box } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React from "react"
import { HomeIcon } from "../../../icons/Home"
import LoginIcon from "../../../icons/Login"
import OrderIcon from "../../../icons/Order"
import ProfileIcon from "../../../icons/Profile"
import TripIcon from "../../../icons/Trip"
import UserStore from "../../../store/UserStore"
import { MessageIconWithBadge } from "../../Misc/Message"
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
        to="/profile?page=trips"
        text="My Trips"
        contextKeys={["profile-trip"]}
        icon={<TripIcon />}
        w="25%"
      ></BottomNavigationItem>
      <BottomNavigationItem
        to="/profile?page=orders"
        text="My Orders"
        contextKeys={["profile-order"]}
        icon={<OrderIcon />}
        w="25%"
      ></BottomNavigationItem>
      <BottomNavigationItem
        to="/messages"
        text="Messages"
        contextKeys={["message"]}
        icon={<MessageIconWithBadge />}
        w="25%"
      ></BottomNavigationItem>
      <BottomNavigationItem
        w="25%"
        to="/profile?page=profile"
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
