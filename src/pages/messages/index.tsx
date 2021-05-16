import { Box, Flex, VStack } from "@chakra-ui/layout"
import { Router } from "@reach/router"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import Helmet from "react-helmet"
import { MessageBottomPanel } from "../../components/Message/MessageBottomPanel"
import { MessageList } from "../../components/Message/MessageList"
import { MessageTopPanel } from "../../components/Message/MessageTopPanel"
import { RoomList } from "../../components/Message/RoomList"
import Navbar from "../../components/Navbar"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { NavigationContext } from "../../providers/navPage"
import MessageStore from "../../store/MessageStore"
const MessagesSelected = ({ selectedRoom }) => {
  useEffect(() => {
    if (!selectedRoom || selectedRoom.length == 0) return

    MessageStore.handleStartTopicRequest(selectedRoom)
  }, [selectedRoom])
  useEffect(()=>{
    return () => {
      if (MessageStore.topicSelected) {
        MessageStore.setTopicSelected = null
      }
    }
  },[])
  return (
    <>
      <Helmet title="Briddgy | Messages" defer={false}>
        <meta name="description" content="My Messages" />
      </Helmet>
      <NavigationContext.Provider value={{ page: "message" }}>
        <Navbar />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Flex
        className="chat"
        mt={[0, 0, 12]}
        h={["calc(100vh - 140px)", "calc(100vh - 140px)", "70vh"]}
        mx="auto"
        overflow="hidden"
        // borderRadius="xl"
        borderWidth={["0", "0", "1px"]}
        boxShadow="elevation_5"
        w="auto"
        maxW="container.xl"
      >
        <RoomList d={["none", "none", "block"]} />
        <VStack overflow="hidden" bg="outline.light" spacing={0} flex={1}>
          <MessageTopPanel />
          <Box overflow="hidden" w="100%" flex="1">
            <MessageList />
          </Box>
          <MessageBottomPanel />
        </VStack>
      </Flex>
    </>
  )
}
const MessagesWithRoom = props => {
  useEffect(() => {
    if (MessageStore.topicSelected) {
      MessageStore.setTopicSelected = null
    }
  }, [])
  return (
    <>
      <Helmet title="Briddgy | Messages" defer={false}>
        <meta name="description" content="My Messages" />
      </Helmet>
      <NavigationContext.Provider value={{ page: "message" }}>
        <Navbar />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Flex
        className="chat"
        mt={[0, 0, 12]}
        h={["calc(100vh - 140px)", "calc(100vh - 140px)", "70vh"]}
        mx="auto"
        overflow="hidden"
        // borderRadius="xl"
        borderWidth={["0", "0", "1px"]}
        boxShadow="elevation_5"
        w="auto"
        maxW="container.xl"
      >
        <RoomList />
      </Flex>
    </>
  )
}

const Messages = observer(() => {
  useEffect(() => {
    MessageStore.pageOpen = true
    return () => {
      MessageStore.pageOpen = false
    }
  }, [])
  if (!MessageStore.isChatReady) {
    return <MessagesWithRoom />
  }
  return (
    <Router basepath="/messages">
      <MessagesSelected path="/:selectedRoom/" />
      <MessagesWithRoom default />
    </Router>
  )
})

export default Messages
