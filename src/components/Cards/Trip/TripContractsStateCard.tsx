import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link as CLink,
  Image,
  Text,
  IconButton,
  VStack,
} from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import { Link } from "gatsby-plugin-intl"
import { CrossIcon } from "../../../icons/Cross"
import React, { useContext, useState } from "react"
import { bmify } from "../../../api"
import { Contract, Contracts } from "../../../types/contract"
import { ContractSteps } from "../../Misc/ContractSteps"
import LayoutStore from "../../../store/LayoutStore"
import { itemGrabbed, removeContract } from "../../../api/contract"
import { TripPageState } from "../../../providers/navPage"
import { SendMessage } from "../../Misc/SendMessageButton"
import { Hint } from "../../Misc/Hint"

const STATE_TEXT = (state)=>{
  switch(state){
    case "SET":
      return "Deal has been settled. Waiting for orderer to make the payment"
    case "FRZ":
      return "Payment is received. Purchase the product and confirm it."
    case "GRB":
      return "Deliver the product and ask the orderer to confirm the delivery."
    case "DLV":
        return "You did great😃 You will receive your payment in 1 week"
    default:
      return null
  }


}

const cancelButtonDisplay = (contract:Contract)=>{
  switch(contract.state){
    case "BID":
      return true
    case "SET":
      return true
    case "FRZ":
      return true
    default:
      return false
  }
}

export const TripContractsStateCard = chakra(
  ({ className, contract }: { className?: any; contract: Contract }) => {
    const context = useContext(TripPageState)
    const [loading, setLoading] = useState(false)
    const cancelHandler = async () => {
      await removeContract(contract.id)
      context.contracts.results = context.contracts.results.filter(
        item => item.id != contract.id
      )
      context.contracts.count--
      context.setContracts({ ...context.contracts })
    }
    const grabHandler = () => {
      setLoading(true)
      return itemGrabbed(contract.id)
        .then(() => {
          contract.state = "GRB"
          context.setContracts({ ...context.contracts })
        })
        .finally(() => {
          setLoading(false)
        })
    }
    const ButtonSwitch = () => {
      switch (contract.state) {
        case "FRZ":
          return (
            <VStack alignItems="flex-end" mt={3}>
              <SendMessage
                flex="0 0 auto"
                w="100%"
                user={contract.order.owner}
                size="sm"
                variant="outline"
                color="tealBlue.base"
              >
                Send message
              </SendMessage>
              <Button
                flex="0 0 auto"
                ml="auto"
                isLoading={loading}
                onClick={() => {
                  LayoutStore.alertDialogModalOpen({
                    title: "Product Purchased",
                    yes: "Yes",
                    success: true,
                    callback: grabHandler,
                    no: "No",
                    description:
                      "Do you confirm that you have purchased the item? You can not cancel the deal once you have purchased the item",
                  })
                }}
                size="sm"
                variant="success"
              >
                Product Purchased
              </Button>
            </VStack>
          )
          break

        default:
          return (
            <SendMessage
              flex="0 0 auto"
              size="sm"
              user={contract.order.owner}
              variant="outline"
              color="tealBlue.base"
            >
              Send message
            </SendMessage>
          )
      }
    }

    return (
      <Box py={4} transition="0.3s ease">
        <Flex alignItems="center" mb={3}>
          <Box overflow="hidden" mr={3}>
            <Link to={`/orders/${contract.order.id}`} state={{haveProposal:true}}>
              <Text className="clamp-1" fontWeight="700" as="h3">
                {contract.order.title}
              </Text>
            </Link>
          </Box>
          <IconButton
            d={cancelButtonDisplay(contract)?"block":"none"}
            onClick={() => {
              LayoutStore.alertDialogModalOpen({
                title: "Cancel Deal",
                yes: "Yes",
                callback: cancelHandler,
                no: "No",
                description: "Are you sure you want to cancel the deal? ",
              })
            }}
            ml="auto"
            color="danger.base"
            fontSize="200"
            size="xs"
            aria-label="Delete"
            icon={<CrossIcon />}
          />
        </Flex>
        <Flex alignItems="center">
          <AspectRatio
            mr={3}
            ratio={1}
            borderWidth="1px"
            borderRadius="base"
            w="4.5em"
          >
            <Image src={bmify(contract.order.orderimage?.[0])} />
          </AspectRatio>
          <Box flex={1}>
            <Text variant="light">
              Buy From{" "}
              <CLink href={contract.order.order_url} color="tealBlue.base">
                {contract.order.host}
              </CLink>
            </Text>
            <Text variant="light">
              Your reward{" "}
              <Text as="span" fontWeight="700" color="text.dark">
                ${contract.price_bid}
              </Text>
            </Text>
            <Text variant="light">
              Product price{" "}
              <Text as="span" color="text.dark">
                ${contract.order.item_price}
              </Text>
            </Text>
          </Box>
          <ButtonSwitch />
        </Flex>
        <ContractSteps w="100%" contract={contract} />
        <Hint d={STATE_TEXT(contract.state)?"block":"none"} text={STATE_TEXT(contract.state)}  textAlign='center' color='warning.dark' mt={2}>
            
        </Hint>
      </Box>
    )
  }
)
