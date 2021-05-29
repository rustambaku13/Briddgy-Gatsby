import React, { useContext, useEffect, useState } from "react"
import { OrderPageState } from "../../../providers/navPage"
import { PaymentDisplay } from "../../Misc/Payment/PaymentDisplay"
import logo from "../../../../static/assets/sgl.png"
import {Hint} from '../../../components/Misc/Hint'
import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  Image,
  Img,
  Flex,
  CheckboxGroup,
  Checkbox,
  VStack,
} from "@chakra-ui/react"
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js"

import CheckIcon from "../../../icons/Check"
import UserStore from '../../../store/UserStore'
import { LockIcon } from "../../../icons/Lock"
import { StripeIcon } from "../../../icons/Stripe"
import { createPaymentIntent, makeBalancePayment,convertCurrency } from "../../../api/payment"
import { getQuote } from "../../../api/order"
import { CountrySelectorCurrency } from "../../Inputs/CountrySelectorCurrency"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { Loader } from "../../Misc/Loader"

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#8AB5CB",
      fontSmoothing: "antialiased",
      fontSize: "1rem",
      "::placeholder": {
        color: "#aab7c4",
      },
      invalid: {
    },
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}


const PaymentStripe = ({loading,currency,prices})=>{
  const [disabled, setDisabled] = useState(true)
  const [selectedOption,setSelectedOption] = useState([])
  const {register} = useFormContext()
  const handleChange = async event => {
    setDisabled(event.empty || event.error)
  }
  if(prices.loading)return null
  
  return(
    <>
    
  <VStack alignItems='flex-start'>
  <CheckboxGroup onChange={e=>{setSelectedOption(e.length?e.length==1?e:[e[1]]:[])}} value={selectedOption}   defaultValue={[]}>
    <Flex alignItems='center' py={3} w='100%'>
      <Checkbox  value="USD" mr={3}/>
      <Box>
      <Text fontWeight='600'>
        International Credit Card
      </Text>
      <Text fontSize='300' variant='secondary'>
        Pay with USD from anywhere in the world
      </Text>
      </Box>
      <Box fontWeight='600' fontSize='500' ml='auto'>
      ${prices.total_after_stripe}
      </Box>
    </Flex>
    <Divider my={3}/>
    {!prices.converted?null:(
      <>
      <Flex alignItems='center' py={3} w='100%'>
      <Checkbox value={currency} mr={3}/>
      <Box>
      <Text fontWeight='600'>
        Credit or debit card
      </Text>
      <Text fontSize='300' variant='secondary'>
        Pay with local {currency}
      </Text>
      </Box>
      <Box fontWeight='600' fontSize='500' ml='auto'>
      {currency} {prices.converted}
      </Box>
    </Flex>
    <Divider my={3}/></>
    )}
</CheckboxGroup>
  <input type='hidden' name="payment_method"  value="stripe" ref={register()}/>
  <input type='hidden' name="orderer_currency"  value={selectedOption[0]} ref={register()}/>
  </VStack>
    <Flex d='none' w="100%" mb={1} justifyContent="" alignItems="flex-end" flex={1}>
        <StripeIcon
          fill="white"
          w="auto"
          h="35px"
          pos="relative"
          left="-9px"
          // ml="auto"
          color="lilaPurple.dark"
        />
      </Flex>
    <HStack spacing={3} mb={3}>
    <Box
      bg="outline.light"
      px={2}
      py={5}
      borderRadius="base"
      w="100%"
      borderWidth="1px"
    >
      <CardNumberElement
        onChange={handleChange}
        options={{ showIcon: true }}
      />
    </Box>

    <Box
      w="150px"
      bg="outline.light"
      px={2}
      py={5}
      borderRadius="base"
      borderWidth="1px"
    >
      <CardExpiryElement onChange={handleChange} />
    </Box>
    <Box
      w="100px"
      bg="outline.light"
      px={2}
      py={5}
      borderRadius="base"
      borderWidth="1px"
    >
      <CardCvcElement onChange={handleChange} />
    </Box>
  </HStack>
  <Button
    size="lg"
    isDisabled={disabled || selectedOption.length==0}
    fontWeight="600"
    type="submit"
    rightIcon={<LockIcon />}
    w="100%"
    mt={5}
    isLoading={loading}
    variant="success"
  >
    Pay Now
  </Button>
  </>

  )

}


export const PaymentCard = () => {
  const context = useContext(OrderPageState)
  const stripe = useStripe()
  const elements = useElements()
  const [loading,setLoading] = useState(false)
  const [prices, setPrices] = useState({
    loading: true,
  })
  const [succeeded, setSucceeded] = useState(false)
  const methods = useForm()
  const currency = methods.watch("country_currency")
  
  
  const handleBalancePay =  e=>{
    setLoading(true)
    makeBalancePayment(context.contract.id).then(e=>{
      context.contract.state = "FRZ"
      context.setStep(2)
      UserStore.me.balance = (parseFloat(UserStore.me.balance) - parseFloat(prices.stripe_balance_change)).toFixed(2)
      // setError(null)
      setSucceeded(true)
    })
    .catch(()=>{

    })
    .finally(()=>{
      setLoading(false)
    })
  }
  const handleStripePay = async e => {    
    try {
      setLoading(true)
      const {
        data: { clientSecret },
      } = await createPaymentIntent(context.contract.id,e)
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      })
      console.log(payload);
      
      if (payload.error) {
        methods.setError("payment",{message:payload.error.message})
      } else {
        context.contract.state = "FRZ"
        context.setStep(2)
        methods.setError("payment",undefined)
        setSucceeded(true)
      }
    } catch {
      methods.setError("payment",{message:"Error has occured"})
    } finally {
      setLoading(false)
    }
  }
  const handlePayment = async (e)=>{    
    switch(e.payment_method){
      case "stripe":
        await handleStripePay(e)
        break;
      case "balance":
        await handleBalancePay(e);
        break;
    }

  }


  useEffect(()=>{
    setPrices({loading:true})
    if(!currency)return
    getQuote(context.contract.item_price,context.contract.price_bid,UserStore.me?.promo_balance || 0,UserStore.me?.balance || 0).then(async ({data})=>{
      if(currency=="USD")return data
      const res = await convertCurrency(currency,data.total_after_stripe)
      return {...data,converted:res.data}
    })
    .then((data)=>{
      setPrices(data)

    })
    .catch(()=>{
      
    })
  },[currency])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handlePayment)} >
      <Flex
              mb={5}
              w="100%"
              bg='white'
              alignItems="center"
              borderWidth="1px"
              borderColor='tealBlue.base'
              px={3}
              borderRadius="md"
              h="60px"
            >
              <Text color='tealBlue.base' as="label" whiteSpace='nowrap'>
                Your Country
              </Text>
              <CountrySelectorCurrency
                
                name="country"
                placeholder="United States"
                fontSize="md"
                
              />
            </Flex>
      <Box>
      {currency?<>
      <PaymentDisplay  p={0} borderRadius="0" bg="white" {...prices} />
      </>:
      <Text textAlign='center'>
        Please select your country to proceed with payment
      </Text>
      }
      {currency?<PaymentStripe prices={prices} currency={currency} loading={loading}/>:null}
      {/* <Box d={prices.total_after_stripe!=0?'none':'block'}>
      <Flex w="100%" mb={1} justifyContent="" alignItems="flex-end" flex={1}>
        <StripeIcon
          fill="white"
          w="auto"
          h="35px"
          pos="relative"
          left="-9px"
          // ml="auto"
          color="lilaPurple.dark"
        />
      </Flex>
      <Button
          size="lg"
         
          onClick={handleBalancePay}
          fontWeight="600"
          type="submit"
          rightIcon={<LockIcon />}
          w="100%"
          mt={5}
          isLoading={loading}
          variant="success"
        >
          Pay With Balance
        </Button>
      </Box>
       */}
      </Box>
      </form>
    </FormProvider>
  )
}
