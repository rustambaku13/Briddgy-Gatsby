import { Box, HStack } from "@chakra-ui/layout"
import { observer } from "mobx-react-lite"
import React, { useEffect, useRef } from "react"
import { Drafty } from "tinode-sdk"
import MessageStore from "../../store/MessageStore"
import { Avatar } from "../Avatar/Avatar"
import { Loader } from "../Misc/Loader"
import { ReceiveMarkers } from "./ReceiveMarkers"
const ChatMessage = ({
  content,
  deleted,
  mimeType,
  timestamp,
  response,
  seq,
  userFrom,
  userName,
  userAvatar,
  sequence,
  received,
  uploader,
}) => {
  const sideClass = deleted
    ? "center"
    : sequence + " " + (response ? "left" : "right")
  const bubbleClass =
    sequence == "single" || sequence == "last" ? "bubble tip" : "bubble"
  const avatarDisplay =
    userFrom && response && (sequence == "single" || sequence == "first")
  let cnt = content
  if (mimeType == Drafty.getContentType() && Drafty.isValid(content)) {
    // Drafty.attachments(
    //   content,
    //   function (att, i) {
    //     if (att.mime == "application/json") {
    //       // Don't show json objects as attachments.
    //       // They are not meant for users.
    //       return
    //     }
    //     attachments.push(
    //       <Attachment
    //         tinode={this.props.tinode}
    //         downloadUrl={Drafty.getDownloadUrl(att)}
    //         filename={att.name}
    //         uploading={Drafty.isProcessing(att)}
    //         mimetype={att.mime}
    //         size={Drafty.getEntitySize(att)}
    //         progress={this.state.progress}
    //         onCancelUpload={this.handleCancelUpload}
    //         onError={this.props.onError}
    //         key={i}
    //       />
    //     )
    //   },
    //   this
    // )
    cnt = React.createElement(
      React.Fragment,
      null,
      Drafty.format(content, draftyFormatter, this)
    )
  } else if (deleted || typeof content != "string" || content == "") {
    cnt = null
  }

  return (
    <HStack
      overflow="hidden"
      maxW="80%"
      spacing={3}
      className={sideClass}
      as="li"
    >
      <Box
        h="auto"
        pos="relative"
        wordBreak="break-word"
        borderRadius="xl"
        bg="white"
        p={3}
        className={bubbleClass}
      >
        {cnt}
        {timestamp ? (
          <ReceiveMarkers timestamp={timestamp} received={received} />
        ) : null}
      </Box>
      {avatarDisplay ? (
        <Avatar h="12" w="12" user={userFrom} />
      ) : (
        <Box w="12" h="12"></Box>
      )}
    </HStack>
  )
}
const KeyPressDetector = observer(() => {
  return (
    <Box
      h="50px"
      maxH={MessageStore.typing ? "50px" : "0px"}
      transition=".5s ease"
      overflow="hidden"
      w="100px"
      ml="auto"
    >
      <Box
        h="auto"
        pos="relative"
        wordBreak="break-word"
        borderRadius="xl"
        bg="white"
        p={3}
      >
        Typing ...
      </Box>
    </Box>
  )
})
const NewMessageLoader = observer(() => {
  if (MessageStore.fetchingMoreMessages) {
    return <Loader />
  }
  return null
})

let isNewMessage = false
export const MessageList = observer(props => {
  const messageContainer = useRef(null)
  useEffect(() => {
    if (isNewMessage && messageContainer.current) {
      messageContainer.current.scrollTop = messageContainer.current.scrollHeight
    }
  })

  const handleScroll = event => {
    if (event.target.scrollTop <= 0) {
      MessageStore.loadMoreMessages()
    }
  }

  if (MessageStore.topicSelected == null) return <Loader />
  const topic = MessageStore.tinode.getTopic(MessageStore.topicSelected)
  const myUserId = MessageStore.tinode.getCurrentUserID()
  const messageNodes = []
  if (MessageStore.messages.length == 0) return
  isNewMessage = topic.isNewMessage(
    MessageStore.messages[MessageStore.messages.length - 1].seq
  )
  let previousFrom = null
  for (let i = 0; i < MessageStore.messages.length; i++) {
    let msg = MessageStore.messages[i]
    let nextFrom = null

    if (i + 1 < MessageStore.messages.length) {
      nextFrom = MessageStore.messages[i + 1].from
    }

    let sequence = "single"
    let thisFrom = msg.from
    if (thisFrom == previousFrom) {
      if (thisFrom == nextFrom) {
        sequence = "middle"
      } else {
        sequence = "last"
      }
    } else if (thisFrom == nextFrom) {
      sequence = "first"
    }
    previousFrom = thisFrom

    const isReply = !(thisFrom == myUserId)
    const deliveryStatus = topic.msgStatus(msg)

    const userFrom = topic.userDesc(thisFrom)

    messageNodes.push(
      <ChatMessage
        content={msg.content}
        deleted={msg.hi}
        mimeType={msg.head ? msg.head.mime : null}
        timestamp={msg.ts}
        response={isReply}
        seq={msg.seq}
        userFrom={userFrom}
        sequence={sequence}
        received={deliveryStatus}
        uploader={msg._uploader}
        // viewportWidth={this.props.viewportWidth}
        // showContextMenu={this.state.channel? false : this.handleShowContextMenuMessage}
        // onImagePreview={this.handleImagePostview}
        // onFormResponse={this.handleFormResponse}
        // onError={this.props.onError}
        // onCancelUpload={this.handleCancelUpload}
        key={msg.seq}
      />
    )
  }
  return (
    <Box
      p={3}
      height="100%"
      className="messages-container scrollbar"
      ref={messageContainer}
      onScroll={handleScroll}
      as="ul"
      w="100%"
    >
      <NewMessageLoader />
      {messageNodes}
      <KeyPressDetector />
    </Box>
  )
})

function draftyFormatter(style, data, values, key) {
  let el = Drafty.tagName(style)
  if (el) {
    const attr = Drafty.attrValue(style, data) || {}
    attr.key = key
    switch (style) {
      case "IM":
        // Additional processing for images
        // if (data) {
        //   attr.className = 'inline-image';
        //   const dim = fitImageSize(data.width, data.height,
        //     Math.min(this.props.viewportWidth - REM_SIZE * 4, REM_SIZE * 36), REM_SIZE * 24, false) ||
        //     {dstWidth: BROKEN_IMAGE_SIZE, dstHeight: BROKEN_IMAGE_SIZE};
        //   attr.style = { width: dim.dstWidth + 'px', height: dim.dstHeight + 'px' };
        //   if (!Drafty.isProcessing(data)) {
        //     attr.src = this.props.tinode.authorizeURL(sanitizeImageUrl(attr.src));
        //     attr.alt = data.name;
        //     if (attr.src) {
        //       attr.onClick = this.handleImagePreview;
        //       attr.className += ' image-clickable';
        //     } else {
        //       attr.src = 'img/broken_image.png';
        //     }
        //   } else {
        //     // Use custom element instead of <img>.
        //     el = UploadingImage;
        //   }
        // }
        break
      case "BN":
        // Button
        attr.onClick = this.handleFormButtonClick
        let inner = React.Children.map(values, child => {
          return typeof child == "string" ? child : undefined
        })
        if (!inner || inner.length == 0) {
          inner = [attr.name]
        }
        // Get text which will be sent back when the button is clicked.
        attr["data-title"] = inner.join("")
        break
      case "FM":
        // Form
        attr.className = "bot-form"
        break
      case "FE":
        // Form element formatting is dependent on element content.
        break
    }
    return React.createElement(el, attr, values)
  } else {
    return values
  }
}
