import { Box, Button, Heading, Input, Text, Textarea } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import React, { useContext, useState } from "react"
import { Rating } from "../../Misc/Rating"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { OrderPageState } from "../../../providers/navPage"
import { dropReview } from "../../../api/contract"
import { Review } from "../../../types/review"

export const ReviewUserCard = chakra(({ className }) => {
  const { handleSubmit, register, errors } = useForm()
  const context = useContext(OrderPageState)
  const [review, setReview] = useState()
  const [loading, setLoading] = useState(false)
  const addReview = data => {
    setLoading(true)
    dropReview(context.contract.id, data)
      .then(e => {
        const review: Review = {
          comment: data.comment,
          date: new Date().toUTCString(),
          rating: data.rating,
          id: 0,
          reviewFrom: context.contract.order.owner,
          reviewTo: context.contract.trip.owner.id,
        }
        context.contract.review = review
        context.setContract({ ...context.contract })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Box className={className} onSubmit={handleSubmit(addReview)} as="form">
      <Heading mb={4} as="h1" fontSize="600" fontWeight="700">
        Leave an honest review
      </Heading>
      <FormControl mb={5} id="review">
        <FormLabel mb={0} color="text.medium">
          How did the traveler do?
        </FormLabel>
        <Rating
          rating={review}
          onChange={setReview}
          fontSize="600"
          readonly={false}
        />
        <Input
          type="hidden"
          value={review}
          name="rating"
          ref={register({ required: "Please provide a ranking" })}
        />
        <Text color="danger.base" as="small">
          {errors.rating?.message}
        </Text>
      </FormControl>
      <FormControl mb={5} id="feedback">
        <FormLabel color="text.medium">
          Share more about your experience
        </FormLabel>
        <Textarea
          ref={register({ required: "Please provide a detailed feedback" })}
          name="comment"
          variant="outline"
          bg="white"
        ></Textarea>
        <Text color="danger.base" as="small">
          {errors.comment?.message}
        </Text>
      </FormControl>
      <Button isLoading={loading} type="submit" variant="success">
        Submit Review
      </Button>
    </Box>
  )
})
