import React, { useEffect, useState } from "react"
import { useDidUpdateEffect } from "./useDidUpdateEffect"

export const useQuoteGetterHook = (item_price = 0, reward, condition) => {
  const [prices, setPrices]: [any, any] = useState({ loading: true })

  useEffect(() => {
    if (condition) {
      setTimeout(function () {
        setPrices({
          loading: false,
          item_price: item_price,
          reward: reward,
          total: "200",
          commision: "7.33",
          transfer: "10.99",
        })
      }, 1000)
    }
  }, [item_price, reward, condition])

  return prices
}
