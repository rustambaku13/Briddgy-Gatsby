import React, { useEffect, useState } from "react"
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Img,
  Flex,
  VStack,
  Box,
} from "@chakra-ui/react"
function ImageThumbnailViewer({ images }) {
  const [selectedImage, setSelectedImage] = useState({})
  const onSelect = e => {
    e.preventDefault()
    setSelectedImage(images[e.currentTarget.value])
  }
  useEffect(() => {
    if (images.length) setSelectedImage(images[0])
  }, [images])
  const thumbnails = images.map((item, index) => {
    return (
      <Center
        as="button"
        onClick={onSelect}
        value={index}
        h="50px"
        w="50px"
        zIndex="1"
        borderWidth="1px"
        borderRadius="md"
        bg="white"
      >
        <Img zIndex="-1" src={item.preview} />
      </Center>
    )
  })
  return (
    <Flex>
      <VStack mr="3">{thumbnails}</VStack>
      <Center flexGrow={1}>
        <Img src={selectedImage.preview} />
      </Center>
    </Flex>
  )
}
export default ImageThumbnailViewer
