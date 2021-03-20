import {
  Box,
  chakra,
  Flex,
  Input,
  InputGroup,
  Spinner,
  Text,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { searchLocation } from "../../api/location"
import { LocationIcon } from "../../icons/Location"
import { Location } from "../../types/location"
import { trimCityEmpty } from "../../utils/misc"

let a = null
export const LocationAutoComplete = chakra(
  ({
    className,
    parentRef,
    size = "md",
    placeholder = "Where to",
    name,
  }: {
    className?: string
    placeholder?: string
    parentRef: any
    size?: "lg" | "md"
    name: string
  }) => {
    const [searching, setSearching] = useState(false)

    const [results, setResults] = useState([])
    const [hidden, setHidden] = useState(true)
    let inputRef = null
    let nameRef = null

    const fetchData = value => {
      searchLocation(value).then(({ data }) => {
        setResults(data.results)
        setSearching(false)
      })
    }
    const searchHandler = ({ target: { value } }) => {
      if (value.length && hidden) setHidden(false)
      else if (value.length == 0 && !hidden) {
        setHidden(true)
        inputRef.value = null
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
      inputRef.value = id
      nameRef.value = title
      document.activeElement.blur()
    }
    return (
      <Box pos="relative" className={className + " autocomplete"}>
        <InputGroup fontSize="inherit">
          <Input
            size={size}
            aria-haspopup="listbox"
            autoComplete="off"
            onChange={searchHandler}
            type="search"
            // ref={displayRef}
            name={name + "_name"}
            ref={e => {
              parentRef(e)
              nameRef = e
            }}
            border="none"
            placeholder={placeholder}
          />
          <input
            type="hidden"
            name={name}
            ref={e => {
              parentRef(e)
              inputRef = e
            }}
          />
        </InputGroup>
        <Box
          hidden={hidden}
          tabIndex={0}
          className="options-autocomplete"
          aria-autocomplete="list"
          bg="white"
          borderWidth="1px"
          fontSize="1em"
          borderRadius="md"
        >
          {searching ? (
            <Flex w="100%" justifyContent="center" alignItems="center" h="50px">
              <Spinner />
            </Flex>
          ) : (
            results.map((location: Location) => (
              <Box
                as="button"
                fontSize="1em"
                type="button"
                onClick={selectHandler}
                value={location.id}
                key={location.id}
                title={`${trimCityEmpty(location.city)}${location.country_en}`}
              >
                <LocationIcon />
                <Text as="h5">
                  {`${location.city || location.country_en}`}{" "}
                  <Text
                    ml="auto"
                    textTransform="uppercase"
                    as="span"
                    variant="secondary"
                  >
                    {location.city ? location.country_en.substr(0, 2) : ""}
                  </Text>
                </Text>
              </Box>
            ))
          )}
        </Box>
      </Box>
    )
  }
)
