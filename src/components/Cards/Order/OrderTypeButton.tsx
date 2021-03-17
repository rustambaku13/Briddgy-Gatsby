import { chakra, Box, Heading } from "@chakra-ui/react"
import Img from "gatsby-image"
import React, { useEffect, useRef } from "react"
import anime from "animejs/lib/anime.es.js"
export const OrderTypeButton = chakra(
  ({
    fixedImage,
    title,
    className,
  }: {
    fixedImage: any
    title: string
    className?: any
  }) => {
    const image = useRef(null)
    const text = useRef(null)
    useEffect(() => {
      if (image.current && text.current) {
        anime({
          targets: [image.current, text.current],
          translateX: [100, 0],
          opacity: [0, 1],
          duration: 1000,
          delay: anime.stagger(100),
          easing: "spring(1, 80, 10, 0)",
        })
      }
    }, [image.current, text.current])
    return (
      <Box
        overflow="hidden"
        bg="white"
        w="450px"
        minH="300px"
        pos="relative"
        cursor="pointer"
        transition=".2s ease-in-out"
        _hover={{
          bg: "gray.100",
          boxShadow: "lg",
        }}
        px={5}
        pt={8}
        borderRadius="10px"
        className={className}
        borderWidth="1px"
        boxShadow="md"
      >
        <Heading ref={text} w="190px" lineHeight="tall" fontSize="3xl">
          {title}
        </Heading>
        <Box pos="absolute" bottom="0" right="0" ref={image}>
          <Img fixed={fixedImage} />
        </Box>
      </Box>
    )
  }
)
