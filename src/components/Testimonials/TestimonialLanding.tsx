import {
  Box,
  Divider,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useRadioGroup,
} from "@chakra-ui/react"
import React, { useState } from "react"
import SwiperCore, { Autoplay } from "swiper"

import { Swiper, SwiperSlide } from "swiper/react"
import { MiniTestimonialCard } from "../Cards/Testimonial/MiniTestimonial"
import { Rating } from "../Misc/Rating"
SwiperCore.use([Autoplay])
export const TestimonialLanding = ({}) => {
  const [selectedTab, setSelectedTab] = useState("0")
  const count = ["0", "1", "2"]
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "group",
    defaultValue: "0",
    onChange: e => {
      setSelectedTab(e.toString())
    },
  })

  return (
    <Tabs
      index={parseInt(selectedTab)}
      d="flex"
      justifyContent="space-between"
      h="100%"
      w="100%"
      flexWrap={["wrap", "wrap", "nowrap"]}
    >
      <Box d={["block", "block", "none"]} w="100%">
        <Swiper
          autoplay={{ delay: 2000 }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          spaceBetween={40}
          slidesPerView={1}
          onSlideChangeTransitionEnd={e => {
            setSelectedTab(e.activeIndex)
          }}
        >
          {count.map(value => {
            const radio = getRadioProps({ value, enterKeyHint: "Enter" })

            return (
              <SwiperSlide>
                <MiniTestimonialCard
                  key={value}
                  {...radio}
                  firstName="Rustam"
                  lastName="Quliyev"
                  memberSince="2019"
                  cursor="pointer"
                  img="salam"
                  p={5}
                  transition=".2s ease-in"
                  mb={5}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <Divider />
      </Box>
      <Box display={["none", "none", "block"]} maxW="450px" w="100%">
        {count.map(value => {
          const radio = getRadioProps({ value, enterKeyHint: "Enter" })

          return (
            <MiniTestimonialCard
              key={value}
              {...radio}
              firstName="Rustam"
              lastName="Quliyev"
              memberSince="2019"
              boxShadow="md"
              _hover={{ boxShadow: "lg" }}
              _checked={{ boxShadow: "2xl" }}
              cursor="pointer"
              img="salam"
              p={5}
              transition=".2s ease-in"
              mb={5}
            />
          )
        })}
      </Box>
      <TabPanels w="100%" as="article" maxW="600px">
        <TabPanel>
          <Text as="h3" fontSize="hb1" fontWeight="600">
            Camila Ravelet
          </Text>
          <Rating fontSize="hb1" readonly rating={5} />
          <Text mt={3} variant="secondary">
            I am seven and a half moths of pregnant and cannot wait to have my
            baby boy in my arms. I discovered Grabr through social media and I
            thought it was a great Idea, so I decided to try it. Everything
            worked out, so I will continue ordering items for my baby. My first
            order was a Kiddy Care Diaper Bag Backpack Multi Function, and I am
            so happy that I paid half of what it sells for on MercadoLibre.
          </Text>
        </TabPanel>
        <TabPanel>
          <Text as="h3" fontSize="hb1" fontWeight="600">
            Emmanuelle Tamaru
          </Text>
          <Rating fontSize="hb1" readonly rating={5} />
          <Text mt={3} variant="secondary">
            Do you know how a child looks when she get candy before lunch?
            That’s me today with my new YSL purse. I got it from Grabr app and I
            was really surprised how cheaper It was! Even better is the
            plataform purpose of connecting people that wants a product from
            abroad to those that are traveling to their destination.
          </Text>
        </TabPanel>
        <TabPanel>
          <Text as="h3" fontSize="hb1" fontWeight="600">
            Ksenia Sokolyanskaya
          </Text>
          <Rating fontSize="hb1" readonly rating={5} />
          <Text variant="secondary" mt={3}>
            It was a real trouble finding Arizona Beverages in Russia. We have
            this drink in Russia, but in other flavors. Amazon only sells
            packages of 30 cans. It would be more money saving to go to the US,
            have an Arizona drink somewhere on Manhattan than bring 30kg to
            Moscow. I found the item I needed in Kazahstan, but in a local shop
            that does not ship to Moscow. Than Grabr came in handy. I got a
            whole package of Watermelon Arizona cans delivered to me.
          </Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
