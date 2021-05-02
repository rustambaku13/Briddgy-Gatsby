import { Box, Center, chakra, Text } from "@chakra-ui/react"
import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
export const Empty = chakra(({ className, text, subText }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          empty: file(relativePath: { eq: "empty.png" }) {
            childImageSharp {
              fixed(width: 80, height: 80) {
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

          <Text textAlign="center" mt={2} w="100%" fontSize="500">
            {text}
          </Text>
          {subText ? (
            <Text
              textAlign="center"
              variant="secondary"
              mt={2}
              w="100%"
              fontSize="400"
            >
              {subText}
            </Text>
          ) : null}
        </Center>
      )}
    </StaticQuery>
  )
})
