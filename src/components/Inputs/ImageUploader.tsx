import { Img } from "@chakra-ui/image"
import { Box, Center, HStack } from "@chakra-ui/layout"
import Upload from "rc-upload"
import React, { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { CrossIcon } from "../../icons/Cross"

/**
 This module is about Image upload in Create Order page
 
 */

const ImageUploader = ({ setFiles }) => {
  return (
    <Upload
      accept="image/*"
      multiple
      customRequest={data => {
        let file = data.file
        file = Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
        setFiles(files => [...files, file])
      }}
    >
      <Center
        mb={2}
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

const ImageDisplayer = ({ file, setFiles }) => {
  const removeFile = () => {
    setFiles(files => files.filter(e => e !== file))
    // setFile(null)
  }
  return (
    <Center
      mb={2}
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

export const GroupImageUploader = ({ maxCount = 4, files }) => {
  const [innerfiles, setFiles] = useState([])
  const { register, setValue, getValues } = useFormContext()
  // console.log(methods)
  useEffect(() => {
    files.current = innerfiles
  }, [innerfiles])
  return (
    <>
      <HStack flexWrap="wrap">
        <input
          type="hidden"
          value={innerfiles.length}
          name="files"
          multiple
          ref={register({
            min: { value: 1, message: "Please upload at least 1 image" },
          })}
        />
        {innerfiles.map(file => (
          <ImageDisplayer setFiles={setFiles} file={file} />
        ))}
        {innerfiles.length <= maxCount ? (
          <ImageUploader setFiles={setFiles} />
        ) : null}
      </HStack>
    </>
  )
}
