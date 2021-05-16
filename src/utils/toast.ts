export const contractSuccessToast = toast => {
  toast({
    title: "Proposal was made",
    description: "Wait for the orderer to confirm your delivery",
    status: "success",
    duration: 3000,
    isClosable: true,
  })
}
export const TOASTS = {
  "DELETE_TRIP_FAIL":{
    title: "Failed to delete Trip",
    description: "Make sure to handle all your deals before deleting your trip",
    status: "error",
    duration: 5000,
    isClosable: true,
  },
  "DELETE_ORDER_FAIL":{
    title: "Failed to delete Order",
    description: "Make sure to handle your deals before deleting your order",
    status: "error",
    duration: 5000,
    isClosable: true,
  }
}