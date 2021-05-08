import {
  Box,
  chakra,
  Flex,
  Input,
  InputGroup,
  Spinner,
  Text,
} from "@chakra-ui/react"
import { graphql, StaticQuery } from "gatsby"
import React, { useState } from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { searchLocation } from "../../api/location"
import { LocationIcon } from "../../icons/Location"
import { Location } from "../../types/location"
import { getCountryFromCode, trimCityEmpty } from "../../utils/misc"
import { CountryFlagsLazy } from "../Misc/CountryFlagsLazy"

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
  ({ className, name, size, placeholder, error_msg, countries }) => {
    const { register, setValue } = useFormContext()

    const [hidden, setHidden] = useState(true)
    const [searching, setSearching] = useState(false)
    const [results, setResults] = useState([])
    const fetchData = value => {
      searchLocation(value)
        .then(({ data }) => {
          console.log(data)

          setResults(data)
          return data
        })

        .finally(() => {
          setSearching(false)
        })
    }
    const clear = () => {
      setHidden(true)
      setValue(name, undefined)
      setValue(name + "_id", undefined)
    }
    const searchHandler = ({ target: { value } }) => {
      if (value.length && hidden) setHidden(false)
      else if (value.length == 0 && !hidden) {
        clear()
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

      setValue(name + "_id", id)
      setValue(name, title)
      // setValue(name + "_input", title)
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
            name={name}
            ref={register({ required: error_msg })}
            border="none"
            placeholder={placeholder}
          />
          <input type="hidden" ref={register()} name={name + "_id"} />
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
            results.map((location: Location, index) => {
              return (
                <Box
                  as="button"
                  fontSize="1em"
                  type="button"
                  onClick={selectHandler}
                  data-type="city"
                  value={location._id.$oid}
                  key={index}
                  title={`${trimCityEmpty(location.city)}${location.country}`}
                >
                  <LocationIcon />
                  <Text as="h5">
                    {trimCityEmpty(location.city)}
                    <Text ml="auto" as="span" variant="secondary">
                      {location.country}
                    </Text>
                  </Text>
                  <CountryFlagsLazy />
                </Box>
              )
            })
          )}
        </Box>
      </Box>
    )
  }
)
