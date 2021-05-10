import { Box, chakra, Spinner } from "@chakra-ui/react"
import React from "react"

export const Loader = chakra(({ className }) => {
  return (
    <Box mx="auto" h="50px" w="50px">
      <Spinner />
    </Box>
  )
})
export const BigLoader = () => {
  return (
    <Box w="300px" h="300px" mx="auto">
      <img height="300" width="300" src="/preloader/preloader.svg" />
    </Box>
  )
}

// Pattern Ref remove
// https://www.amazon.com/gp/product/B07CQD9LWR?pf_rd_r=Z3E3P7PCEVT4MN5HMQ3Q&pf_rd_p=5ae2c7f8-e0c6-4f35-9071-dc3240e894a8&pd_rd_r=b141b906-1af7-4351-8fbf-2ac887acc696&pd_rd_w=vAKnO&pd_rd_wg=DDQhM&ref_=pd_gw_unk

// https://www.amazon.com/gp/product/B07CQD9LWR?pf_rd_r=Z3E3P7PCEVT4MN5HMQ3Q&pf_rd_p=5ae2c7f8-e0c6-4f35-9071-dc3240e894a8&pd_rd_r=b141b906-1af7-4351-8fbf-2ac887acc696&pd_rd_w=vAKnO&pd_rd_wg=DDQhM&linkCode=ll1&tag=briddgywebsit-20&linkId=762747f5e9a0952d84607e23a83ecaf1&language=en_US&ref_=as_li_ss_tl

//https://www.amazon.com/Kingston-128GB-DT100G3-Everything-Stromboli/dp/B07VKQ185Y/ref=pd_day0_4?pd_rd_w=ZdcA6&pf_rd_p=8ca997d7-1ea0-4c8f-9e14-a6d756b83e30&pf_rd_r=0DS6NP4ANF36KGH58Q21&pd_rd_r=59f9bf47-89d0-4b8a-bc03-6a452043a248&pd_rd_wg=pULJa&pd_rd_i=B07VKQ185Y&psc=1
//https://www.amazon.com/Kingston-128GB-DT100G3-Everything-Stromboli/dp/B07VKQ185Y?pd_rd_w=ZdcA6&pf_rd_p=8ca997d7-1ea0-4c8f-9e14-a6d756b83e30&pf_rd_r=0DS6NP4ANF36KGH58Q21&pd_rd_r=59f9bf47-89d0-4b8a-bc03-6a452043a248&pd_rd_wg=pULJa&pd_rd_i=B07VKQ185Y&psc=1&linkCode=ll1&tag=briddgywebsit-20&language=en_US&ref_=as_li_ss_tl

//https://www.amazon.com/Kingston-128GB-DT100G3-Everything-Stromboli/dp/B07VKQ185Y?pd_rd_w=ZdcA6&pf_rd_p=8ca997d7-1ea0-4c8f-9e14-a6d756b83e30&pf_rd_r=0DS6NP4ANF36KGH58Q21&pd_rd_r=59f9bf47-89d0-4b8a-bc03-6a452043a248&pd_rd_wg=pULJa&pd_rd_i=B07VKQ185Y&psc=1&linkCode=ll1&tag=briddgywebsit-20&linkId=21d3d03370898856d8ffaae83f87b379&language=en_US&ref_=as_li_ss_tl
