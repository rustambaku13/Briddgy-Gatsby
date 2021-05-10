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
    
  } else{
    // Normal
    const reg = url.toString().match(REF_REGEX)
    if(!reg)return url
    const tmp_url =  new URL(reg[1])
    copyUrlParams(url.searchParams,tmp_url.searchParams)
    fillOurData(tmp_url)
    return tmp_url.toString()
  }

}

export const getAffiliateLink = (url:string)=>{
  const url_obj = new URL(url)
  
  switch(url_obj.hostname){
    case "www.amazon.com":
      return amazonAffiliateLink(url_obj)
    
  }
  return url
}