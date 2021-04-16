export const contractSuccessToast = toast => {
  toast({
    title: "Proposal was made",
    description: "Wait for the orderer to confirm your delivery",
    status: "success",
    duration: 3000,
    isClosable: true,
  })
}
