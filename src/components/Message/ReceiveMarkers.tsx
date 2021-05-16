import { Box, Text } from "@chakra-ui/layout"
import moment from "moment"
import React from "react"
import Tinode from "tinode-sdk"
import CheckIcon from "../../icons/Check"
import CrossIcon from "../../icons/Cross"

export const ReceiveMarkers = ({ received, timestamp }) => {
  let time
  if (received <= Tinode.MESSAGE_STATUS_SENDING) {
    timestamp = "..."
  } else if (received == Tinode.MESSAGE_STATUS_FAILED) {
    timestamp = <CrossIcon fontSize="200" />
  } else {
    timestamp = moment(timestamp).format("HH:mm")
  }

  let marker = null
  if (received <= Tinode.MESSAGE_STATUS_SENDING) {
    // marker = <i className="material-icons small">access_time</i> // watch face
  } else if (received == Tinode.MESSAGE_STATUS_FAILED) {
    // marker = <i className="material-icons small amber">warning</i> // yellow icon /!\
  } else if (received == Tinode.MESSAGE_STATUS_SENT) {
    marker = (
      <Box as="i" color="text.light" fontSize="200">
        <CheckIcon />
      </Box>
    )
  } else if (received == Tinode.MESSAGE_STATUS_READ) {
    marker = (
      <Box as="i" color="success.light" fontSize="200" >
        <CheckIcon  />
      </Box>
    ) // blue double checkmark
  }

  return (
    <Box float="right" pl={2} textAlign="right">
      <Text pr={1} fontSize="200" as="small" variant="secondary">
        {timestamp}
      </Text>
      {marker}
    </Box>
  )
}
