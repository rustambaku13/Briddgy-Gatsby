import React, { useRef, useState } from "react"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import LayoutStore from "../../store/LayoutStore"
export const AreYouSure = observer(() => {
  const cancelRef = useRef()
  const [loading, setLoading] = useState(false)
  const onClose = () => {
    LayoutStore.alertDialogModalOpen(null)
  }
  const onSubmit = () => {
    setLoading(true)
    LayoutStore.alertDialogModalContext
      .callback()
      .then(e => {
        onClose()
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <AlertDialog
      isOpen={LayoutStore.alertDialogModalVisible}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {LayoutStore.alertDialogModalContext?.title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {LayoutStore.alertDialogModalContext?.description}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose} ref={cancelRef}>
              {LayoutStore.alertDialogModalContext?.no}
            </Button>
            <Button
              isLoading={loading}
              onClick={onSubmit}
              color="white"
              bg="danger.base"
              ml={3}
            >
              {LayoutStore.alertDialogModalContext?.yes}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
})
