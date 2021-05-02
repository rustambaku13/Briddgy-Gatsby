import { Badge, Box, Flex, HStack, Text } from "@chakra-ui/layout"
import { Link } from "gatsby-plugin-intl"
import { observer } from "mobx-react-lite"
import moment from "moment"
import React from "react"
import { ChevronLeftIcon } from "../../icons/ChevronLeft"
import MessageStore from "../../store/MessageStore"
import { Avatar } from "../Avatar/Avatar"
export const MessageTopPanel = observer(() => {
  let content = null
  if (MessageStore.topicSelected) {
    const topic = MessageStore.tinode.getTopic(MessageStore.topicSelected)
    content = (
      <>
        <Link to="/messages">
          <ChevronLeftIcon fontSize="600" />
        </Link>
        <Avatar user={topic.public} />
        <Text fontWeight="500">{`${topic.public.first_name} ${topic.public.last_name}`}</Text>
        <Text
          fontSize="300"
          color={
            MessageStore.topicSelectedOnline ? "success.base" : "text.medium"
          }
        >
          {MessageStore.topicSelectedOnline
            ? "Online"
            : moment(topic.touched).fromNow()}
        </Text>
      </>
    )
  }
  return (
    <HStack
      spacing={3}
      px={3}
      bg="white"
      h="60px"
      borderBottomWidth="1px"
      w="100%"
    >
      {content}
    </HStack>
  )
})
