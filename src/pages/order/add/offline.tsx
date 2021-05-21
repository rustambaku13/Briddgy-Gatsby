import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/layout"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Spinner,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
} from "@chakra-ui/react"
import { PageProps } from "gatsby"
import { Link, navigate } from "gatsby-plugin-intl"
import { flowResult } from "mobx"
import React, { useEffect, useRef, useState } from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { axios_normal } from "../../../api"
import Footer from "../../../components/Footer"
import { GroupImageUploader } from "../../../components/Inputs/ImageUploader"
import { LocationAutoComplete } from "../../../components/Inputs/LocationAutoComplete"
import { Hint } from "../../../components/Misc/Hint"
import { ImageViewer } from "../../../components/Misc/ImageThumbnailViewer"
import { PaymentDisplay } from "../../../components/Misc/Payment/PaymentDisplay"
import { Step, Steps, StepsContainer } from "../../../components/Misc/Steps"
import NavbarDefault from "../../../components/Navbar"
import { BottomNavbar } from "../../../components/Navbar/BottomNavbar"
import { usePopulateQueryHook } from "../../../hooks/usePopulateQueryHook"
import { useQuoteGetterHook } from "../../../hooks/useQuoteGetterHook"
import { ChevronLeftIcon } from "../../../icons/ChevronLeft"
import { LightBulbIcon } from "../../../icons/LightBulb"
import { PlaneIcon } from "../../../icons/Plane"
import { NavigationContext } from "../../../providers/navPage"
import LayoutStore from "../../../store/LayoutStore"
import UserStore from "../../../store/UserStore"

const pageFields = {
  0: ["host", "title", "description", "price", "item_price", "weight", "files"],
  1: [
    "host",
    "title",
    "description",
    "price",
    "item_price",
    "weight",
    "files",
    "src",
    "src_id",
    "dest",
    "dest_id",
  ],
}
const Summary = ({ files, pageChange, back, page, adding }) => {
  const { register, errors, watch, getValues, formState } = useFormContext()
  const item_price = watch("item_price")
  const price = watch("price")
  const quote = useQuoteGetterHook(item_price, price, page == 2)

  return (
    <>
      {" "}
      <Box
        mb={5}
        mr={[0, 0, 8]}
        borderRadius="base"
        p={[3, 5]}
        bg="white"
        borderWidth="1px"
        flex={1}
      >
        <Heading mb={8} fontSize="hb1">
          3. Order Summary
        </Heading>
        <ImageViewer images={files}>
          <Flex>
            <ImageViewer.ImageThumbnails />
            <Center flexGrow={1}>
              <ImageViewer.LargeImage />
            </Center>
          </Flex>
        </ImageViewer>
        <Heading my={8} fontSize="700" as="h3">
          Payment Details
        </Heading>
        <PaymentDisplay {...quote} />
        <Text mt={8} as="h3" variant="secondary">
          Estimated Total{" "}
          <Text
            as="span"
            mt="-8px"
            float="right"
            fontSize="700"
            color="black"
            fontWeight="600"
          >
            {quote.loading ? <Spinner /> : `$ ${quote.total_after_stripe}`}
          </Text>
        </Text>
        <Divider my={5} />
        <Text variant="secondary">
          By publishing my order, I agree to{" "}
          <Link to="#">
            <Text as="span" color="tealBlue.base">
              Briddgy's Terms of Use
            </Text>
          </Link>
          . I understand that if the product price is incorrect, my order may be
          canceled.
        </Text>
      </Box>
      <Box flex={["0 0 100%", "0 0 100%", "0 0 400px"]}>
        <Box w="100%">
          <Hint
            text="We do not charge money untill you have a settled deal with a
              traveler. Publish your order and starting contacting travelers"
          />

          <Box w="100%" borderRadius="base" p={3} bg="white" borderWidth="1px">
            <Text fontSize="600" fontWeight="600" mb={3}>
              {getValues("title")}
            </Text>{" "}
            <Text fontSize="400" variant="secondary" mb={5}>
              {getValues("description")}
            </Text>{" "}
            <Divider orientation="horizontal" my={5} />
            <Text mb={5}>
              Product price{" "}
              <Text
                mt="-7px"
                fontSize="700"
                fontWeight="600"
                float="right"
                as="span"
              >
                ${item_price}
              </Text>
            </Text>{" "}
            <Text mb={5}>
              Traveler's Reward
              <Text
                mt="-7px"
                fontSize="700"
                fontWeight="600"
                float="right"
                as="span"
              >
                ${price}
              </Text>
            </Text>{" "}
            <Divider orientation="horizontal" my={5} />
            <Text mb={5}>
              Deliver From
              <Text float="right" as="span">
                {getValues(["src"].toString())}
              </Text>
            </Text>{" "}
            <Text mb={5}>
              Deliver To
              <Text float="right" as="span">
                {getValues(["dest"].toString())}
              </Text>
            </Text>{" "}
            <Divider orientation="horizontal" my={5} />
            <Button
              isLoading={adding}
              w="100%"
              size="lg"
              type="submit"
              variant="primary"
            >
              Publish & connect with travelers
            </Button>
            <Button mt={5} onClick={back} size="lg" variant="link">
              <ChevronLeftIcon /> Back
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

const Itinerary = ({ files, pageChange, back }) => {
  const { register, errors, watch, getValues } = useFormContext()
  const item_price = watch("item_price")

  return (
    <>
      <Box
        mb={5}
        mr={[0, 0, 8]}
        borderRadius="base"
        p={[3, 5]}
        bg="white"
        borderWidth="1px"
        flex={1}
      >
        <Heading mb={8} fontSize="hb1">
          2. Delivery Details
        </Heading>
        <Box borderRadius="lg" mb={5} bg="lilaPurple.light" p={3} as="aside">
          <LightBulbIcon float="right" fontSize="xl" />
          <Text variant="secondary">
            A traveler going to your city will deliver your order. Enter the
            country your order is coming from and which city you want it to be
            delivered to.
          </Text>
        </Box>
        <FormControl w="100%" mb={7}>
          <FormLabel>Deliver From</FormLabel>
          <LocationAutoComplete
            name="src"
            error_msg="Source City is required"
            borderWidth="1px"
            borderRadius="lg"
            size="lg"
            placeholder="City or Country"
          />
          <Text color="danger.base" as="small">
            {errors.src?.message}
          </Text>
        </FormControl>
        <FormControl w="100%" mb={7}>
          <FormLabel>Deliver To</FormLabel>
          <LocationAutoComplete
            name="dest"
            borderWidth="1px"
            error_msg="Destination City is required"
            borderRadius="lg"
            size="lg"
            placeholder="City or Country"
          />
          <Text color="danger.base" as="small">
            {errors.dest?.message}
          </Text>
        </FormControl>
      </Box>
      <Box flex={["0 0 100%", "0 0 100%", "0 0 300px"]}>
        <Box w="100%" borderRadius="base" p={3} bg="white" borderWidth="1px">
          <Button onClick={pageChange} w="100%" size="lg" variant="primary">
            Next
          </Button>

          <Button mt={5} onClick={back} size="lg" variant="link">
            <ChevronLeftIcon /> Back
          </Button>
        </Box>
      </Box>{" "}
    </>
  )
}

const ProductDetails = ({ pageChange, files, setFiles }) => {
  const { register, errors, watch, getValues } = useFormContext()
  const item_price = watch("item_price")
  const price = watch("price")
  const weight = watch("weight")
  return (
    <>
      <Box
        mb={5}
        mr={[0, 0, 8]}
        borderRadius="base"
        p={[3, 5]}
        bg="white"
        overflow="hidden"
        borderWidth="1px"
        flex={1}
      >
        <Heading mb={8} fontSize="hb1">
          1. Product Details
        </Heading>
        <FormControl w="100%" mb={7}>
          <FormLabel>Product Images</FormLabel>
          <InputGroup>
            <GroupImageUploader
              setFiles={setFiles}
              files={files}
              maxCount={3}
            />
          </InputGroup>
          <Text color="danger.base" as="small">
            {errors.files?.message}
          </Text>
        </FormControl>
        <FormControl w="100%" mb={7}>
          <FormLabel>Store Name</FormLabel>
          <Input
            size="lg"
            ref={register({ required: "Store name is required" })}
            placeholder="i.e. Pharmacy"
            type="text"
            name="host"
          />
          <Text color="danger.base" as="small">
            {errors.host?.message}
          </Text>
        </FormControl>
        <FormControl w="100%" mb={7}>
          <FormLabel>Product Name</FormLabel>
          <Input
            size="lg"
            ref={register({ required: "Product name is required" })}
            placeholder="Samsung Galaxy S11 black"
            type="text"
            name="title"
          />
          <Text color="danger.base" as="small">
            {errors.title?.message}
          </Text>
        </FormControl>
        <FormControl w="100%" mb={7}>
          <FormLabel>Product Details</FormLabel>
          <Textarea
            size="lg"
            resize="none"
            ref={register({
              required: "Product details is required",
            })}
            placeholder="Samsung Galaxy S11 black"
            rows={4}
            name="description"
          />
          <Text color="danger.base" as="small">
            {errors.description?.message}
          </Text>
        </FormControl>

        <FormControl w="100%" mb={7}>
          <FormLabel>Item Price</FormLabel>
          <InputGroup size="lg">
            <InputLeftAddon children="$" />
            <NumberInput value={item_price} maxW="200px">
              <NumberInputField
                name="item_price"
                ref={register({
                  required: "Product price is required",

                })}
                placeholder="159.99"
              />
            </NumberInput>
          </InputGroup>
          <Text color="danger.base" as="small">
            {errors.item_price?.message}
          </Text>
        </FormControl>
        <FormControl w="100%" mb={7}>
          <FormLabel>Traveler's Reward</FormLabel>
          <InputGroup size="lg">
            <InputLeftAddon children="$" />
            <NumberInput value={price} maxW="200px">
              <NumberInputField
                name="price"
                ref={register({
                  required: "Traveler's Reward is required",
                })}
                placeholder="159.99"
              />
            </NumberInput>
          </InputGroup>
          <Text color="danger.base" as="small">
            {errors.price?.message}
          </Text>
        </FormControl>
        <FormControl w="100%" mb={7}>
          <FormLabel>Product Weight</FormLabel>
          <InputGroup size="lg">
            <InputLeftAddon children="kg" />
            <NumberInput
              value={weight}
              defaultValue={parseFloat(getValues("weight"))}
              maxW="200px"
            >
              <NumberInputField
                name="weight"
                ref={register({
                  required: "Product Weight is required",
                })}
                placeholder="2.5"
              />
            </NumberInput>
          </InputGroup>
          <Text color="danger.base" as="small">
            {errors.weight?.message}
          </Text>
        </FormControl>
      </Box>

      <Box  flex={["0 0 100%", "0 0 100%", "0 0 300px"]} >
        <Box w="100%" borderRadius="base" p={3} bg="white" borderWidth="1px">
          <Button onClick={pageChange} w="100%" size="lg" variant="primary">
            Next
          </Button>

          <Divider orientation="horizontal" my={5} />
          <Text variant="secondary">
            Please fill in the details of your order
          </Text>
        </Box>
      </Box>
    </>
  )
}

const AddOrderPage = ({ location }: PageProps) => {
  const [page, setPage] = useState(0)
  const [adding, setAdding] = useState(false) // Order is being added

  const [files, setFiles] = useState([])
  const methods = useForm()
  const {
    register,
    handleSubmit,
    errors,
    trigger,
    watch,
    getValues,
    setValue,
  } = methods

  const data = usePopulateQueryHook(location)

  useEffect(() => {
    // When the query params change so we populate fields accordingly
    for (const [key, value] of Object.entries(data)) {
      if (!value) continue
      setValue(key, value)
    }
    setPage(parseInt(data?.page || 0))
  }, [data])

  const back = () => {
    setPage(page - 1)
  }
  const addOrder = async () => {
    // Real add Order part
    try {
      setAdding(true)
      flowResult(UserStore.saveNewOrder())
        .then(e => {
          navigate("/profile?page=orders")
        })
        .finally(() => {
          setAdding(false)
        })
    } catch (e) {}
  }
  const checkEmail = () => {
    if (UserStore.me.is_email_verified) addOrder()
    else {
      LayoutStore.emailConfirmModalOpen(addOrder)
    }
  }
  const pageChange = async data => {
    const success = await trigger(pageFields[page])
    if (success) {
      if (page == 2) {
        // Main Submit Handler
        data.files = files
        UserStore.save_new_order(data)
        if (UserStore.isLoggedIn) {
          // Can directly add order to profile
          checkEmail()
          return
        }
        LayoutStore.loginModalFormOpen(checkEmail)
        return
      }
      const values = getValues(pageFields[page])
      values.page = page + 1
      const searchParams = new URLSearchParams(values)
      navigate(`.?${searchParams.toString()}`)
    }
  }
  return (
    <>
      <NavigationContext.Provider value={{ page: "order" }}>
        <NavbarDefault />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Container bg="white" py={5} maxW="full" as="section">
        <Box mx="auto" maxW="container.lg">
          <StepsContainer
            selected={page}
            items={[
              {
                title: "Product details",
                icon: <PlaneIcon />,
              },
              {
                title: "Delivery details",
                icon: <PlaneIcon />,
              },
              {
                title: "Summary",
                icon: <PlaneIcon />,
              },
            ]}
          />
        </Box>
      </Container>
      <Container
        as="section"
        minH="calc(100vh - 100px)"
        bg="outline.light"
        maxW="full"
      >
        <Box
          mx="auto"
          onSubmit={handleSubmit(pageChange)}
          as="form"
          maxW="container.lg"
        >
          <FormProvider {...methods}>
            <Tabs index={page}>
              <TabPanels>
                <TabPanel px={0} display="flex" flexWrap="wrap">
                  <ProductDetails
                    files={files}
                    setFiles={setFiles}
                    pageChange={pageChange}
                  />
                </TabPanel>
                <TabPanel px={0} display="flex" flexWrap="wrap">
                  <Itinerary
                    back={back}
                    pageChange={pageChange}
                    files={files}
                  />
                </TabPanel>
                <TabPanel px={0} display="flex" flexWrap="wrap">
                  <Summary
                    adding={adding}
                    page={page}
                    back={back}
                    pageChange={pageChange}
                    files={files}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </FormProvider>
        </Box>
      </Container>
      <Footer />
    </>
  )
}

export default AddOrderPage
