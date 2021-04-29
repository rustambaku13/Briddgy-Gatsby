import ARating from "react-rating"
import { StarIcon, StarIconNoFill } from "../../icons/Star"
import React from "react"
import { chakra } from "@chakra-ui/react"
export const Rating = chakra(({ rating, className, readonly, onChange }) => {
  return (
    <ARating
      onChange={onChange}
      readonly={readonly}
      className={className}
      initialRating={rating}
      fullSymbol={<StarIcon />}
      emptySymbol={<StarIconNoFill />}
    />
  )
})
