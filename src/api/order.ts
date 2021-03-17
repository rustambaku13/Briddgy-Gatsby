import { AxiosResponse } from "axios"
import { Orders } from "../types/orders"
import { axios_normal } from "./index"
export async function getOrders(params = {}): Promise<AxiosResponse<Orders>> {
  return axios_normal.get(`/orders/`, { params })
}

export async function getMyOrders(page = 1): Promise<AxiosResponse<Orders>> {
  return await axios_normal.get(`/my/orders/`, { params: { page } })
}

export async function emailSuggestedTravellers(source_id, dest_id) {
 return await axios_normal.get(
          `/emailtravelers/${source_id}/${dest_id}/`
      )
      
  
}


export async function addOrder({
  price,
  title,
  destination,
  source,
  description,
  weight,
  order_url,
  item_price,
  host,
  order_type,
}) {
 
      return await axios_normal.post(`/orders/`, {
          price,
          title,
          destination,
          source,
          description,
          weight,
          order_url,
          host,
          item_price,
          order_type,
      })
      
}

export async function uploadFilestoOrder(files) {
  
      return  await axios_normal.put(
          `/fileupload/orderimage/`,
          files
      )
}