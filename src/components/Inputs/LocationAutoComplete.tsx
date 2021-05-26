import {
  Box,
  chakra,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ListIcon,
  MenuIcon,
  Spinner,
  Text,
} from "@chakra-ui/react"
import { graphql, StaticQuery } from "gatsby"
import React, { useState } from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { searchLocation } from "../../api/location"
import CrossIcon from "../../icons/Cross"
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
  ({ className, name, size, placeholder, error_msg,required }) => {
    const { register, setValue } = useFormContext()

    const [hidden, setHidden] = useState(true)
    const [searching, setSearching] = useState(false)
    const [results, setResults] = useState([])
    const fetchData = value => {
      searchLocation(value)
        .then(({ data }) => {      
          if(Array.isArray(data)){
            setResults(data)
          }
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
    function selectHandler(e) {
      
      
      const [id, title] = [
        e.target.getAttribute("data-value"),
        e.target.getAttribute("data-title"),
        
      ]
      setValue(name + "_id", id)
      setValue(name, title)
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
            type="text"
            name={name}
            ref={register({ required: error_msg })}
            border="none"
            placeholder={placeholder}
          />
          <InputRightElement>
          <IconButton onClick={clear}  minW='0' fontSize='200' aria-label='Clear' variant='link' icon={<CrossIcon/>}/></InputRightElement>
          <input type="hidden" ref={register({required:error_msg})} name={name + "_id"} />
          
        </InputGroup>
        <Box
          as='ul'
          hidden={hidden}
          tabIndex={0}
          className="options-autocomplete scrollbar"
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
                <Flex
                  cursor='pointer'
                  textAlign="center"
                  as="li"
                  fontSize="1em"
                  alignItems="center"
                  sx={{
                    ">*": {
                      pointerEvents: "none",
                    },
                  }}
                  onClick={selectHandler}
                  data-value={location._id.$oid}
                  data-title={`${trimCityEmpty(location.city)}${location.country}`}
                  key={index}
                >
                  <LocationIcon />
                  <Text fontWeight='400' as="h5">
                    {trimCityEmpty(location.city)}{" "}
                    <Text ml="auto" as="span" variant="secondary">
                      {location.country}
                    </Text>
                  </Text>
                  <CountryFlagsLazy
                    code={location.code}
                    country={location.country}
                  />
                </Flex>
              )
            })
          )}
        </Box>
      </Box>
    )
  }
)
