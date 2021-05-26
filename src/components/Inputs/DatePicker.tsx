import { Box, Button, chakra, Checkbox, HStack, Input, InputGroup,Text, useRadio, useRadioGroup} from "@chakra-ui/react"
import moment from "moment"
import React, { useState } from "react"
import { Calendar } from "react-modern-calendar-datepicker"
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController,SingleDatePickerInput } from 'react-dates';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import DayPicker,{DateUtils} from 'react-day-picker'
import 'react-dates/lib/css/_datepicker.css';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import { BACKEND_DATE_FORMAT, FRONTEND_DATE_FORMAT } from "../../api";
import { ChevronDownIcon, ChevronUpIcon } from "../../icons/ChevronDown";
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
    console.log(focusedInput);
      
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
    <Box d={['block','block','none']} className='normal_picker'>
    <SingleDatePicker
      date={state.startDate}
      focused={focusedSingle}
      onDateChange={onSingleDateChange}
      onFocusChange={onFocusChangeSingle}
      small={true}
      monthFormat= 'MMMM YYYY'
      noBorder={true}
      hideKeyboardShortcutsPanel={true}
      renderCalendarInfo={OneWayCheck}
      navNext={<ChevronDownIcon/>}
      navPrev={<ChevronUpIcon/>}
      anchorDirection={"ANCHOR_RIGHT"}
      orientation="vertical" verticalHeight={568}
      
      />
    </Box>
      <Box d={['block','block','none']} className='portal_picker'>
        <SingleDatePicker
        date={state.startDate}
        focused={focusedSingle}
        onDateChange={onSingleDateChange}
        onFocusChange={onFocusChangeSingle}
        small={true}
        monthFormat= 'MMMM YYYY'
        noBorder={true}
        hideKeyboardShortcutsPanel={true}
        renderCalendarInfo={OneWayCheck}
        navNext={<ChevronDownIcon/>}
        navPrev={<ChevronUpIcon/>}
        anchorDirection={"ANCHOR_RIGHT"}
        orientation="vertical" verticalHeight={568}
        withFullScreenPortal={true}
        />
      </Box>
      
      </Box>

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
        hideKeyboardShortcutsPanel={true}
        renderCalendarInfo={OneWayCheck}
        navNext={<ChevronDownIcon/>}
        navPrev={<ChevronUpIcon/>}
        anchorDirection={"ANCHOR_RIGHT"}
        orientation="vertical"
        verticalHeight={568}
        
        
    
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


const now = new Date()

export const NewestDatePicker = chakra(({className,nameDeparture,
  nameArrival,
  refDeparture,
  refArrival})=>{
const [state,setState] = useState({
    from: null,
    to: null,
    enteredTo: null, // Keep track of the last day for mouseEnter.
})
const [oneWay,setOneWay] = useState(true)
const modifiers = { start: state.from, end: state.enteredTo };
const disabledDays = oneWay?{before:now}:{ before: state.from || now };
const selectedDays = [state.from, { from:state.from, to: state.enteredTo }];


let displayedDate = ``
if(state.from && !state.to){
  displayedDate = `${moment(state.from).format(FRONTEND_DATE_FORMAT)}`
}
else if(state.from && state.to){
  displayedDate = `${moment(state.from).format(FRONTEND_DATE_FORMAT)} - ${moment(state.to).format(FRONTEND_DATE_FORMAT)}`
}


const isSelectingFirstDay = (from, to, day)=> {
  const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
  const isRangeSelected = from && to;
  return !from || isBeforeFirstDay || isRangeSelected;
}
const handleDayMouseEnter = (day)=>{
  if(oneWay)return
  const { from, to } = state;
  if (!isSelectingFirstDay(from, to, day)) {
    setState({
      from,to,
      enteredTo: day,
    });
  }
}
const handleDayClick = (day)=>{
  
  
  if(oneWay){

    setState({
      from:day.getTime()===state.from?.getTime()?null:day,
      to:null,
      enteredTo:null
    })
    return
  }
  const { from, to } = state;
    if (from && to && day >= from && day <= to) {
      setState({
        from:null,
        to: null,
      enteredTo: null,

      })
      return;
    }
    if (isSelectingFirstDay(from, to, day)) {
      setState({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      setState({
        from:state.from,
        to: day,
        enteredTo: day,
      });
    }
}

  
  

return(
  <>
  <Box flex={1} className='datepicker'>
  <Input border='none' aria-haspopup="listbox"
            autoComplete="off" placeholder="Select Date"  flex={1} fontWeight='500' 
    ml={2}
    value={displayedDate}
  />
  <input
            ref={refDeparture}
            name={nameDeparture}
            value={state.from?moment(state.from)?.format(BACKEND_DATE_FORMAT):undefined}
            type="hidden"
          />

          <input ref={refArrival} name={nameArrival} value={state.to?moment(state.to)?.format(BACKEND_DATE_FORMAT):undefined} type="hidden" />
  <Box borderRadius='md' borderWidth='1px' borderColor='outline.base' boxShadow='elevation_4' tabIndex={0} bg='white' p={2} className='wrapper'>
    <HStack mb={1} spacing={2} justifyContent='center'>
      <Button _selected={{bg:"tealBlue.base",color:"white"}} onClick={()=>{setOneWay(true)}} aria-selected={oneWay} size='sm'>One Way</Button>
      <Button _selected={{bg:"tealBlue.base",color:"white"}} onClick={()=>{setState({from:state.from,to:null,enteredTo:null});setOneWay(false)}} aria-selected={!oneWay} size='sm'>Round Trip</Button>
    </HStack>
  <DayPicker 
  onDayClick={handleDayClick}
    fromMonth={state.from}
    selectedDays={selectedDays}
    modifiers={modifiers}
    disabledDays={disabledDays}
    onDayMouseEnter={handleDayMouseEnter}/>
    
   
  </Box>
  <Box  className='datepicker-shadow'>

  </Box>
  
  </Box>
  </>
   
)





})