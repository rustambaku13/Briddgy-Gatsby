import {
  chakra,
  Center,
  Text,
  LinkBox,
  Box,
  Heading,
  Flex,
} from "@chakra-ui/react"
import React from "react"
import Img from "gatsby-image"
import { LinkOverlay } from "../../Misc/LinkOverlay"
import { Link } from "gatsby-plugin-intl"
import { graphql, StaticQuery } from "gatsby"
import { ChevronRightIcon } from "../../../icons/ChevronRight"

export const FaqElement = chakra(({ topic, title, img }) => {
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
                slug
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
        const filtered = data.popular.nodes.filter(faq => {
          return faq.frontmatter.topic == topic
        })

        return (
          <Flex alignItems="center" flexDir="column">
            <Img fixed={img.childImageSharp.fixed} />
            <Heading fontWeight="bold" my={8} fontSize="700" as="h2">
              {title}
            </Heading>
            {filtered.map(item => (
              <>
                <Text variant="light" _hover={{ color: "tealBlue.base" }}>
                  <Link to={`/faq/post/${item.frontmatter.slud}`}>
                    {item.frontmatter.title}
                  </Link>
                  <ChevronRightIcon />
                </Text>
              </>
            ))}
          </Flex>
        )
      }}
    />
  )
})
export const FaqElements = chakra(({ key, title, className, text, to }) => {
  return (
    <LinkBox
      flexDir="column"
      py={12}
      bg="white"
      _hover={{
        bg: "outline.light",
      }}
      d="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="base"
      borderWidth="1px"
    >
      <Img fixed={img.childImageSharp.fixed} />
      <LinkOverlay to={to}>
        <Text mt={5} fontSize="700" fontWeight="600">
          {text}
        </Text>
      </LinkOverlay>
    </LinkBox>
  )
})
