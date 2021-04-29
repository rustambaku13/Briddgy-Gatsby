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

const Item = ({ notification }: { notification: Notification }) => {
  return (
    <HStack p={3} spacing={3} cursor="pointer" _hover={{ bg: "outline.light" }}>
      <Center>
        <Avatar user={notification.sender} />
      </Center>
      <Box>
        <Text color="text.dark">You order has been cancelled</Text>
        <Text as="small" variant="secondary">
          {moment(notification.date).format(FRONTEND_DATE_FORMAT)}
        </Text>
      </Box>
    </HStack>
  )
}

export const NotificationDropdown = observer(() => {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (hidden && UserStore.notifications.loading) UserStore.fetchNotification()
  }, [hidden])
  return (
    <Box pos="relative" className="notification" mr={[2, 3, 4]}>
      <IconButton
        onClick={() => {
          setHidden(false)
        }}
        aria-label="notification icon"
        bg="lilaPurple.light"
        color="lilaPurple.dark"
        icon={<BellIcon />}
      ></IconButton>
      <Box
        // hidden={hidden}
        // visibility={hidden ? "hidden" : "visible"}
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
          <IconButton
            aria-label="Refresh"
            outline="none"
            icon={<RefreshIcon />}
            color="tealBlue.base"
            variant="link"
            size="sm"
          >
            Load more
          </IconButton>
        </Flex>
        <Divider my={2} />
        {UserStore.notifications.loading ? (
          <Loader />
        ) : (
          UserStore.notifications.results.map(item => (
            <Item notification={item} />
          ))
        )}

        {!UserStore.notifications.next ? (
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
