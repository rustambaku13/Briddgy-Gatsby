import ARating from "react-rating"
import { StarIcon, StarIconNoFill } from "../../icons/Star"
import React, { useState } from "react"
import { Box, Button, chakra, Radio } from "@chakra-ui/react"
import { ChevronLeftIcon } from "../../icons/ChevronLeft"
import { ChevronRightIcon } from "../../icons/ChevronRight"
const maxDisplayablePages = 4
export const Paginator = chakra(
  ({
    className,
    onSelect,
    itemsPerPage = 10,
    count,
  }: {
    className?: any
    onSelect: any
    itemsPerPage?: number
    count: number
  }) => {
    const [page, setPage] = useState(1)
    const pagesTotal = Math.max(1, Math.floor(count / itemsPerPage))
    const handleChange = ({ target: { value } }) => {
      if (value == page) return
      onSelect(parseInt(value))
      setPage(parseInt(value))
    }
    let indexBefore = page
    let indexAfter = page
    while (indexAfter - indexBefore + 1 <= maxDisplayablePages) {
      if (indexBefore == 1 && indexAfter == pagesTotal) {
        break
      }

      indexBefore = Math.max(1, indexBefore - 1)
      indexAfter = Math.min(pagesTotal, indexAfter + 1)
    }
    let pages = []
    if (indexBefore > 1) pages.push("...")

    while (indexBefore <= indexAfter) {
      pages.push(indexBefore)
      indexBefore++
    }
    if (indexAfter < pagesTotal) pages.push("...")
    return (
      <Box className={className}>
        <Button
          as="button"
          bg="white"
          textAlign="center"
          h="40px"
          w="40px"
          padding={1}
          borderRadius="sm"
          borderWidth="1px"
        >
          <ChevronLeftIcon />
        </Button>
        {pages.map(item => (
          <Box
            cursor="pointer"
            display="inline-flex"
            verticalAlign="middle"
            lineHeight="1.2"
            justifyContent="center"
            alignItems="center"
            _hover={{ bg: "gray.200" }}
            bg="white"
            as="option"
            _selected={{
              bg: "green.400",
            }}
            selected={true}
            disabled={item == "..."}
            onClick={handleChange}
            textAlign="center"
            value={item}
            h="40px"
            w="40px"
            padding={1}
            borderRadius="sm"
            borderWidth="1px"
          >
            {item}
          </Box>
        ))}

        <Button
          as="button"
          textAlign="center"
          h="40px"
          w="40px"
          bg="white"
          padding={1}
          borderRadius="sm"
          borderWidth="1px"
        >
          <ChevronRightIcon />
        </Button>
      </Box>
    )
  }
)
