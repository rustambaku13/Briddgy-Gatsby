import { Box, chakra, Checkbox, Input, InputGroup } from "@chakra-ui/react"
import moment from "moment"
import React, { useState } from "react"
import { Calendar } from "react-modern-calendar-datepicker"
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { BACKEND_DATE_FORMAT } from "../../api";
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



const DEFAULT_SETTINGS = {
  minimumNights: 1,
  daysViolatingMinNightsCanBeClicked:false,



}

export const START_DATE = 'startDate';
export const END_DATE = 'endDate';


export const NewDatePicker = chakra(({className,nameDeparture,
  nameArrival,
  refDeparture,
  refArrival,})=>{
  const [state,setState] = useState({startDate:null,endDate:null,errorMessage:null})
  const [focusedInput,setFocusedInput] = useState(null)
  const [focusedSingle,setFocusedSingle] = useState(null)
  const [oneWay,setOneWay] = useState(true)
  const onDatesChange = ({ startDate, endDate })=> {
  setState({
      startDate: startDate, 
      endDate: endDate,
      errorMessage:null
    })
  }

  const onSingleDateChange = (date)=>{
    setState({
      startDate:date,
      endDate:null,
      errorMessage:null
    })
  }
  const onFocusChange = (focusedInput)=>{    
      setFocusedInput(
        // Force the focusedInput to always be truthy so that dates are always selectable
        focusedInput
      );
    
  }
  const onFocusChangeSingle = ({focused})=>{    
    setFocusedSingle(
      // Force the focusedInput to always be truthy so that dates are always selectable
      focused
    );
  
}

  const OneWayCheck = ()=> (
    <Box pt={2} pr={4} float='right'>
      <Checkbox isChecked={oneWay} onChange={e=>{
      const state = e.target.checked
      if(state){
        // One Way
        setFocusedInput(null)


      }
      setOneWay(e.target.checked)
    }}>
      One way
    </Checkbox>
    </Box>
  )

  return(
<>
    <Box d={oneWay?"block":"none"}>
    <SingleDatePicker
      id='date_input'
      date={state.startDate}
      focused={focusedSingle}
      onDateChange={onSingleDateChange}
      onFocusChange={onFocusChangeSingle}
      small={true}
      monthFormat= 'MMMM YYYY'
      noBorder={true}
      renderCalendarInfo={OneWayCheck}
      /></Box>

    <Box d={oneWay?"none":"block"}>
    <DateRangePicker 
      startDate={state.startDate} // momentPropTypes.momentObj or null,
      // startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={state.endDate} // momentPropTypes.momentObj or null,
      // endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={onDatesChange} // PropTypes.func.isRequired,
      focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={onFocusChange} // PropTypes.func.isRequired,
        small={true}
        monthFormat= 'MMMM YYYY'
        noBorder={true}
        renderCalendarInfo={OneWayCheck}
    
    /></Box>

<input
            ref={refDeparture}
            name={nameDeparture}
            value={state.startDate?.format(BACKEND_DATE_FORMAT)}
            type="hidden"
          />

          <input ref={refArrival} name={nameArrival} value={state.endDate?.format(BACKEND_DATE_FORMAT)} type="hidden" />
        </>
        // </Box>
    // </Box>
  )


})

