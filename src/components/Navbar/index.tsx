import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Image,
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
import React, { useEffect, useRef, useState } from "react"
import { bmify } from "../../api"
import UserStore from "../../store/UserStore"
import { ChevronDownIcon } from "../../icons/ChevronDown"
import ProfileIcon from "../../icons/Profile"
import TripIcon from "../../icons/Trip"
import OrderIcon from "../../icons/Order"
import LogoutIcon from "../../icons/Logout"
import SupportIcon from "../../icons/Support"
import { flowResult } from "mobx"
import { AddOrderForm, AddOrderTopSearch } from "../Form/AddOrderForm"
import logo from "../../images/icon_opaque.png"
const AuthorizedNavbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <Flex
      as="nav"
      p={3}
      alignItems="center"
      w="100%"
      h="inherit"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
    >
      <Box display="inline-flex" alignItems="center" mr={10} as="h1">
        <Image h="45" w="45" src={logo} />
        <Link to="/">
          <Text ml={1} fontSize="lg" fontWeight="600">
            Briddgy
          </Text>
        </Link>
      </Box>
      <Text mr={7} display="inline-block">
        <Link to="/trips">Trips</Link>
      </Text>
      <Text mr={7} display="inline-block">
        <Link to="/orders">Orders</Link>
      </Text>
      <AddOrderTopSearch
        mx="auto"
        maxW="400px"
        text="+"
        visibility="hidden"
        h="50px"
        color="black"
      />
      <Box ml="auto"></Box>
      <Text id="create_trip" display="inline-block" mr={7}>
        <Link to="/travel">Travel & Earn</Link>
      </Text>
      <Button id="create_order" mr={7} variant="primary_gradient" color="white">
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
        <MenuList className="navbar-profile-menu">
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
      h="inherit"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
    >
      <Box display="inline-flex" alignItems="center" mr={10} as="h1">
        <Image h="45" w="45" src={logo} />
        <Link to="/">
          <Text ml={1} fontSize="lg" fontWeight="600">
            Briddgy
          </Text>
        </Link>
      </Box>
      <Text mr={7} display="inline-block">
        <Link to="/trips">Trips</Link>
      </Text>
      <Text mr={7} display="inline-block">
        <Link to="/orders">Orders</Link>
      </Text>
      <AddOrderTopSearch
        mx="auto"
        maxW="400px"
        text="+"
        visibility="hidden"
        h="50px"
        color="black"
      />

      <Text ml="auto" mr={7} display="inline-block">
        <Link to="/login">Login</Link>
      </Text>
      <Text display="inline-block" mr={7}>
        <Link to="/signup">Sign Up</Link>
      </Text>
      <Text id="create_trip" display="inline-block" mr={7}>
        <Link to="/travel">Travel & Earn</Link>
      </Text>
      <Button id="create_order" variant="primary_gradient" color="white">
        <Link to="/order">Create Order</Link>
      </Button>
    </Flex>
  )
}

const NavbarDefault = observer(() => {
  if (UserStore.isLoggedIn) {
    return <AuthorizedNavbar />
  }
  return <DefaultNavbar />
})

export const OrderNavbar = () => {
  const ref = useRef()
  const [isSticky, setIsSticky] = useState(false)
  useEffect(() => {
    const cachedRef = ref.current
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      { threshold: [1] }
    )

    observer.observe(cachedRef)
    return function () {
      observer.unobserve(cachedRef)
    }
  }, [])
  return (
    <div ref={ref} className={isSticky ? " isSticky" : ""} id="order-navbar">
      <NavbarDefault />
    </div>
  )
}

export const TravelNavbar = () => {
  const ref = useRef()
  const [isSticky, setIsSticky] = useState(false)
  useEffect(() => {
    const cachedRef = ref.current
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      { threshold: [1] }
    )

    observer.observe(cachedRef)
    return function () {
      observer.unobserve(cachedRef)
    }
  }, [])
  return (
    <div ref={ref} className={isSticky ? " isSticky" : ""} id="travel-navbar">
      <NavbarDefault />
    </div>
  )
}

export default () => (
  <Box h="55px">
    <NavbarDefault />
  </Box>
)
