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
} from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import { Link } from "gatsby-plugin-intl"
import { CrossIcon } from "../../../icons/Cross"
import React, { useContext, useState } from "react"
import { bmify } from "../../../api"
import { Contract } from "../../../types/contract"
import { ContractSteps } from "../../Misc/ContractSteps"
import LayoutStore from "../../../store/LayoutStore"
import { itemGrabbed, removeContract } from "../../../api/contract"
import { TripPageState } from "../../../providers/navPage"

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
      itemGrabbed(contract.id)
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
            <Button
              isLoading={loading}
              onClick={grabHandler}
              size="sm"
              variant="success"
            >
              Product Grabbed
            </Button>
          )
          break

        default:
          return (
            <Button isLoading={loading} size="sm" variant="primary">
              Send message
            </Button>
          )
      }
    }

    return (
      <Box py={4} transition="0.3s ease">
        <Flex alignItems="center" mb={3}>
          <Box overflow="hidden" mr={3}>
            <Link to={`/orders/${contract.order.id}`}>
              <Text className="clamp-1" fontWeight="700" as="h3">
                {contract.order.title}
              </Text>
            </Link>
          </Box>
          <IconButton
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
      </Box>
    )
  }
)
