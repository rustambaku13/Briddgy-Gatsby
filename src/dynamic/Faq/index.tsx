import { Container, Divider, Heading, Text } from "@chakra-ui/react"
import React from "react"
import Helmet from "react-helmet"
import NavbarDefault from "../../components/Navbar"
import { BottomNavbar } from "../../components/Navbar/BottomNavbar"
import { NavigationContext } from "../../providers/navPage"
import Footer from "../../components/Footer"
import { CalendarIcon } from "../../icons/Calendar"
const FaqPostPage = ({ pageContext }) => {
  const faq = pageContext.faq

  return (
    <>
      <Helmet title={`FAQ | ${faq.frontmatter.title}`} defer={false}>
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
          <Heading mb={1} fontSize="hb3" fontWeight="700" textAlign="center">
            {faq.frontmatter.title}
          </Heading>
          <Text textAlign="center" variant="light">
            <CalendarIcon mr={1} mt="-4px" />
            {faq.timeToRead} minute read
          </Text>
          <Divider my={10} />
          <div
            className="faq-post"
            dangerouslySetInnerHTML={{ __html: faq.html }}
          ></div>
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default FaqPostPage
