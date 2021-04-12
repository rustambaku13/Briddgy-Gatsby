import React, { useContext, useEffect, useState } from "react"
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
  chakra,
  AspectRatio,
} from "@chakra-ui/react"

export const ImagesContext = React.createContext({
  images: [],
  selected: null,
  select: img => {},
})

export const ImageViewer = ({ images, children }) => {
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    setSelected(images?.[0] || null)
  }, [images])
  return (
    <ImagesContext.Provider
      value={{
        images,
        selected,
        select: setSelected,
      }}
    >
      {children}
    </ImagesContext.Provider>
  )
}

ImageViewer.LargeImage = () => {
  const context = useContext(ImagesContext)
  return <Img src={context.selected?.preview} />
}

ImageViewer.ImageThumbnails = chakra(({ className }) => {
  const context = useContext(ImagesContext)
  const onSelect = e => {
    e.preventDefault()
    context.select(context.images[e.currentTarget.value])
  }
  const thumbnails = context.images.map((item, index) => {
    return (
      <AspectRatio
        as="button"
        onClick={onSelect}
        value={index}
        h="12"
        w="12"
        outline="none"
        className={className}
        zIndex="1"
        borderWidth="1px"
        borderRadius="md"
        boxShadow={item == context.selected ? "lg" : "none"}
      >
        <Img zIndex="-1" src={item.preview} />
      </AspectRatio>
    )
  })
  return <VStack mr="3">{thumbnails}</VStack>
})

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
