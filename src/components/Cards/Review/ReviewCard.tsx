import { Box, Flex, Text } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import moment from "moment"
import React from "react"
import { FRONTEND_DATE_FORMAT } from "../../../api"
import { Review } from "../../../types/review"
import { Avatar } from "../../Avatar/Avatar"
import { Rating } from "../../Misc/Rating"

export const ReviewCard = chakra(
  ({ className, review }: { review: Review; className?: any }) => {
    return (
      <Box className={className}>
        <Flex mb={5} alignItems="center" w="100%">
          <Avatar mr={2} user={review.reviewFrom} />
          <Box>
            <Text>{`${review.reviewFrom.first_name} ${review.reviewFrom.last_name}`}</Text>
            <Rating fontSize="400" readonly rating={review.rating} />
          </Box>
          <Text
            variant="secondary"
            fontWeight="700"
            textAlign="right"
            fontSize="400"
            flex={1}
          >
            {moment(review.date).format(FRONTEND_DATE_FORMAT)}
          </Text>
        </Flex>
        <Text>{review.comment}</Text>
      </Box>
    )
  }
)
