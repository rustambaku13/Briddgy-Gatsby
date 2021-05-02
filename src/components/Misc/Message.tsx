import { Badge, Box, IconButton } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React from "react"
import ChatIcon from "../../icons/Chat"
import MessageStore from "../../store/MessageStore"

export const MessageIconWithBadge = observer(() => {
  return (
    <Box pos="relative">
      <ChatIcon fontSize="18px" />
      <Badge
        borderRadius="base"
        bg="danger.base"
        color="white"
        fontWeight="500"
        d={MessageStore.unread > 0 ? "block" : "none"}
        pos="absolute"
        right="0"
        top="0"
        transform="translate(50%,-50%)"
      >
        {MessageStore.unread > 99 ? 99 : MessageStore.unread}
      </Badge>
    </Box>
  )
})

export const Messages = observer(() => {
  return (
    // <Box pos="relative">
    <IconButton
      variant="outline"
      w="40px"
      outline="none"
      bg="white"
      borderWidth="1px"
      borderColor="tealBlue.base"
      color="tealBlue.base"
      aria-label="Messages"
      icon={<MessageIconWithBadge />}
    ></IconButton>
  )
})
