import { Box,Input,Button,Text, useToast } from '@chakra-ui/react'
import { flowResult } from 'mobx'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import UserStore from '../../store/UserStore'

export const RedeemPromo = ()=>{
    const {register,handleSubmit,setError,errors} = useForm()
    const [loading,setLoading] = useState(false)
    const toast = useToast()
    const addPromoCode = ({code})=>{;
        setLoading(true)
        flowResult(UserStore.addPromo(code))
        .then(()=>{
            
        toast({
            title: "Promo Balance has been increased",
            description: "You can use the promo balance to discount commisions for your next purchase ",
            status: "success",
            duration: 5000,
            isClosable: true,
          })
        })
        .catch((e)=>{
            setError("code",{message:e.response.data?.detail})

        }).finally(()=>{
            setLoading(false)
        })
    }
    return(
        <>
        <Box
          as="form"
          onSubmit={handleSubmit(addPromoCode)}
          bg="white"
          _hover={{ bg: "outline.light" }}
          transition=".2s ease-in-out"
          textAlign="initial"
          px={4}
          py={2}
          borderWidth="1px"
          borderRadius="lg"
          w="100%"
          fontWeight="400"
          pos="relative"
        >
          <Input
            textTransform="uppercase"
            placeholder="Enter promo code"
            bg="transparent"
            ref={register({
              required: "Please enter the promo code",
              maxLength: {
                value: 5,
                message: "Promo Code should be 5 characters",
              },
              minLength: {
                value: 5,
                message: "Promo Code should be 5 characters",
              },
            })}
            fontSize={["xl", "2xl"]}
            name="code"
            h="70px"
            border="none"
          />
          <Button
            zIndex="1"
            isLoading={loading}
            pos="absolute"
            right={4}
            top="18px"
            px={5}
            type="submit"
            size="lg"
            variant="primary"
          >
            Redeem
          </Button>
        </Box>
        <Text color="red.500">{errors.code?.message}</Text>
        </>
    )




}