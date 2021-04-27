import { Box, chakra, Checkbox, Input, InputGroup } from "@chakra-ui/react"
import moment from "moment"
import React, { useState } from "react"
import { Calendar } from "react-modern-calendar-datepicker"

const dateObjectToArray = (date: {
  year: number
  month: number
  day: number
}) => {
  return [date.year, date.month, date.day]
}

export const DatePicker = chakra(
  ({
    className,
    nameDeparture,
    nameArrival,
    refDeparture,
    refArrival,
  }: {
    className?: string
    nameDeparture?: string
    nameArrival?: string
    refDeparture?: any
    refArrival?: any
  }) => {
    const [selectedDayRange, setSelectedDayRange] = useState({
      from: null,
      to: null,
    }) // If one way is false
    const [selectedDate, setSelectedDate] = useState(null) // If one way is true
    const [oneWay, setOneWay] = useState(true)
    let from,
      to = undefined
    if (oneWay) {
      // One Way Mode selected

      if (selectedDate)
        from = moment(new Date(dateObjectToArray(selectedDate))).format(
          "YYYY-MM-DD"
        )
    } else {
      if (selectedDayRange.from) {
        from = moment(
          new Date(dateObjectToArray(selectedDayRange.from))
        ).format("YYYY-MM-DD")
      }
      if (selectedDayRange.to) {
        to = moment(new Date(dateObjectToArray(selectedDayRange.to))).format(
          "YYYY-MM-DD"
        )
      }
    }
    return (
      <Box
        pos="relative"
        fontSize="1em"
        className={className + " autocomplete"}
      >
        <InputGroup>
          <Input
            autoComplete="off"
            border="none"
            value={(from || "") + (to ? "-" : "") + (to || "")}
            placeholder="Departure - Arrival"
          />
          <input
            ref={refDeparture}
            name={nameDeparture}
            value={from}
            type="hidden"
          />

          <input ref={refArrival} name={nameArrival} value={to} type="hidden" />
        </InputGroup>
        <Box pos="absolute" top="100%" left="0" display="none">
          {oneWay ? (
            <Calendar
              renderFooter={() => (
                <Box ml={9} w="100px" fontSize="xl">
                  <Checkbox
                    onChange={e => {
                      setOneWay(e.target.checked)
                    }}
                    isChecked={oneWay}
                  >
                    {" "}
                    One Way
                  </Checkbox>
                </Box>
              )}
              value={selectedDate}
              onChange={setSelectedDate}
            />
          ) : (
            <Calendar
              renderFooter={() => (
                <Box ml={9} w="100px" fontSize="xl">
                  <Checkbox
                    onChange={e => {
                      setOneWay(e.target.checked)
                    }}
                    isChecked={oneWay}
                  >
                    {" "}
                    One Way
                  </Checkbox>
                </Box>
              )}
              value={selectedDayRange}
              onChange={setSelectedDayRange}
            />
          )}
        </Box>
      </Box>
    )
  }
)
