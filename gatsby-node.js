const path = require("path")
const axios = require("axios")
const { countReset } = require("console")
const headers = {
  "x-rapidapi-key": "09f404e0d1msh6ca85c71ae63bbap1dca4djsnb733926d884e",
  "x-rapidapi-host": "referential.p.rapidapi.com",
  useQueryString: true,
}

async function getCountries(lang = "en") {
  return axios.get(`https://referential.p.rapidapi.com/v1/country`, {
    headers,
    params: {
      lang,
      fields:
        "currency,currency_num_code,currency_code,continent_code,currency,iso_a3,dial_code",
    },
  })
}

const COUNTRY_NODE_TYPE = "Country"

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions
  const { data } = await getCountries()
  // loop through data and create Gatsby nodes
  data.forEach(post =>
    createNode({
      ...post,
      id: createNodeId(`${COUNTRY_NODE_TYPE}-${post.key}`),
      parent: null,
      children: [],
      internal: {
        type: COUNTRY_NODE_TYPE,
        content: JSON.stringify(post),
        contentDigest: createContentDigest(post),
      },
    })
  )
  return
}

// exports.sourceNodes = async ({
//   actions,
//   createNodeId,
//   createContentDigest,
// }) => {
//   try {
//     const { createNode } = actions
//     const { data } = await getCountries()

//     const nodeMeta = {
//       // Data for the node.
//       countries: data,

//       // Required fields.
//       id: createNodeId(`countries`),
//       parent: null, // or null if it's a source node without a parent
//       children: [],
//       internal: {
//         type: `CountriesType`,
//         content: JSON.stringify(countries),
//         contentDigest: createContentDigest(myData),
//       },
//     }
//     const node = Object.assign({}, nodeMeta)
//     createNode(node)
//   } catch {}
// }

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
