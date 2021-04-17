const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const faqPostTemplate = path.resolve(`src/dynamic/Faq/index.tsx`)
  const faqs = await graphql(`
    {
      allMarkdownRemark(
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
          fields {
            sourceName
          }
        }
      }
    }
  `)

  faqs.data.allMarkdownRemark.nodes.forEach(faq => {
    createPage({
      path: `/faq/post/${faq.frontmatter.slug}`,
      component: faqPostTemplate,
      context: {
        faq: faq,
      },
    })
  })
}
