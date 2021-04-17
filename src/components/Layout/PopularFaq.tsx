import React from "react"
import { chakra, VStack, Text, Box } from "@chakra-ui/react"
import { graphql, StaticQuery } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import { LinkOverlay } from "../Misc/LinkOverlay"
import { FaqLinkCard } from "../Cards/Faq/FaqLinkCard"

export const PopularFaq = chakra(({ className }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          popular: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "faq" } } }
          ) {
            nodes {
              frontmatter {
                title
                templateKey
                language
                popular
                topic
              }
              html
              timeToRead
              fileAbsolutePath
            }
          }
        }
      `}
      render={data => {
        return (
          <VStack>
            {data.popular.nodes.map(element => (
              <FaqLinkCard data={element} />
            ))}
          </VStack>
        )
      }}
    />
  )
})
