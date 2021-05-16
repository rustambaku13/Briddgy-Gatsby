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
import { flowResult } from "mobx"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import LayoutStore from "../../store/LayoutStore"
import { CountrySelector } from "../Inputs/CountrySelector"
import { IncrementalNumberSelector } from "../Inputs/IncrementalNumberSelector"
import { Loader } from "../Misc/Loader"
import UserStore from "../../store/UserStore"
import { getOnboardingLink } from "../../api/payment"
import { Hint } from "../Misc/Hint"
import { Link } from "gatsby-plugin-intl"
export const CompleteProfileModal = observer(() => {
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    watch,
    errors,
  } = useForm()
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (page == 1 && LayoutStore.completeProfileModalVisible) {
      getOnboardingLink().then(e => {
        window.location.href = e.data.url
      })
    }
  }, [page, LayoutStore.completeProfileModalVisible])
  useEffect(() => {
    if (UserStore.me?.is_stripe_verified == "I") setPage(1)
  }, [LayoutStore.completeProfileModalVisible])
  const createAccount = ({ country }) => {
    setLoading(true)
    flowResult(UserStore.createStripeAccount(country))
      .then(() => {
        setPage(1)
      })
      .catch(() => {
        setError("country", { message: "Error has occured" })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Modal
      isOpen={LayoutStore.completeProfileModalVisible}
      onClose={() => {
        LayoutStore.completeProfileModalToggle()
      }}
    >
      {page == 0 ? (
        <form onSubmit={handleSubmit(createAccount)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="hb1">Complete Traveler Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Hint
                bg="lilaPurple.light"
                text="Complete your traveler profile in order to make sure that we can make payouts to you"
              />
              <Text mb={2} fontWeight="600" as="label">
                Country
              </Text>
              <Text fontSize="400" mb={3} variant="secondary">
                Which citizenship do you hold?
              </Text>
              <CountrySelector register={register} />
              <Text color="danger.base" as="small">
                {errors.country?.message}
              </Text>
            </ModalBody>

            <ModalFooter>
              <Link to='/faq/post/supported-countries-temp'>How payout work</Link>
              <Button
                isLoading={loading}
                variant="success"
                type="submit"
                ml="auto"
                px={10}
              >
                Proceed
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      ) : (
        <>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="hb1">Proceeding to Stripe </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Loader />
            </ModalBody>
          </ModalContent>
        </>
      )}
    </Modal>
  )
})
