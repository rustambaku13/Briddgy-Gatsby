import {
  Box,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useRadioGroup,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { StarIcon } from "../../icons/Star"
import { MiniTestimonialCard } from "../Cards"
import { Rating } from "../Misc/Rating"
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
    >
      <Box maxW="380px" flex="1">
        {count.map(value => {
          const radio = getRadioProps({ value, enterKeyHint: "Enter" })

          return (
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
              _hover={{ boxShadow: "xl" }}
              _checked={{ boxShadow: "2xl" }}
              boxShadow="md"
            />
          )
        })}
      </Box>
      <TabPanels as="article" flex="1" maxW="600px">
        <TabPanel>
          <Text as="h3" fontSize="2xl" fontWeight="600">
            Not bad
          </Text>
          <Text variant="secondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </TabPanel>
        <TabPanel>
          <Text as="h3" fontSize="2xl" fontWeight="600">
            Ayse Ceren
          </Text>
          <Rating fontSize="2xl" readonly rating={3} />
          <Text variant="secondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </TabPanel>
        <TabPanel>
          <Text as="h3" fontSize="2xl" fontWeight="600">
            It was a great experience
          </Text>
          <Text variant="secondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
