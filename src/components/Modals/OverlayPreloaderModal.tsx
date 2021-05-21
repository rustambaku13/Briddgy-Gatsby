import { observer } from "mobx-react-lite";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    Center,
    Textarea,
  } from "@chakra-ui/react"
  import React, { useEffect, useState } from "react"
  import LayoutStore from "../../store/LayoutStore"
import { Loader } from "../Misc/Loader";

export const OverlayPreloaderModal = observer(()=>{

    return(
        <Modal
      isOpen={LayoutStore.overlayPreloaderModalVisible}
      onClose={() => {
        LayoutStore.overlayPreloaderModalClose()
      }}
    >
        <ModalOverlay />
    <ModalContent>
      <ModalHeader fontSize="hb1">{LayoutStore.overlayPreloaderModalContext?.text}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Loader />
      </ModalBody>
    </ModalContent>

    </Modal>
    )




})