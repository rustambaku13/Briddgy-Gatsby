const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const faqPostTemplate = path.resolve(`src/dynamic/Faq/index.tsx`)
  const blogPostTemplate = path.resolve(`src/dynamic/Blog/index.tsx`)
  const blogs = await graphql(`
  {allMarkdownRemark(
    filter: { frontmatter: { templateKey: { eq: "blog" } } }
  ) {
    nodes {
      frontmatter {
       description
        slug
        title
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 800) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
        date
        tag
      }
      html
      timeToRead
      fileAbsolutePath
      fields {
        sourceName
      }
    }
  }}
  `)
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

  blogs.data.allMarkdownRemark.nodes.forEach(blog => {
    createPage({
      path: `/blog/${blog.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
        blog: blog,
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
  if (page.path.match(/^\/profile/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/profile/*"
    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\/orders/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/orders/*"
    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\/trips/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/trips/*"
    // Update the page.
    createPage(page)
  }
}
