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
import { bmify } from "../../api"
import { ChevronDownIcon } from "../../icons/ChevronDown"
import { HomeIcon } from "../../icons/Home"
import LoginIcon from "../../icons/Login"
import LogoutIcon from "../../icons/Logout"
import OrderIcon from "../../icons/Order"
import { PlaneIcon } from "../../icons/Plane"
import ProfileIcon from "../../icons/Profile"
import SupportIcon from "../../icons/Support"
import TripIcon from "../../icons/Trip"
import logo from "../../images/icon_opaque.png"
import { NavigationContext } from "../../providers/navPage"
import UserStore from "../../store/UserStore"
import { AddOrderNavigationMenu } from "../Form/AddOrderForm"
import { AddTripFormNavigationMenu } from "../Form/AddTripForm"
import { BottomNavigationItem } from "./BottomNavbar/BottomNavigationItem"
let mouseListener = null

//  ******  Normal Navbars  *******
const AuthorizedNavbar = () => {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const context = useContext(NavigationContext)
  useEffect(() => {
    if (expanded) {
      mouseListener = event => {
        if (expanded) setExpanded(false)
      }
      window.addEventListener("wheel", mouseListener, false)
    }
    if (!expanded && mouseListener) {
      window.removeEventListener("wheel", mouseListener, false)
    }
    return () => {
      if (mouseListener) {
        window.removeEventListener("wheel", mouseListener, false)
      }
    }
  }, [expanded])
  return (
    <>
      <Flex
        as="nav"
        id={expanded ? "expanded" : ""}
        px={3}
        className="nav-top"
        pos="relative"
        h="68px"
        w="100%"
        borderBottom="1px solid"
        borderBottomColor="outline.medium"
      >
        <Flex h="100%" alignItems="center" flexShrink={0}>
          <Box h="100%" mr={[3, 7]} display="inline-flex" alignItems="center">
            <Link to="/">
              <Image h={[30, 45]} alt="Logo" src={logo} />
            </Link>

            <Link to="/">
              <Text fontSize={[500, 700]} ml={1} fontWeight="700">
                Briddgy
              </Text>
            </Link>
          </Box>
          <Text d={["none", "none", "inline-block"]} mr={[2, 2, 4]}>
            <Link
              className={
                context.page == "trips" ? "nav-item-selected" : "nav-item"
              }
              to="/trips"
            >
              Trips
            </Link>
          </Text>
          <Text mr={[2, 2, 4]} d={["none", "none", "inline-block"]}>
            <Link
              className={
                context.page == "orders" ? "nav-item-selected" : "nav-item"
              }
              to="/orders"
            >
              Orders
            </Link>
          </Text>
        </Flex>
        <Box w="100%" mx="auto">
          <AddOrderNavigationMenu
            expand={() => {
              setExpanded(true)
            }}
          />
          <AddTripFormNavigationMenu
            expand={() => {
              setExpanded(true)
            }}
          />
        </Box>
        <Flex ml={3} alignItems="center" flexShrink={0} h="100%">
          <LinkBox>
            <Link id="create_trip" to="/travel">
              <Text
                d={["none", "none", "none", "block"]}
                mr={4}
                fontWeight="7gat00"
              >
                <PlaneIcon mt="-2px" fontSize="600" color="cherryRed.base" />{" "}
                <Text
                  as="span"
                  bgGradient="linear(to-r,cherryRed.base,warning.dark)"
                  backgroundClip="text"
                >
                  Travel & Earn
                </Text>
              </Text>

              <IconButton
                variant="outline"
                color="black"
                bg="white"
                w="40px"
                d={{ md: "block", lg: "none" }}
                aria-label="Create Order"
                icon={<TripIcon fontSize="20px" />}
                mr={3}
              ></IconButton>
            </Link>
          </LinkBox>
          <LinkBox mr={[2, 2, 4]}>
            <Link id="create_order" to="/order">
              <Button
                fontWeight="600"
                d={["none", "none", "none", "inline-flex"]}
                variant="primary"
                color="white"
              >
                Create Order
              </Button>
              <IconButton
                d={{ md: "block", lg: "none" }}
                variant="primary_gradient"
                w="40px"
                aria-label="Create Order"
                icon={<OrderIcon fontSize="20px" />}
                mr={3}
              ></IconButton>
            </Link>
          </LinkBox>

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
            <MenuList zIndex={999} className="navbar-profile-menu">
              <LinkBox>
                <Link to="/profile?page=profile">
                  <MenuItem
                    icon={<ProfileIcon fontSize="lg" color="blue.600" />}
                  >
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
      </Flex>
      {expanded ? (
        <Box
          pos="absolute"
          zIndex={-1}
          left={0}
          p={0}
          m={0}
          w="100%"
          bg="rgba(0,0,0,0.4)"
          h="100vh"
          onClick={() => {
            setExpanded(false)
          }}
        ></Box>
      ) : null}
    </>
  )
}

const DefaultNavbar = () => {
  const [expanded, setExpanded] = useState(false)
  const context = useContext(NavigationContext)
  useEffect(() => {
    if (expanded) {
      mouseListener = event => {
        if (expanded) setExpanded(false)
        setExpanded(false)
      }
      window.addEventListener("wheel", mouseListener, false)
    }
    if (!expanded && mouseListener) {
      window.removeEventListener("wheel", mouseListener, false)
    }
    return () => {
      if (mouseListener) {
        window.removeEventListener("wheel", mouseListener, false)
      }
    }
  }, [expanded])
  return (
    <>
      <Flex
        as="nav"
        className="nav-top"
        id={expanded ? "expanded" : ""}
        px={3}
        pos="relative"
        h="68px"
        w="100%"
        borderBottom="1px solid"
        borderBottomColor="outline.medium"
      >
        <Flex h="100%" alignItems="center" flexShrink={0}>
          <Box h="100%" mr={[3, 7]} display="inline-flex" alignItems="center">
            <Link to="/">
              <Image h="45" alt="Logo" src={logo} />
            </Link>

            <Link to="/">
              <Text ml={1} fontSize={[500, 700]} fontWeight="700">
                Briddgy
              </Text>
            </Link>
          </Box>
          <Text d={["none", "none", "inline-block"]} mr={[2, 2, 4]}>
            <Link
              className={
                context.page == "trips" ? "nav-item-selected" : "nav-item"
              }
              to="/trips"
            >
              Trips
            </Link>
          </Text>
          <Text mr={[2, 2, 4]} d={["none", "none", "inline-block"]}>
            <Link
              className={
                context.page == "orders" ? "nav-item-selected" : "nav-item"
              }
              to="/orders"
            >
              Orders
            </Link>
          </Text>
        </Flex>
        <Box w="100%" mx="auto">
          <AddOrderNavigationMenu
            expand={() => {
              setExpanded(true)
            }}
          />
          <AddTripFormNavigationMenu
            expand={() => {
              setExpanded(true)
            }}
          />
        </Box>
        <Flex ml={3} alignItems="center" flexShrink={0} h="100%">
          <Text d={["none", "none", "none", "inline-block"]} ml="auto" mr={4}>
            <Link className="nav-item" to="/login">
              Login
            </Link>
          </Text>
          <Text d={["none", "none", "none", "inline-block"]} mr={4}>
            <Link
              className={
                context.page == "signup" ? "nav-item-selected" : "nav-item"
              }
              to="/signup"
            >
              Sign Up
            </Link>
          </Text>
          <LinkBox>
            <Link id="create_trip" to="/travel">
              <Text
                d={["none", "none", "none", "block"]}
                mr={4}
                fontWeight="600"
              >
                <PlaneIcon mt="-2px" fontSize="600" color="cherryRed.base" />{" "}
                <Button
                  variant="red_gradient"
                  px={0}
                  // bgGradient="linear(to-r,cherryRed.base,warning.dark)"
                  as="span"
                  backgroundClip="text"
                >
                  Travel & Earn
                </Button>
              </Text>

              <IconButton
                variant="outline"
                color="black"
                bg="white"
                w="40px"
                d={{ md: "block", lg: "none" }}
                aria-label="Create Order"
                icon={<TripIcon fontSize="20px" />}
                mr={3}
              ></IconButton>
            </Link>
          </LinkBox>
          <LinkBox>
            <Link id="create_order" to="/order">
              <Button
                fontWeight="600"
                d={["none", "none", "none", "inline-flex"]}
                variant="primary"
                color="white"
              >
                Create Order
              </Button>
              <IconButton
                d={{ md: "block", lg: "none" }}
                variant="primary_gradient"
                w="40px"
                aria-label="Create Order"
                icon={<OrderIcon fontSize="20px" />}
                mr={3}
              ></IconButton>
            </Link>
          </LinkBox>
        </Flex>
      </Flex>
      {expanded ? (
        <Box
          pos="absolute"
          zIndex={-1}
          left={0}
          p={0}
          m={0}
          w="100%"
          bg="rgba(0,0,0,0.4)"
          h="100vh"
          onClick={() => {
            setExpanded(false)
          }}
        ></Box>
      ) : null}
    </>
  )
}

//  ****** Exceptional Navbar Designs  *******
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
    <>
      <header
        ref={ref}
        className={isSticky ? " isSticky" : ""}
        id="order-navbar"
      >
        <NavbarDefault />
      </header>{" "}
    </>
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
    <>
      <header
        ref={ref}
        className={isSticky ? " isSticky" : ""}
        id="travel-navbar"
      >
        <NavbarDefault />
      </header>
    </>
  )
}
//  ****** Wrapper  *******

const NavbarDefault = observer(() => {
  if (UserStore.isLoggedIn) {
    return <AuthorizedNavbar />
  }
  return <DefaultNavbar />
})

export default () => <NavbarDefault />
