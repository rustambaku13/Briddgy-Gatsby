import {
  Box,
  chakra,
  Flex,
  Input,
  InputGroup,
  Spinner,
  Text,
} from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { searchLocation } from "../../api/location"
import { LocationIcon } from "../../icons/Location"
import { Location } from "../../types/location"

let a = null
export const LocationAutoComplete = chakra(
  ({
    className,
    parentRef,
    name,
  }: {
    className?: string
    parentRef: any
    name: string
  }) => {
    const [searching, setSearching] = useState(false)

    const [results, setResults] = useState([])
    const displayRef = useRef()
    const [hidden, setHidden] = useState(true)
    let inputRef = null

    const fetchData = value => {
      searchLocation(value).then(({ data }) => {
        setResults(data.results)
        setSearching(false)
      })
    }
    const searchHandler = ({ target: { value } }) => {
      if (value.length && hidden) setHidden(false)
      else if (value.length == 0 && !hidden) setHidden(true)
      if (a) clearTimeout(a)
      a = setTimeout(fetchData, 300, value)
      setSearching(true)
    }
    const selectHandler = e => {
      const [id, title] = [
        e.currentTarget.getAttribute("value"),
        e.currentTarget.getAttribute("title"),
      ]
      displayRef.current.value = title
      inputRef.value = id
      document.activeElement.blur()
    }
    return (
      <Box
        pos="relative"
        fontSize="1em"
        className={className + " autocomplete"}
      >
        <InputGroup>
          <Input
            aria-haspopup="listbox"
            autoComplete="off"
            onChange={searchHandler}
            ref={displayRef}
            fontSize="0.8em"
            border="none"
            placeholder="Where to?"
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
            results.map((location: Location) => (
              <Box
                as="button"
                onClick={selectHandler}
                value={location.id}
                key={location.id}
                title={`${location.city}, ${location.country_en}`}
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
