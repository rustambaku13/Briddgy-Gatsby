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

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Only update the `/app` page.
  if (page.path.match(/^\/messages/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/messages/*"
    // Update the page.
    createPage(page)
  }
}
