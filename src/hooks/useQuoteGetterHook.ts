import React, { useEffect, useState } from "react"
import { getQuote } from "../api/order"
import UserStore from '../store/UserStore'

export const useQuoteGetterHook = (item_price = 0, reward, condition) => {
  const [prices, setPrices]: [any, any] = useState({ loading: true })

  useEffect(() => {
    if (condition) {
      getQuote(item_price,reward,UserStore.me?.promo_balance || 0,UserStore.me?.balance)
      .then(({data})=>{
        setPrices(data)
      })
      .catch(()=>{

      })
    }
  }, [item_price, reward, condition])

  return prices
}
