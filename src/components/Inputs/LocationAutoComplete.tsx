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
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { searchLocation } from "../../api/location"
import { LocationIcon } from "../../icons/Location"
import { ApiLocation, Location } from "../../types/location"
import { trimCityEmpty } from "../../utils/misc"

let a = null

/**
 *
 * This is location autocomplete that is used everywhere
 * @tutorial
 * Has to be wrapped in a FormProvider from react hook form
 * @var {hidden} // When the Bottom List is Hidden
 * @var {searching} // When the Currently there is a search going on
 * @var {results} // Listed Cities
 * @method <searchHander> // Firing each time our input is altered
 * @method <fetchData> // Actually fetch api and populate the results
 * @method <selecthandler> // Populate hidden input fields on selecting the option
 */
export const LocationAutoComplete = chakra(
  ({ className, name, size, placeholder, error_msg }) => {
    const { register, setValue } = useFormContext()
    const [hidden, setHidden] = useState(true)
    const [searching, setSearching] = useState(false)
    const [results, setResults] = useState([])
    const fetchData = value => {
      searchLocation(value)
        .then(({ data }) => {
          setResults(data)
          setSearching(false)
        })
        .catch(() => {
          setResults([])
          setSearching(false)
        })
    }
    const searchHandler = ({ target: { value } }) => {
      if (value.length && hidden) setHidden(false)
      else if (value.length == 0 && !hidden) {
        setHidden(true)
        setValue(name + "_id", undefined)
        setValue(name + "_code", undefined)
      }
      if (a) clearTimeout(a)
      a = setTimeout(fetchData, 400, value)
      setSearching(true)
    }
    const selectHandler = e => {
      const [id, title, type] = [
        e.currentTarget.getAttribute("value"),
        e.currentTarget.getAttribute("title"),
        e.currentTarget.getAttribute("data-type"),
      ]

      if (type == "city") {
        // City was selected
        setValue(name + "_id", id)
        setValue(name + "_code", undefined)
        setValue(name, title)
        setValue(name + "_input", title)
      } else {
        // Country was selected
      }
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
            name={name + "_input"}
            ref={register()}
            border="none"
            placeholder={placeholder}
          />
          <input type="hidden" ref={register()} name={name + "_id"} />
          <input
            type="hidden"
            ref={register({ required: error_msg })}
            name={name}
          />
          <input type="hidden" ref={register()} name={name + "_code"} />
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
            results.map((location: ApiLocation) => (
              <Box
                as="button"
                fontSize="1em"
                type="button"
                onClick={selectHandler}
                data-type="city"
                value={location.key}
                key={location.key}
                title={`${trimCityEmpty(location.value)}${location.iso_a2}`}
              >
                <LocationIcon />
                <Text as="h5">
                  {trimCityEmpty(location.value)}
                  <Text
                    ml="auto"
                    textTransform="uppercase"
                    as="span"
                    variant="secondary"
                  >
                    {location.iso_a2}
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
