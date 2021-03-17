import {
  Avatar,
  Box,
  Button,
  Flex,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuIcon,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react"
import { Link, navigate } from "gatsby-plugin-intl"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { bmify } from "../../api"
import UserStore from "../../store/UserStore"
import { ChevronDownIcon } from "../../icons/ChevronDown"
import ProfileIcon from "../../icons/Profile"
import TripIcon from "../../icons/Trip"
import OrderIcon from "../../icons/Order"
import LogoutIcon from "../../icons/Logout"
import SupportIcon from "../../icons/Support"
import { flowResult } from "mobx"

const AuthorizedNavbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <Flex
      as="nav"
      p={3}
      alignItems="center"
      w="100%"
      h="55px"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
    >
      <Text display="inline-block" mr={10} fontSize="2xl" as="h1">
        Briddgy
      </Text>
      <Text mr={7} display="inline-block">
        <Link to="/trips">Trips</Link>
      </Text>
      <Text mr={7} display="inline-block">
        <Link to="/orders">Orders</Link>
      </Text>

      <Text ml="auto" display="inline-block" mr={7}>
        <Link to="/travel">Travel & Earn</Link>
      </Text>
      <Button mr={7} variant="primary_gradient" color="white">
        <Link to="/order">Create Order</Link>
      </Button>
      <Menu
        isOpen={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
      >
        <MenuButton display="flex" alignItems="center">
          <Avatar size="sm" src={bmify(UserStore.me.avatarpic)} />
          <ChevronDownIcon
            transition="0.1s ease-in-out"
            style={open ? { transform: "rotate(-90deg)" } : {}}
            mt="8px"
          />
        </MenuButton>
        <MenuList>
          <LinkBox>
            <Link to="/profile?page=profile">
              <MenuItem icon={<ProfileIcon fontSize="lg" color="blue.600" />}>
                Profile
              </MenuItem>
            </Link>
          </LinkBox>
          <Link to="/profile?page=trips">
            <MenuItem icon={<TripIcon fontSize="lg" color="blue.600" />}>
              My Trips
            </MenuItem>
          </Link>
          <Link to="/profile?page=orders">
            <MenuItem icon={<OrderIcon fontSize="lg" color="blue.600" />}>
              My Orders
            </MenuItem>
          </Link>
          <MenuDivider />
          <MenuItem icon={<SupportIcon fontSize="lg" color="blue.600" />}>
            Help Center
          </MenuItem>
          <MenuItem
            onClick={() => {
              UserStore.logout()
              navigate("/login")
            }}
            icon={<LogoutIcon fontSize="lg" color="blue.600" />}
          >
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

const DefaultNavbar = () => {
  return (
    <Flex
      as="nav"
      p={3}
      alignItems="center"
      w="100%"
      h="55px"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
    >
      <Text display="inline-block" mr={10} fontSize="2xl" as="h1">
        Briddgy
      </Text>
      <Text mr={7} display="inline-block">
        <Link to="/trips">Trips</Link>
      </Text>
      <Text mr={7} display="inline-block">
        <Link to="/orders">Orders</Link>
      </Text>

      <Text ml="auto" mr={7} display="inline-block">
        <Link to="/login">Login</Link>
      </Text>
      <Text display="inline-block" mr={7}>
        <Link to="/signup">Sign Up</Link>
      </Text>
      <Text display="inline-block" mr={7}>
        <Link to="/travel">Travel & Earn</Link>
      </Text>
      <Button variant="primary_gradient" color="white">
        <Link to="/order">Create Order</Link>
      </Button>
    </Flex>
  )
}

export default observer(() => {
  if (UserStore.isLoggedIn) {
    return <AuthorizedNavbar />
  }
  return <DefaultNavbar />
})
