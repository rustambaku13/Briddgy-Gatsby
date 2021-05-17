import { Box, Center, Container, Divider, Heading, Text } from "@chakra-ui/react"
import React from "react"
import Helmet from "react-helmet"
import NavbarDefault from "../../components/Navbar"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { NavigationContext } from "../../providers/navPage"
import Footer from "../../components/Footer"
import Img from "gatsby-image"
import { CalendarIcon } from "../../icons/Calendar"
const BlogPostPage = ({ pageContext }) => {
  const blog = pageContext.blog
  console.log(blog);
  

  return (
    <>
      <Helmet title={`FAQ | ${blog.frontmatter.title}`} defer={false}>
        <meta
          name="description"
          content="Help Center and FAQ page. Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money."
        />
      </Helmet>
      <NavigationContext.Provider value={{ page: "faq" }}>
        <NavbarDefault />
        <BottomNavbar />
      </NavigationContext.Provider>
      <Container maxW="full">
        <Container as="section" py={16} maxW="container.lg" mx="auto">
        <Box overflow='hidden' w='100%' borderRadius='20px' mb={5}  maxH='600px'>
        <Img fluid={blog.frontmatter.featuredimage.childImageSharp.fluid}/>
        </Box>
          <Heading mb={1} fontSize="hb3" fontWeight="700" textAlign="center">
            {blog.frontmatter.title}
          </Heading>
          <Text textAlign="center" variant="light">
            <CalendarIcon mr={1} mt="-4px" />
            {blog.timeToRead} minute read
          </Text>
          <Divider my={10} />
          
          <Text variant='secondary' mb={1} fontSize="600" >
            {blog.frontmatter.description}
          </Text>
          
          <div
            className="faq-post"
            dangerouslySetInnerHTML={{ __html: blog.html }}
          ></div>
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default BlogPostPage
