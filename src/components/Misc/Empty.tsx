import { Box, Center, chakra, Text } from "@chakra-ui/react"
import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
export const Empty = chakra(({ className, text }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          empty: file(relativePath: { eq: "empty.png" }) {
            childImageSharp {
              fixed(width: 300) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
    >
      {data => (
        <Center className={className} flexWrap="wrap" mx="auto">
          <Img fixed={data.empty.childImageSharp.fixed} />

          <Text textAlign="center" w="100%" fontSize="xl">
            {text}
          </Text>
        </Center>
      )}
    </StaticQuery>
  )
})
