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
import { ApiLocation, Location } from "../../types/location"
import { getCountryFromCode, trimCityEmpty } from "../../utils/misc"

let a = null
// export const CountryDecode = ({ countryCode }) => {
//   return (
//     <StaticQuery
//       query={graphql`
//         query {
//           allCountry {
//             nodes {
//               key
//               iso_a3
//               value
//             }
//           }
//         }
//       `}
//       render={data => {
//         const country = data.allCountry.nodes.filter(
//           country => country.key == countryCode
//         )
//         console.log(country)

//         return ""
//       }}
//     />
//   )
// }

const MAX_COUNTRIES_PER_REQUEST = 10
const searchFromArray = (countries: any[], prefix) => {
  return countries
    .filter((country: { value: string }) => {
      return country.value.toLowerCase().startsWith(prefix.toLowerCase())
    })
    .slice(0, MAX_COUNTRIES_PER_REQUEST)
}
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
const LocationAutoCompleteInner = chakra(
  ({ className, name, size, placeholder, error_msg, countries }) => {
    const { register, setValue } = useFormContext()

    const [hidden, setHidden] = useState(true)
    const [searching, setSearching] = useState(false)
    const [results, setResults] = useState([])
    const fetchData = value => {
      searchLocation(value)
        .then(({ data }) => {
          return data
        })
        .then(data => {
          const countriesData = searchFromArray(countries, value)
          setResults([...countriesData, ...data])
        })
        .catch(() => {
          const countriesData = searchFromArray(countries, value)
          setResults([...countriesData])
        })
        .finally(() => {
          setSearching(false)
        })
    }
    const clear = () => {
      setHidden(true)
      setValue(name, undefined)
      setValue(name + "_id", undefined)
      setValue(name + "_code", undefined)
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
      if (type == "city") {
        // City was selected
        setValue(name + "_id", id)
        setValue(name + "_code", undefined)
        setValue(name, title)
        // setValue(name + "_input", title)
      } else {
        // Country was selected
        setValue(name + "_id", undefined)
        setValue(name + "_code", id)
        setValue(name, title)
        // setValue(name + "_input", title)
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
            name={name}
            ref={register({ required: error_msg })}
            border="none"
            placeholder={placeholder}
          />
          <input type="hidden" ref={register()} name={name + "_id"} />
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
            results.map((location: ApiLocation) => {
              if (location.iso_a3) {
                return (
                  <Box
                    as="button"
                    fontSize="1em"
                    type="button"
                    onClick={selectHandler}
                    data-type="country"
                    value={location.key}
                    key={location.key}
                    title={`${location.value}`}
                  >
                    <LocationIcon />
                    <Text as="h5">{location.value}</Text>
                  </Box>
                )
              }
              const country = getCountryFromCode(location.iso_a2, countries)
              return (
                <Box
                  as="button"
                  fontSize="1em"
                  type="button"
                  onClick={selectHandler}
                  data-type="city"
                  value={location.key}
                  key={location.key}
                  title={`${trimCityEmpty(location.value)}${country}`}
                >
                  <LocationIcon />
                  <Text as="h5">
                    {trimCityEmpty(location.value)}
                    <Text ml="auto" as="span" variant="secondary">
                      {country}
                    </Text>
                  </Text>
                </Box>
              )
            })
          )}
        </Box>
      </Box>
    )
  }
)

export const LocationAutoComplete = props => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allCountry {
            nodes {
              key
              iso_a3
              value
            }
          }
        }
      `}
      render={data => (
        <LocationAutoCompleteInner
          countries={data.allCountry.nodes}
          {...props}
        />
      )}
    />
  )
}
