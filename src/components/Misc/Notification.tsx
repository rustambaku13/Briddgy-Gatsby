import {
  Box,
  Text,
  Center,
  Flex,
  IconButton,
  HStack,
  Divider,
  Button,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Notification } from "../../types/notification"
import BellIcon from "../../icons/BellIcon"
import { RefreshIcon } from "../../icons/Refresh"
import { Loader } from "../Misc/Loader"
import { Avatar } from "../Avatar/Avatar"
import UserStore from "../../store/UserStore"
import { observer } from "mobx-react-lite"
import moment from "moment"
import { FRONTEND_DATE_FORMAT } from "../../api"
import { Empty } from "./Empty"

const Item = ({ notification }: { notification: Notification }) => {
  switch(notification.verb){
    case "BID":
      return (
        <HStack p={3} spacing={3} cursor="pointer" _hover={{ bg: "outline.light" }}>
          <Center>
            <Avatar user={notification.sender} />
          </Center>
          <Box>
            <Text color="text.dark">You order has been cancelled</Text>
            <Text as="small" variant="secondary">
              {notification.date_created}
            </Text>
          </Box>
        </HStack>
      )

  }
  
}

export const NotificationDropdown = observer(() => {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (hidden && UserStore.notifications.loading) UserStore.fetchNotification()
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
        icon={<BellIcon />}
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
            <Item notification={item} />
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
