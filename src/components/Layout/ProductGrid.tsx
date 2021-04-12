import { Grid } from "@chakra-ui/react"
import { StaticQuery } from "gatsby"
import React from "react"
import { graphql } from "gatsby"
import { ProductCard } from "../Cards/Order/Product"
/**
 * Product Grid That is used in Home Page and Orders page
 *
 */
export const ProductGrid = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          products_horizontal: markdownRemark(
            fields: { sourceName: { eq: "products" } }
            frontmatter: { vertical: { eq: false } }
          ) {
            frontmatter {
              title
              date
              store
              vertical
              price
              image {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              templateKey
              description
              featuredpost
              tag
              color
            }
          }
          products_vertical: allMarkdownRemark(
            filter: {
              fields: { sourceName: { eq: "products" } }
              frontmatter: { vertical: { eq: true } }
            }
            limit: 4
          ) {
            edges {
              node {
                frontmatter {
                  title
                  date
                  store
                  vertical
                  price
                  image {
                    childImageSharp {
                      fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  templateKey
                  description
                  featuredpost
                  tag
                  color
                }
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <Grid pt="50px" templateColumns="repeat(8, 1fr)" gap={[3, 5, 8]}>
            <ProductCard
              gridColumn={["1 / span 4", "1 / span 4", "1 / span 2"]}
              product={data.products_vertical.edges?.[0].node.frontmatter}
            />
            <ProductCard
              gridColumn={["5 / span 4", "5 / span 4", "3 / span 2"]}
              product={data.products_vertical.edges?.[1].node.frontmatter}
            />
            <ProductCard
              gridColumn={["1 / span 8", "1 / span 8", "5 / span 4"]}
              product={data.products_horizontal.frontmatter}
            />
          </Grid>
        )
      }}
    />
  )
}
