import { Box, Text, Flex, Heading } from "@chakra-ui/react"
import { Link } from "gatsby"
import React from "react"
import Img from "gatsby-image"
import { chakra } from "@chakra-ui/react"
import { CountryFlagsLazy } from "../../Misc/CountryFlagsLazy"
// This Component is the destination in the landing page.
const TravelDestinationCard = chakra(function ({
  img,
  destinationId,
  destinationName,
  tripsCount,
  ordersCount,
  rewardsAvailable,
  className,
}) {
  return (
    <Link style={{ height: "100%" }} to={`/orders/${destinationId}`}>
      <Flex
        className={className + " travel-destination-card"}
        border="1px solid"
        borderRadius="lg"
        h="100%"
        borderColor="gray.300"
        maxH={["unset", "420px"]}
        maxW={["unset", "290px"]}
        transition=".2s ease-in-out"
        _hover={{ bg: "gray.100" }}
        flexDir="column"
      >
        <Box  borderBottomWidth='1px' p={3}>
          <Heading fontSize="xl" as="h4" mb={1}>
            {destinationName}
          </Heading>
          <Text fontSize="sm" variant="secondary">
            {/* {tripsCount} trips | {ordersCount} orders */}
            &nbsp;
          </Text>
        </Box>
        <Box overflow="hidden" flexGrow={1}>
          <Img className="full-width" alt="Travel Destination" fixed={img} />
        </Box>
        <Box borderTopWidth='1px' p={2}>
          <Text variant="secondary">Rewards available</Text>
          <Text variant='secondary ' fontSize="xl" fontWeight={600}>
            {/* $ {rewardsAvailable} */}
            Coming soon
          </Text>
        </Box>
      </Flex>
    </Link>
  )
})
export { TravelDestinationCard }
