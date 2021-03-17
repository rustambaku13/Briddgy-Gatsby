import React, { useCallback, useEffect, useMemo, useState } from "react"
import Upload from "rc-upload"
import { Box, Center, HStack } from "@chakra-ui/layout"
import ChatIcon from "../../icons/Chat"
import { Button, IconButton } from "@chakra-ui/button"
import { Img } from "@chakra-ui/image"
import { AlertIcon } from "@chakra-ui/alert"
import { MenuIcon } from "@chakra-ui/menu"
import { CrossIcon } from "../../icons/Cross"

const ImageUploader = ({ setFiles, file }) => {
  //   const [file, setFile] = useState(null)

  const onDrop = acceptedFiles => {
    let file = acceptedFiles[0]
    file = Object.assign(file, {
      preview: URL.createObjectURL(file),
    })
    setFiles(files => [...files, file])
  }
  const removeFile = () => {
    setFiles(files => files.filter(e => e !== file))
    // setFile(null)
  }

  if (file) {
    return (
      <Center
        fontSize="3xl"
        color="gray.400"
        borderStyle="dashed"
        fontWeight="200"
        borderWidth="1px"
        borderRadius="md"
        pos="relative"
        h="100px"
        w="100px"
      >
        <Center
          h="30px"
          w="30px"
          borderRadius="50%"
          onClick={removeFile}
          transition=".2s ease-in-out"
          cursor="pointer"
          _hover={{ color: "black" }}
          bg="transparent"
          pos="absolute"
          right="0px"
          top="0px"
          fontSize="md"
        >
          <CrossIcon />
        </Center>

        <Img maxH="100%" maxW="100%" src={file.preview} />
      </Center>
    )
  }
  return (
    <Upload
      accept="image/*"
      customRequest={data => {
        let file = data.file
        file = Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
        // setFile(file)
        setFiles(files => [...files, file])
      }}
    >
      <Center
        fontSize="3xl"
        color="gray.400"
        borderStyle="dashed"
        transition=".2s all"
        _hover={{ borderColor: "blue.400" }}
        fontWeight="200"
        borderWidth="1px"
        borderRadius="md"
        h="100px"
        w="100px"
      >
        +
      </Center>
    </Upload>
  )
}

export const GroupImageUploader = ({ maxCount = 4, files, register }) => {
  const [innerfiles, setFiles] = useState([])
  useEffect(() => {
    files.current = innerfiles
  }, [innerfiles])
  return (
    <>
      <HStack>
        {innerfiles.map(file => (
          <ImageUploader setFiles={setFiles} file={file} />
        ))}
        {innerfiles.length <= maxCount ? (
          <ImageUploader setFiles={setFiles} file={null} />
        ) : null}
      </HStack>
    </>
  )
}
