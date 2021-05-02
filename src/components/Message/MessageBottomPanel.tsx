import { IconButton } from "@chakra-ui/button"
import { Box, HStack, Text } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import AttachmentIcon from "../../icons/Attachment"
import ChatIcon from "../../icons/Chat"
import MessageStore, { KEYPRESS_DELAY } from "../../store/MessageStore"
export const MessageBottomPanel = observer(() => {
  const { register, handleSubmit, setValue, formState } = useForm()
  const [keypressTimestamp, setKeypressTimestamp] = useState(
    new Date().getTime()
  )
  const handleMessageTyping = e => {
    const newState = { message: e.target.value }

    const now = new Date().getTime()
    if (now - keypressTimestamp > KEYPRESS_DELAY) {
      MessageStore.sendKeyPress()
      setKeypressTimestamp(now)
    }
  }

  const textAreaKeyEnter = e => {
    const keyCode = e.which || e.keyCode

    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(submitMessage)()
    }
  }
  const submitMessage = ({ message }) => {
    const trimmedMessage = message.trim()
    if (trimmedMessage) {
      MessageStore.handleSendMessage(trimmedMessage)
      setValue("message", "")
    }
  }
  return (
    <Box h="auto" p={3} w="100%">
      <HStack
        onSubmit={handleSubmit(submitMessage)}
        p={3}
        borderRadius="xl"
        as="form"
        bg="white"
      >
        {/* <Text
          as="span"
          d="block"
          flex={1}
          maxW="100%"
          overflow="hidden"
          resize="vertical"
          minH="1.5rem"
          role="textbox"
          contentEditable
        ></Text> */}
        <Textarea
          onChange={handleMessageTyping}
          onKeyDown={textAreaKeyEnter}
          borderWidth="0"
          resize="none"
          _focus={{ border: "none", boxShadow: "none" }}
          h="1.5rem"
          className="scrollbar"
          minH="3rem"
          maxH="4.5rem"
          flex="1"
          placeholder="Write your message"
          ref={register({ required: true })}
          name="message"
        />
        <IconButton
          size="lg"
          aria-label="Attachment"
          icon={<AttachmentIcon />}
        />
        <IconButton
          type="submit"
          variant="success"
          size="lg"
          aria-label="Send Message"
          icon={<ChatIcon />}
        />
      </HStack>
    </Box>
  )
})
