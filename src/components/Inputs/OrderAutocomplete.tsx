import { Box, chakra, Flex, Input, Spinner } from "@chakra-ui/react"
import React, { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Location } from "../../types/location"

let a = null
export const OrderAutoComplete = chakra(
  ({
    className,
    size = "md",
    placeholder = "Where to",
    name,
  }: {
    className?: string
    placeholder?: string
    size?: "lg" | "md"
    name: string
  }) => {
    const [searching, setSearching] = useState(false)
    const [results, setResults] = useState([])
    const [hidden, setHidden] = useState(true)

    const fetchData = value => {
      // Fetch Data here
    }
    const searchHandler = ({ target: { value } }) => {
      if (value.length && hidden) setHidden(false)
      else if (value.length == 0 && !hidden) {
        setHidden(true)
        // inputRef.value = null
      }
      if (a) clearTimeout(a)
      a = setTimeout(fetchData, 300, value)
      setSearching(true)
    }
    const selectHandler = e => {
      const [id, title] = [
        e.currentTarget.getAttribute("value"),
        e.currentTarget.getAttribute("title"),
      ]
      // inputRef.value = id
      // nameRef.value = title
      document.activeElement.blur()
    }
    const methods = useFormContext()

    return (
      <Box
        pos="relative"
        fontSize="1em"
        className={className + " autocomplete"}
      >
        <Input
          size={size}
          aria-haspopup="listbox"
          autoComplete="off"
          onChange={searchHandler}
          type="search"
          h="100%"
          name={name + "_name"}
          ref={methods?.register({
            required: "Please enter either url or name",
          })}
          border="none"
          placeholder={placeholder}
        />
        <input type="hidden" name={name} ref={methods?.register({})} />

        <Box
          hidden={hidden}
          tabIndex={0}
          className="options-autocomplete"
          fontSize="md"
          aria-autocomplete="list"
          bg="white"
          borderWidth="1px"
          borderRadius="md"
        >
          {searching ? (
            <Flex w="100%" justifyContent="center" alignItems="center" h="50px">
              <Spinner />
            </Flex>
          ) : (
            results.map((location: Location) => <div>salam</div>)
          )}
        </Box>
      </Box>
    )
  }
)
