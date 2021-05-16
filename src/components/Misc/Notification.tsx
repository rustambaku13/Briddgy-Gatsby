import {
  Badge,
  Box,






  Button, Center,



  Divider, Flex,

  HStack, IconButton, Text
} from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import BellIcon from "../../icons/BellIcon"
import { RefreshIcon } from "../../icons/Refresh"
import UserStore from "../../store/UserStore"
import { Notification } from "../../types/notification"
import { BACKEND_CONTENT_TYPE } from "../../utils/contentType"
import { Avatar } from "../Avatar/Avatar"
import { Loader } from "../Misc/Loader"
import { Empty } from "./Empty"
import { LinkOverlay } from "./LinkOverlay"


const NotificationCore = ({notification,text}:{notification:Notification,text:string})=>{
  return(
    <Box pos='relative' _hover={{ bg: "outline.light" }}>
        <LinkOverlay   to={`/${BACKEND_CONTENT_TYPE[notification.content_type]}/${notification.object_id}`}>
          <HStack p={3} spacing={3}  >
          <Center>
            <Avatar user={notification.sender} />
          </Center>
          <Box>
            <Text color="text.dark">{text}</Text>
            <Text as="small" variant="secondary">
              {notification.date_created}
            </Text>
          </Box></HStack>
        </LinkOverlay>
        </Box>
  )
}

const TEXTS = {
  "BID":"You have a new proposal",
  "SET":"Deal has been settled",
  "GRB":"Traveler has grabbed your item",
  "DLV":"Orderer has confirmed your deliver. Payout has started",
  "DEL":"Deal has been canceled",

}



const NotificationIconWithBadge = observer(() => {
  return (
    <Box pos="relative">
      <BellIcon fontSize="18px" />
      <Badge
        borderRadius="base"
        bg="danger.base"
        color="white"
        fontWeight="500"
        d={UserStore.me.unread_notifications > 0 ? "block" : "none"}
        pos="absolute"
        right="0"
        top="0"
        transform="translate(50%,-50%)"
      >
        {UserStore.me.unread_notifications > 99 ? 99 : UserStore.me.unread_notifications}
      </Badge>
    </Box>
  )
})

export const NotificationDropdown = observer(() => {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (hidden && UserStore.notifications.loading) UserStore.fetchNotification()
    if(!hidden && !UserStore.notifications.loading) UserStore.readNotification()
  }, [hidden])
  return (
    
    <Box pos="relative" className="notification" mr={[2, 3, 4]}>
      
      <IconButton
        variant="outline"
        w="40px"
        onClick={() => {
          setHidden(false)
        }}
        outline="none"
        aria-label="notification icon"
        bg="white"
        borderWidth="1px"
        borderColor="tealBlue.base"
        color="tealBlue.base"
        icon={<NotificationIconWithBadge />}
      ></IconButton>
      <Box
        opacity={hidden ? 0 : 1}
        tabIndex={0}
        className="list"
        aria-autocomplete="list"
        bg="white"
        py={2}
        borderWidth="1px"
        fontSize="1em"
        borderRadius="xl"
        boxShadow="md"
      >
        <Flex justifyContent="flex-end" w="100%">
          <Text pl={3} mr='auto' variant='secondary'>
          Notifications
          </Text>
          <IconButton
            aria-label="Refresh"
            outline="none"
            icon={<RefreshIcon />}
            color="tealBlue.base"
            variant="link"
            onClick={() => {
              UserStore.fetchNotification()
            }}
            size="sm"
          >
            Load more
          </IconButton>
        </Flex>
        <Divider my={2} />
        {UserStore.notifications.loading ? (
          <Loader />
        ) : (
          UserStore.notifications.results.length?UserStore.notifications.results.map(item => (
            <NotificationCore notification={item} text={TEXTS[item.state]}/>
          )):<Empty text='No Notifications'/>
        )}

        {UserStore.notifications.next ? (
          <>
            <Divider my={2} />
            <Flex justifyContent="center" w="100%">
              <Button color="tealBlue.base" variant="link" size="sm">
                Load more
              </Button>
            </Flex>
          </>
        ) : null}
      </Box>
    </Box>
  )
})
