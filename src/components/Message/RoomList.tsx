import { Badge, Box, chakra, Flex, Text } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React from "react"
import MessageStore from "../../store/MessageStore"
import { Avatar } from "../Avatar/Avatar"
import { LinkOverlay } from "../Misc/LinkOverlay"
import { Loader } from "../Misc/Loader"
const RoomItem = observer(({ room }) => {
  const selected = MessageStore.topicSelected == room.topic

  return (
    <Flex
      px={4}
      alignItems="center"
      h="20"
      w="100%"
      className="item"
      borderBottomWidth="1px"
      aria-selected={selected}
      _hover={{ bg: "outline.light", _before: { opacity: 1 } }}
      _selected={{ bg: "outline.light", _before: { opacity: 1 } }}
      _before={{ bg: "tealBlue.base", opacity: 0 }}
    >
      <Avatar w="14" h="14" mr={3} user={room.public} />
      <Box w="100%">
        <LinkOverlay to={`/messages/${room.topic}/`}>
          <Text as="strong" fontSize="500">
            {`${room.public.first_name} ${room.public.last_name}`}
          </Text>
        </LinkOverlay>
        <Text className="clamp-1" fontSize="400" variant="secondary">
          {room.unread == 0 ? null : (
            <Badge color="white" bg="danger.base">
              {room.unread}
            </Badge>
          )}
        </Text>
      </Box>
    </Flex>
  )
})

export const RoomList = chakra(
  observer(({ className }) => {
    return (
      <Box
        overflowY="auto"
        className={"chat-room scrollbar" + " " + className}
        borderRightWidth="1px"
        flex={["0 0 100%", "0 0 100%", "0 0 300px"]}
      >
        {MessageStore.isChatReady ? (
          MessageStore.chatList.map(room => (
            <>
              <RoomItem room={room} />
            </>
          ))
        ) : (
          <Loader />
        )}
      </Box>
    )
  })
)
