import { Box, Container, Divider, Heading, Text } from "@chakra-ui/layout"
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
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
import { useForm } from "react-hook-form"
import { LoginModalForm } from "../../../components/Form/LoginModalForm"
import { GroupImageUploader } from "../../../components/Inputs/ImageUploader"
import { LocationAutoComplete } from "../../../components/Inputs/LocationAutoComplete"
import ImageThumbnailViewer from "../../../components/Misc/ImageThumbnailViewer"
import { PaymentDisplay } from "../../../components/Misc/Payment/PaymentDisplay"
import { Step, Steps } from "../../../components/Misc/Steps"
import NavbarDefault from "../../../components/Navbar"
import { usePopulateQueryHook } from "../../../hooks/usePopulateQueryHook"
import { useQuoteGetterHook } from "../../../hooks/useQuoteGetterHook"
import { ChevronLeftIcon } from "../../../icons/ChevronLeft"
import { LightBulbIcon } from "../../../icons/LightBulb"
import { PlaneIcon } from "../../../icons/Plane"
import { RefreshIcon } from "../../../icons/Refresh"
import UserStore from "../../../store/UserStore"

const pageFields = {
  0: ["url", "title", "description", "price", "item_price", "weight"],
}
const AddOrderPage = ({ location }: PageProps) => {
  const [page, setPage] = useState(0)
  const [loginModal, setloginModal] = useState(false)
  const [adding, setAdding] = useState(false) // Order is being added
  const files = useRef([])

  const {
    register,
    handleSubmit,
    errors,
    trigger,
    watch,
    getValues,
    setValue,
  } = useForm()
  const item_price = watch("item_price")
  const price = watch("price")
  const title = watch("title")
  const data = usePopulateQueryHook(location)
  const quote = useQuoteGetterHook(item_price, price, page == 2)
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
  const addOrder = () => {
    try {
      setAdding(true)
      flowResult(UserStore.saveNewOrder())
        .then(e => {})
        .finally(() => {
          setAdding(false)
        })
    } catch (e) {}
  }
  const pageChange = async data => {
    const success = await trigger(pageFields[page])
    if (success) {
      if (page == 2) {
        data.files = files.current
        data.host = new URL(data.url).host

        UserStore.save_new_order(data)
        if (UserStore.isLoggedIn) {
          // Can directly add order to profile
          addOrder()
          return
        }
        setloginModal(true)

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
      <LoginModalForm
        callback={addOrder}
        isOpen={loginModal}
        setOpen={setloginModal}
      />
      <NavbarDefault />
      <Container maxW="full" as="section">
        <Steps py={8} maxW="container.lg" mx="auto">
          <Step
            Icon={PlaneIcon}
            selected={page}
            step={0}
            title="Product details"
          ></Step>
          <Step
            Icon={PlaneIcon}
            selected={page}
            step={1}
            title="Delivery details"
          ></Step>
          <Step
            Icon={PlaneIcon}
            selected={page}
            step={2}
            title="Summary"
          ></Step>
        </Steps>
      </Container>
      <Container
        as="section"
        minH="calc(100vh - 100px)"
        bg="gray.100"
        maxW="full"
      >
        <Container
          onSubmit={handleSubmit(pageChange)}
          as="form"
          maxW="container.lg"
        >
          <Tabs index={page}>
            <TabPanels>
              <TabPanel>
                <Box
                  float="right"
                  w="300px"
                  borderRadius="md"
                  p={3}
                  bg="white"
                  borderWidth="1px"
                >
                  {title ? (
                    <>
                      <Text fontSize="xl" fontWeight="600" mb={5}>
                        {title}
                      </Text>{" "}
                      <Divider orientation="horizontal" my={5} />
                    </>
                  ) : null}

                  {item_price ? (
                    <>
                      {" "}
                      <Text mb={5}>
                        Product price{" "}
                        <Text
                          mt="-7px"
                          fontSize="2xl"
                          fontWeight="600"
                          float="right"
                          as="span"
                        >
                          ${item_price}
                        </Text>
                      </Text>{" "}
                      <Divider orientation="horizontal" my={5} />
                    </>
                  ) : null}
                  <Text variant="secondary">
                    Please fill in the details of your order
                  </Text>
                  <Divider orientation="horizontal" my={5} />
                  <Button
                    onClick={pageChange}
                    w="100%"
                    size="lg"
                    variant="primary"
                  >
                    Next
                  </Button>
                </Box>
                <Box
                  mr={8}
                  borderRadius="md"
                  p={5}
                  marginRight="310px"
                  bg="white"
                  borderWidth="1px"
                >
                  <Heading mb={8} fontSize="3xl">
                    1. Product Details
                  </Heading>
                  <FormControl w="100%" mb={7}>
                    <FormLabel>Product Images</FormLabel>
                    <InputGroup size="lg">
                      <GroupImageUploader
                        register={register}
                        files={files}
                        maxCount={3}
                      />
                    </InputGroup>
                    <Text color="red.400" as="small">
                      {errors.files?.message}
                    </Text>
                  </FormControl>
                  <FormControl w="100%" mb={7}>
                    <FormLabel>Product URL</FormLabel>
                    <InputGroup size="lg">
                      <Input
                        ref={register({
                          required: "Product URL is required",
                          validate: s => {
                            try {
                              new URL(s)
                              return true
                            } catch (e) {
                              return "Invalid URL"
                            }
                          },
                        })}
                        name="url"
                      />
                      <InputRightAddon
                        p={0}
                        children={
                          <IconButton
                            borderRadius="none"
                            h="100%"
                            w="100%"
                            aria-label="Refresh"
                            icon={<RefreshIcon />}
                          />
                        }
                      />
                    </InputGroup>
                    <Text color="red.400" as="small">
                      {errors.url?.message}
                    </Text>
                  </FormControl>
                  <FormControl w="100%" mb={7}>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                      size="lg"
                      ref={register({ required: "Product name is required" })}
                      placeholder="Samsung Galaxy S11 black"
                      type="text"
                      value={title}
                      name="title"
                    />
                    <Text color="red.400" as="small">
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
                    <Text color="red.400" as="small">
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
                    <Text color="red.400" as="small">
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
                    <Text color="red.400" as="small">
                      {errors.price?.message}
                    </Text>
                  </FormControl>
                  <FormControl w="100%" mb={7}>
                    <FormLabel>Product Weight</FormLabel>
                    <InputGroup size="lg">
                      <InputLeftAddon children="kg" />
                      <NumberInput maxW="200px">
                        <NumberInputField
                          name="weight"
                          ref={register({
                            required: "Product Weight is required",
                          })}
                          placeholder="2 kg"
                        />
                      </NumberInput>
                    </InputGroup>
                    <Text color="red.400" as="small">
                      {errors.price?.message}
                    </Text>
                  </FormControl>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  float="right"
                  w="300px"
                  borderRadius="md"
                  p={3}
                  bg="white"
                  borderWidth="1px"
                >
                  <Text fontSize="xl" fontWeight="600" mb={5}>
                    {title}
                  </Text>{" "}
                  <Divider orientation="horizontal" my={5} />{" "}
                  <Text mb={5}>
                    Product price{" "}
                    <Text
                      mt="-7px"
                      fontSize="2xl"
                      fontWeight="600"
                      float="right"
                      as="span"
                    >
                      ${item_price}
                    </Text>
                  </Text>{" "}
                  <Divider orientation="horizontal" my={5} />
                  <Text variant="secondary">
                    Please fill in the details of your order
                  </Text>
                  <Divider orientation="horizontal" my={5} />
                  <Button
                    onClick={pageChange}
                    w="100%"
                    size="lg"
                    variant="primary"
                  >
                    Next
                  </Button>
                  <Button mt={5} onClick={back} size="lg" variant="link">
                    <ChevronLeftIcon /> Back
                  </Button>
                </Box>
                <Box
                  mr={8}
                  borderRadius="md"
                  p={5}
                  marginRight="310px"
                  bg="white"
                  borderWidth="1px"
                >
                  <Heading mb={8} fontSize="3xl">
                    2. Delivery Details
                  </Heading>
                  <Box
                    borderRadius="lg"
                    mb={5}
                    bg="blueAlpha.100"
                    p={3}
                    as="aside"
                  >
                    <LightBulbIcon float="right" fontSize="xl" />
                    <Text variant="secondary">
                      A traveler going to your city will deliver your order.
                      Enter the country your order is coming from and which city
                      you want it to be delivered to.
                    </Text>
                  </Box>
                  <FormControl w="100%" mb={7}>
                    <FormLabel>Deliver From</FormLabel>
                    <LocationAutoComplete
                      name="source"
                      borderWidth="1px"
                      borderRadius="lg"
                      size="lg"
                      placeholder="City or Country"
                      fontSize="xl"
                      parentRef={register({
                        required: "Source City is required",
                      })}
                    />
                    <Text color="red.400" as="small">
                      {errors.origin?.message}
                    </Text>
                  </FormControl>
                  <FormControl w="100%" mb={7}>
                    <FormLabel>Deliver To</FormLabel>
                    <LocationAutoComplete
                      name="destination"
                      borderWidth="1px"
                      borderRadius="lg"
                      size="lg"
                      placeholder="City or Country"
                      fontSize="xl"
                      parentRef={register({
                        required: "Destination City is required",
                      })}
                    />
                    <Text color="red.400" as="small">
                      {errors.destination?.message}
                    </Text>
                  </FormControl>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box float="right" w="300px">
                  <Box
                    borderRadius="md"
                    mb={3}
                    p={3}
                    bg="white"
                    borderWidth="1px"
                    as="aside"
                  >
                    <LightBulbIcon float="right" fontSize="xl" />
                    <Text variant="secondary">
                      We do not charge money untill you have a settled deal with
                      a traveler. Publish your order and starting contacting
                      travelers
                    </Text>
                  </Box>
                  <Box
                    w="100%"
                    borderRadius="md"
                    p={3}
                    bg="white"
                    borderWidth="1px"
                  >
                    <Text fontSize="xl" fontWeight="600" mb={5}>
                      {title}
                    </Text>{" "}
                    <Divider orientation="horizontal" my={5} />
                    <Text mb={5}>
                      Product price{" "}
                      <Text
                        mt="-7px"
                        fontSize="2xl"
                        fontWeight="600"
                        float="right"
                        as="span"
                      >
                        ${item_price}
                      </Text>
                    </Text>{" "}
                    <Divider orientation="horizontal" my={5} />
                    <Text mb={5}>
                      Deliver From
                      <Text float="right" as="span">
                        {getValues(["source_name"].toString())}
                      </Text>
                    </Text>{" "}
                    <Text mb={5}>
                      Deliver To
                      <Text float="right" as="span">
                        {getValues(["destination_name"].toString())}
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
                      Connect with travelers
                    </Button>
                    <Button mt={5} onClick={back} size="lg" variant="link">
                      <ChevronLeftIcon /> Back
                    </Button>
                  </Box>
                </Box>

                <Box
                  mr={8}
                  borderRadius="md"
                  p={5}
                  marginRight="310px"
                  bg="white"
                  borderWidth="1px"
                >
                  <Heading mb={8} fontSize="3xl">
                    3. Order Summary
                  </Heading>
                  <ImageThumbnailViewer images={files.current} />
                  <Heading my={8} fontSize="2xl" as="h3">
                    Payment Details
                  </Heading>
                  <PaymentDisplay {...quote} />
                  <Text mt={8} as="h3" variant="secondary">
                    Estimated Total{" "}
                    <Text
                      as="span"
                      mt="-8px"
                      float="right"
                      fontSize="2xl"
                      color="black"
                      fontWeight="600"
                    >
                      {quote.loading ? <Spinner /> : `$ ${quote.total}`}
                    </Text>
                  </Text>
                  <Divider my={5} />
                  <Text variant="secondary">
                    By publishing my order, I agree to{" "}
                    <Link to="#">
                      <Text as="span" color="blue.400">
                        Briddgy's Terms of Use
                      </Text>
                    </Link>
                    . I understand that if the product price is incorrect, my
                    order may be canceled.
                  </Text>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Container>
    </>
  )
}

export default AddOrderPage
