import { Order } from "../types/orders"

const REF_REGEX = new RegExp("(.*)\/ref")
const fillOurData = (url_obj)=>{
  url_obj.searchParams.set("linkCode", "ll1")
    url_obj.searchParams.set("tag", "briddgywebsit-20")
    url_obj.searchParams.set("ref_", "as_li_ss_tl")
}
const copyUrlParams = (url1,url2)=>{
  for (let p of url1) {
    url2.set(p[0],p[1])
  }
}
const amazonAffiliateLink = (url: URL) => {
  if (url.searchParams.has("ref")) {
    // Already an affiliated probably
    fillOurData(url)
    return url.toString()
    
  } 
  const reg = url.toString().match(REF_REGEX)
  if(reg){
    // Ref is at the end of the url
    const tmp_url =  new URL(reg[1])
    copyUrlParams(url.searchParams,tmp_url.searchParams)
    fillOurData(tmp_url)
    return tmp_url.toString()
  }
  fillOurData(url)
  return url.toString()
}

export const getAffiliateLink = (url:string)=>{
  try{
    const url_obj = new URL(url)
  
  switch(url_obj.hostname){
    case "www.amazon.com":
      return amazonAffiliateLink(url_obj)
    default:
      return url
  }
  }catch(e){
    return url
  }
  
}

export const affiliatize = (order:Order)=>{
  if(order.order_url){
    order.order_url = getAffiliateLink(order.order_url)
  }
}