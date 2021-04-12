import {
  AspectRatio,
  Box,
  Center,
  chakra,
  Flex,
  Heading,
  Tag,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { Blog } from "../../../types/blog"
import Img from "gatsby-image"
import { Link } from "gatsby-plugin-intl"
export const BlogLinkCard = chakra(
  ({ blog, className }: { blog: Blog; className?: any }) => {
    return (
      <Flex className={className + " blog-post"} mb={4}>
        <Box mb={5} flex={3} overflow="hidden" mr={[2, 4, 6]}>
          <Img fluid={blog.featuredimage.childImageSharp.fluid} />
        </Box>
        <Box flex={3}>
          {blog.tag.map(item => (
            <Tag mb={5} mr={1} colorScheme="blue">
              {item}
            </Tag>
          ))}
          <Link to="blog/">
            <Heading mb={5} fontSize="2xl" as="h3">
              {blog.title}
            </Heading>
          </Link>
          <Text variant="secondary">{blog.description}</Text>
          <Link to="blog/">
            <Text color="tealBlue.base" as="span">
              Read more
            </Text>
          </Link>
        </Box>
      </Flex>
    )
  }
)
