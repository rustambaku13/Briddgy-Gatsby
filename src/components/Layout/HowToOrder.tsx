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
import card from "../../images/debit-cardicon.svg"
import earth from "../../images/earthicon.svg"
import note from "../../images/noteicon.svg"
import plane from "../../images/planeicon.svg"
import { Link } from "gatsby-plugin-intl"

export const HowToOrder = () => {
  return (
    <Container py="60px" mb={[20, 20, "150px"]} maxW="full" as="section">
      <Heading mb="80px" fontSize="hb3" fontWeight="700" textAlign="center">
        How to Shop for anywhere with low costs
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
            <CImg alt="Add Trip" height="60px" width="60px" src={earth} />
          </StepCircle>
          <Heading
            mb={5}
            textAlign="center"
            fontSize="600"
            fontWeight="700"
            as="h4"
          >
            Add Trip
          </Heading>
          <Text variant="secondary" textAlign="center">
            Start by adding your trip information to see requested orders. It
            only takes 1 minute
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
            Make offers
          </Heading>
          <Text variant="secondary" textAlign="center">
            Offer delivery offers to the orderers, contact and chat with them.
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
            <CImg
              alt="Buy and deliver"
              height="60px"
              width="60px"
              src={plane}
            />
          </StepCircle>
          <Heading
            mb={5}
            textAlign="center"
            fontSize="600"
            fontWeight="700"
            as="h4"
          >
            Buy and deliver
          </Heading>
          <Text variant="secondary" textAlign="center">
            Depending on the order type you might need to buy & deliver or
            simply grab & deliver the porduct.
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
            <CImg alt="Earn money" height="60px" width="60px" src={card} />
          </StepCircle>
          <Heading
            mb={5}
            textAlign="center"
            fontSize="600"
            fontWeight="700"
            as="h4"
          >
            Earn money
          </Heading>
          <Text variant="secondary" textAlign="center">
            After you have delivered the item you are going to receive the
            payment.
          </Text>
        </Box>
      </SimpleGrid>

      <LinkBox mt={16} mx="auto" w="300px">
        <Link to="/travel">
          <Button mx="auto" w="100%" variant="primary_dark">
            Order & Save
          </Button>
        </Link>
      </LinkBox>
    </Container>
  )
}
