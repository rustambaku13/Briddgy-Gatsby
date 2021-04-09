import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Center,
  chakra,
  Divider,
  Flex,
  Img,
  LinkBox,
  LinkOverlay,
  Link as CLink,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { Link } from "gatsby-plugin-intl"
import moment from "moment"
import React from "react"
import { Rating } from "../../Misc/Rating"
import { bmify, FRONTEND_DATE_FORMAT } from "../../../api"
import { Order } from "../../../types/orders"
import { trimCityEmpty } from "../../../utils/misc"
import { CurvedArrowRight } from "../../../icons/CurvedArrowRight"
import { Avatar } from "../../Avatar/Avatar"

// This page is all about medium sized order compoentns

const OrderStatus = chakra(
  ({ orderData, className }: { orderData: Order; className?: any }) => {
    if (!orderData.deliverer) {
      return (
        <Badge className={className} colorScheme="gray" p={2}>
          unassigned
        </Badge>
      )
    }
    return (
      <Badge className={className} colorScheme="green" p={2}>
        Settled
      </Badge>
    )
  }
)
const MediumOrderCard = chakra(
  ({
    className,
    orderData,
    children,
    status,
  }: {
    className?: any
    orderData: Order
    status?: any
    children?: any
  }) => {
    return (
      <LinkBox w="100%">
        <LinkOverlay>
          <Link className="medium-order-card" to={`/orders/${orderData.id}`}>
            <Box
              w="100%"
              className={className}
              px={6}
              py={4}
              bg="white"
              borderColor="outline.medium"
              borderWidth="1px"
              borderRadius="lg"
            >
              <Flex alignItems="center" w="100%">
                <Avatar mr={2} user={orderData.owner} />
                <Box>
                  <Text>{`${orderData.owner.first_name} ${orderData.owner.last_name}`}</Text>
                  <Rating
                    fontSize="400"
                    readonly
                    rating={orderData.owner.rating}
                  />
                </Box>
                <Text variant="light" textAlign="right" fontSize="400" flex={1}>
                  {moment(orderData.date).format(FRONTEND_DATE_FORMAT)}
                </Text>
              </Flex>
              <Divider my={4} />
              <Flex mb={4}>
                <AspectRatio
                  borderRadius="base"
                  borderWidth="1px"
                  flex={["0 0 80px", "0 0 100px", "0 0 160px"]}
                  mr={4}
                  ratio={1 / 1}
                >
                  <Img
                    alt="Product Image"
                    float="left"
                    src={bmify(orderData.orderimage)}
                  />
                </AspectRatio>
                <VStack overflow="hidden" flex={1} h="100%">
                  <Flex alignItems="center" w="100%">
                    <Text
                      mr={2}
                      as="h3"
                      textOverflow="ellipsis"
                      whiteSpace={["normal", "nowrap"]}
                      overflow="hidden"
                      fontSize={[500, 600]}
                      fontWeight="700"
                      flexGrow={1}
                    >
                      {orderData.title}
                    </Text>
                    <Text
                      whiteSpace="nowrap"
                      fontWeight="700"
                      flexGrow={0}
                      variant="light"
                      as="strong"
                    >
                      {orderData.weight} kg
                    </Text>
                  </Flex>
                  <Box
                    borderColor="outline.medium"
                    borderWidth="1px"
                    bg="lilaPurple.light"
                    w="100%"
                    mb="auto"
                    p={3}
                    d={["none", "block"]}
                    borderRadius="base"
                  >
                    <Text variant="light">
                      Buy From{" "}
                      <CLink href={orderData.order_url} color="warning.dark">
                        {orderData.host}
                      </CLink>
                    </Text>
                    <Text variant="light">
                      Product Price{" "}
                      <Text color="text.medium" as="span">
                        ${orderData.item_price}
                      </Text>
                    </Text>
                  </Box>
                  <Button
                    d={["none", "block"]}
                    mt="auto"
                    variant="primary_dark"
                    w="100%"
                  >
                    Make Offer
                  </Button>
                </VStack>
              </Flex>
              <Box
                borderColor="outline.medium"
                borderWidth="1px"
                bg="lilaPurple.light"
                w="100%"
                mb={4}
                p={2}
                d={["block", "none"]}
                borderRadius="base"
              >
                <Text variant="light">
                  Buy From{" "}
                  <CLink href={orderData.order_url} color="warning.dark">
                    {orderData.host}
                  </CLink>
                </Text>
                <Text variant="light">
                  Product Price{" "}
                  <Text color="text.medium" as="span">
                    ${orderData.item_price}
                  </Text>
                </Text>
              </Box>
              <Button
                d={["block", "none"]}
                mb={4}
                variant="primary_dark"
                w="100%"
              >
                Make Offer
              </Button>
              <HStack alignItems="center" w="100%">
                <Text color="text.medium" as="span">{`${trimCityEmpty(
                  orderData.source.city
                )}${orderData.source.country_en}`}</Text>
                <CurvedArrowRight color="text.light" />
                <Text color="text.medium" as="span">{`${trimCityEmpty(
                  orderData.destination.city
                )}${orderData.destination.country_en}`}</Text>
                <Text fontSize="500" variant="light" flex={1} textAlign="right">
                  Traveler's reward{" "}
                  <Text
                    as="strong"
                    color="text.dark"
                    fontSize="700"
                    fontWeight="700"
                  >
                    ${orderData.price}
                  </Text>
                </Text>
              </HStack>
            </Box>
          </Link>
        </LinkOverlay>
      </LinkBox>
    )
  }
)
// const MediumOrderCard = chakra(
//   ({
//     className,
//     orderData,
//     children,
//     status,
//   }: {
//     className?: any
//     orderData: Order
//     status?: any
//     children?: any
//   }) => {
//     return (
//       <LinkBox>
//         <LinkOverlay>
//           <Link to={`/orders/${orderData.id}`}>
//             <Box
//               display="flex"
//               w="100%"
//               flexFlow="column"
//               _hover={{ boxShadow: "lg" }}
//               transition=".2s ease-in-out"
//               cursor="pointer"
//               borderWidth="1px"
//               overflow="hidden"
//               bg="white"
//               borderRadius="md"
//               padding="4"
//               my={"40px"}
//               className={className}
//             >
//               <Box mb={5} h="60px">
//                 <Avatar
//                   user={orderData.owner}
//                   display="inline-flex"
//                   h="55px"
//                   w="55px"
//                   mr={3}
//                 />
//                 <Flex
//                   h="55px"
//                   display="inline-flex"
//                   flexWrap="wrap"
//                   alignItems="center"
//                 >
//                   <Text fontSize="lg" w="100%">
//                     {orderData.owner.first_name +
//                       " " +
//                       orderData.owner.last_name}
//                   </Text>
//                   <small> {moment(orderData.date).fromNow()}</small>
//                 </Flex>
//                 {status}
//               </Box>
//               <Flex flexGrow={1}>
//                 <Box mr={4} flex={["0 0 120px", "0 0 150px", "0 0 220px"]}>
//                   <Center width="100%" h="100%" p={3} bg="gray.50">
//                     <Img
//                       alt="Product Image"
//                       float="left"
//                       src={bmify(orderData.orderimage)}
//                     />
//                   </Center>
//                 </Box>
//                 <Box flex="1">
//                   <Text fontWeight="600" fontSize="2xl" mb={4}>
//                     {orderData.title}
//                   </Text>
//                   <Text mb={4} variant="secondary">
//                     From{" "}
//                     <Text as="strong" fontWeight="500">{`${trimCityEmpty(
//                       orderData.source.city
//                     )}${orderData.source.country_en}`}</Text>{" "}
//                     to{" "}
//                     <strong>{`${trimCityEmpty(orderData.destination.city)}${
//                       orderData.destination.country_en
//                     }`}</strong>
//                   </Text>
//                   <Box mb={4} bg="lightBlue.200" borderRadius="md" p={3}>
//                     <Text variant="secondary" mb={2}>
//                       Buy From{" "}
//                       <Text as="span" color="orange.300">
//                         {orderData.host}
//                       </Text>
//                     </Text>
//                     <Text variant="secondary" mb={2}>
//                       Item price{" "}
//                       <Text as="span" fontWeight="500">
//                         ${orderData.item_price}
//                       </Text>
//                     </Text>
//                     <Text variant="secondary">
//                       Item Weight{" "}
//                       <Text as="span" fontWeight="500">
//                         {orderData.weight}kg
//                       </Text>
//                     </Text>
//                   </Box>
//                   <Divider />
//                   <Text my={4} verticalAlign="baseline">
//                     Traveler's reward{" "}
//                     <Text as="strong" float="right" mt="-8px" fontSize="2xl">
//                       ${orderData.price}
//                     </Text>
//                   </Text>
//                   {children}
//                 </Box>
//               </Flex>
//             </Box>
//           </Link>
//         </LinkOverlay>
//       </LinkBox>
//     )
//   }
// )

export const MyMediumOrderCard = props => {
  return (
    <MediumOrderCard {...props}>
      <Button mt="auto" variant="primary" w="100%">
        View Order
      </Button>
    </MediumOrderCard>
  )
}

export const PublicMediumOrderCard = props => {
  return (
    <MediumOrderCard status={null} {...props}>
      <Button mt="auto" variant="primary" w="100%">
        View Order
      </Button>
    </MediumOrderCard>
  )
}
