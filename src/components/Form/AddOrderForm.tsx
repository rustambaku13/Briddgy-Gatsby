import { Box, Button, chakra, Flex, Text, IconButton } from "@chakra-ui/react"
import { navigate } from "gatsby-plugin-intl"
import React from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import OrderIcon from "../../icons/Order"
import { OrderAutoComplete } from "../Inputs/OrderAutocomplete"

const TopSearchButton = chakra(
  ({ className, expand }: { className?: any; expand: any }) => {
    return (
      <Flex
        onClick={expand}
        role="button"
        _hover={{ boxShadow: "md" }}
        className={className}
        id="navbar_search_order"
        borderRadius="50px"
        w="100%"
        maxW="350px"
        mx="auto"
        mt="15px"
        h="50px"
        bg="white"
        pl={5}
        alignItems="center"
        borderWidth="1px"
      >
        <Text fontSize="sm" flexGrow={1}>
          Add Order
        </Text>

        <IconButton
          flexShrink={0}
          h="40px"
          mr="5px"
          d="block"
          w="40px"
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

const AddOrderForm = chakra(({ className }: { className?: any }) => {
  return (
    <Flex
      className={className}
      id="add_order_form"
      boxShadow="md"
      borderRadius="50px"
      h="70px"
      autoComplete={"off"}
      w="100%"
      bg="white"
      pl={5}
      borderWidth="1px"
    >
      <OrderAutoComplete
        placeholder="Enter the URL or the Name of the product"
        height="inherit"
        name="url"
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

export const AddOrderNavigationMenu = ({ expand }) => {
  const formObject = useForm()

  const submitHandler = data => {
    navigate(`add?url=${data.url_name}`)
  }
  return (
    <>
      <FormProvider {...formObject}>
        <Box
          className="form"
          id="order_navigation"
          as="form"
          onSubmit={formObject.handleSubmit(submitHandler)}
          w="100%"
          h="100%"
          mx="auto"
        >
          <TopSearchButton expand={expand} />
          <Box className="overlay">
            <AddOrderForm />
          </Box>
        </Box>
      </FormProvider>
    </>
  )
}
