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
        px="5px"
        alignItems="center"
        borderWidth={1}
      >
        <Text pl={3} fontSize={["xs", "sm"]} flexGrow={1}>
          Add Order
        </Text>

        <IconButton
          flexShrink={0}
          h="40px"
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
      p={3}
      bg="white"
      flexDir={["column", "column", "row"]}
      borderRadius={["md", "md", "lg"]}
      borderColor="outline.medium"
      borderWidth="1px"
      id="add_order_form"
      h={["auto", "auto", "80px"]}
      autoComplete={"off"}
      w="100%"
    >
      <Box flex={1}>
        <Text
          as="label"
          fontWeight="700"
          fontSize="600"
          color="oxfordBlue.dark"
        >
          URL or Name of product
        </Text>
        <OrderAutoComplete
          placeholder="https://amazon.com/"
          height="inherit"
          name="url"
        />
      </Box>
      <Button
        h="auto"
        minH="50px"
        mt={[3, 3, 0]}
        fontWeight="700"
        px={[1, 5, 8]}
        variant="red_gradient"
        type="submit"
        borderRadius={"lg"}
      >
        Create Order
      </Button>
    </Flex>
  )
})

export const AddOrderNavigationMenu = ({ expand }) => {
  const formObject = useForm()

  const submitHandler = data => {
    try {
      new URL(data.url_name)
      navigate(`/order/add/online?url=${data.url_name}/`)
    } catch (e) {
      navigate(`/order/add/offline?title=${data.url_name}`)
    }
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
          <Box px={3} className="overlay">
            <AddOrderForm />
          </Box>
        </Box>
      </FormProvider>
    </>
  )
}
