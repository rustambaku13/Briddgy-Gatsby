import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  LinkBox,
  Text,
  Img as CImg,
  Button,
} from "@chakra-ui/react"
import React from "react"
import { StepCircle } from "../Misc/StepCircle"
import url from "../../images/url.svg"
import pay from "../../images/secure_payment.svg"
import note from "../../images/noteicon.svg"
import receive from "../../images/receive.svg"
import { Link } from "gatsby-plugin-intl"

export const HowToOrder = () => {
  return (
    <Container py="60px" mb={[20, 20, "150px"]} maxW="full" as="section">
      <Heading mb="80px" fontSize="hb3" fontWeight="700" textAlign="center">
        How to Shop abroad using Briddgy
      </Heading>
      <SimpleGrid
        spacing={25}
        columns={[1, 2, 4]}
        mx="auto"
        maxW="container.xl"
      >
        <Box>
          <StepCircle
            mb={5}
            bgGradient="linear(to-r,tealBlue.base,tealBlue.dark)"
            mx="auto"
            h="120px"
            w="120px"
            step={1}
          >
            <CImg alt="Add Trip" height="60px" width="60px" src={url} />
          </StepCircle>
          <Heading
            mb={5}
            textAlign="center"
            fontSize="600"
            fontWeight="700"
            as="h4"
          >
            Add Order
          </Heading>
          <Text variant="secondary" textAlign="center">
            Enter the URL or the name of the item that you want from abroad
          </Text>
        </Box>
        <Box>
          <StepCircle
            mb={5}
            mx="auto"
            bgGradient="linear(to-r,tealBlue.base,tealBlue.dark)"
            step={2}
            h="120px"
            w="120px"
          >
            <CImg alt="Make Offers" height="60px" width="60px" src={note} />
          </StepCircle>
          <Heading
            mb={5}
            textAlign="center"
            fontSize="600"
            fontWeight="700"
            as="h4"
          >
            Make/receive offers
          </Heading>
          <Text variant="secondary" textAlign="center">
            Make offers to travelers or wait for travelers to contact you to
            bring your order.
          </Text>
        </Box>
        <Box>
          <StepCircle
            mb={5}
            mx="auto"
            bgGradient="linear(to-r,tealBlue.base,tealBlue.dark)"
            step={3}
            h="120px"
            w="120px"
          >
            <CImg alt="Buy and deliver" height="60px" width="60px" src={pay} />
          </StepCircle>
          <Heading
            mb={5}
            textAlign="center"
            fontSize="600"
            fontWeight="700"
            as="h4"
          >
            Secure payment
          </Heading>
          <Text variant="secondary" textAlign="center">
            Secure the payment for the product price and travelers reward
          </Text>
        </Box>
        <Box>
          <StepCircle
            mb={5}
            mx="auto"
            bgGradient="linear(to-r,tealBlue.base,tealBlue.dark)"
            step={4}
            h="120px"
            w="120px"
          >
            <CImg alt="Earn money" height="60px" width="60px" src={receive} />
          </StepCircle>
          <Heading
            mb={5}
            textAlign="center"
            fontSize="600"
            fontWeight="700"
            as="h4"
          >
            Get your item
          </Heading>
          <Text variant="secondary" textAlign="center">
            Meet with your traveler in a public place and get your item.
          </Text>
        </Box>
      </SimpleGrid>

      <LinkBox mt={16} mx="auto" w="300px">
        <Link to="/order">
          <Button mx="auto" w="100%" variant="primary_dark">
            Order & Save
          </Button>
        </Link>
      </LinkBox>
    </Container>
  )
}
