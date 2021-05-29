import { Select,Box,Text,InputGroup,Input,InputRightElement,IconButton, Flex, Spinner } from "@chakra-ui/react"
import { graphql, StaticQuery } from "gatsby"
import React, { useState } from "react"
import { render } from "react-dom"
import { useFormContext } from "react-hook-form"
import CrossIcon from "../../icons/Cross"
import { LocationIcon } from "../../icons/Location"
import { Location } from "../../types/location"
import { CountryFlagsLazy } from "../Misc/CountryFlagsLazy"
let a = null
const AutoCompleteWrapper = ({name,error_msg,countries,className}:{countries:Location[],name:string,error_msg:string})=>{
    
    const { register, setValue } = useFormContext()
    const [results,setResults] = useState([])
    const [hidden, setHidden] = useState(true)
    const [searching, setSearching] = useState(false)
    const fetchData = value => {
        setResults(countries.filter((item)=>item.country.startsWith(value)))
        setSearching(false)
          
      }
    const clear = () => {
        setHidden(true)
        setValue(name, undefined)
        setValue(name + "_id", undefined)
        setValue(name + "_currency", undefined)
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
      
      
        const [id, title,currency] = [
          e.target.getAttribute("data-value"),
          e.target.getAttribute("data-title"),
          e.target.getAttribute("data-currency"),
        ]
        setValue(name + "_id", id)
        setValue(name + "_currency", currency)
        setValue(name, title)
        document.activeElement.blur()
      }
    return(
        <Box pos="relative" className={className+" autocomplete"}>
                  <InputGroup fontSize="inherit">
                    <Input
                    onChange={searchHandler}
                      aria-haspopup="listbox"
                      autoComplete="off"
                      type="text"
                      name={name}
                      ref={register({ required: error_msg })}
                      border="none"
                      placeholder="Your Country"
                    />
                    <InputRightElement>
                    <IconButton onClick={clear}  minW='0' fontSize='200' aria-label='Clear' variant='link' icon={<CrossIcon/>}/></InputRightElement>
                    <input type="hidden" ref={register({required:error_msg})} name={name + "_id"} />
                    <input type="hidden" ref={register({required:error_msg})} name={name + "_currency"} />
                    
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
                      {searching?
                    <Flex w="100%" justifyContent="center" alignItems="center" h="50px">
                    <Spinner />
                  </Flex>:
                  (
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
                            data-value={location.id}
                            data-title={`${location.country}`}
                            data-currency={`${location.currency_code}`}
                            key={index}
                          >
                            <LocationIcon />
                            <Text fontWeight='400' as="h5">
                              <Text ml="auto" as="span" variant="secondary">
                                {location.country}
                              </Text>
                            </Text>
                            <CountryFlagsLazy
                              code={location.code}
                              country={location.country}
                            />
                          </Flex>
                        )}))}
                      
                  </Box>
                    
                  
                </Box>)
}



export const CountrySelectorCurrency = (props) => {
    return (
        <StaticQuery query={graphql`
        query {
          countries: allCountry{
            nodes {
                code
                country
                currency
                currency_code
                id
                type
                translations_country{
                    es
                    ru
                    pt
                }
            }
          }
        }
      `} render={(data)=>{               
            return <AutoCompleteWrapper countries={data.countries.nodes} {...props}/>
        }}/>
      
      
    )
  }