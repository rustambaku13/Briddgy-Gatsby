import { Container, Text } from "@chakra-ui/react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { Helmet } from "react-helmet"
import Navbar from "../../components/Navbar"
const NotFound = ({ data }) => {
  return (
    <>
      <Helmet title="Briddgy | Page Not Found" defer={false}>
        <meta
          name="description"
          content="Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money."
        />
      </Helmet>
      <Navbar />
      <Container w="100%" maxW="container.lg">
        <Img fluid={data.image_404.childImageSharp.fluid} />
        <Text fontSize="xl" variant="secondary" textAlign="center">
          The requested page was not found :(
        </Text>
      </Container>
    </>
  )
}

export const query = graphql`
  query {
    image_404: file(relativePath: { eq: "404 Error.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default NotFound
