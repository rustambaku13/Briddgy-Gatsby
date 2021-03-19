import {
  Button,
  Center,
  chakra,
  Divider,
  Flex,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react"
import { navigate } from "gatsby-plugin-intl"
import { flowResult } from "mobx"
import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { CalendarIcon } from "../../icons/Calendar"
import { LocationIcon } from "../../icons/Location"
import OrderIcon from "../../icons/Order"
import RotateIcon from "../../icons/Rotate"
import UserStore from "../../store/UserStore"
import { DatePicker } from "../Inputs/DatePicker"
import { AddTripDetailsModal } from "../Modals/AddTripDetailsModal"
import { LocationAutoComplete } from "./LocationAutoComplete"
import { LoginModalForm } from "./LoginModalForm"

export const AddOrderTopSearch = chakra(
  ({ className }: { className?: any }) => {
    const { register, getValues, handleSubmit, watch, errors } = useForm()
    const submitHandler = data => {
      navigate(`add?url=${data.url}`)
    }

    return (
      <Flex
        className={className}
        id="navbar_search"
        borderRadius="50px"
        h="70px"
        as="form"
        onSubmit={handleSubmit(submitHandler)}
        autoComplete={"off"}
        w="100%"
        bg="white"
        pl={5}
        borderWidth="1px"
      >
        <Input
          placeholder="Enter the name or URL of the item"
          height="inherit"
          border="none"
          name="url"
          ref={register({ required: true })}
          variant="unstyled"
        />

        <IconButton
          h="calc(100% - 10px)"
          mt="5px"
          mr="10px"
          borderRadius="50%"
          variant="red_gradient"
          type="submit"
          aria-label="Add Order"
          icon={<OrderIcon />}
        />
      </Flex>
    )
  }
)

export const AddOrderForm = chakra(({ className }: { className?: any }) => {
  const { register, getValues, handleSubmit, watch, errors } = useForm()
  const submitHandler = data => {
    navigate(`add?url=${data.url}`)
  }

  return (
    <Flex
      className={className}
      id="add_order_form"
      boxShadow="md"
      borderRadius="50px"
      h="70px"
      as="form"
      onSubmit={handleSubmit(submitHandler)}
      autoComplete={"off"}
      w="100%"
      bg="white"
      pl={5}
      borderWidth="1px"
    >
      <Input
        placeholder="Enter the name or URL of the item"
        height="inherit"
        border="none"
        name="url"
        ref={register({ required: true })}
        variant="unstyled"
      />

      <Button
        h="calc(100% - 10px)"
        maxW="200px"
        w="100%"
        p={0}
        variant="red_gradient"
        mt={"5px"}
        mr="10px"
        type="submit"
        borderRadius="50px"
      >
        Create Order
      </Button>
    </Flex>
  )
})
