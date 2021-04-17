/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `@chakra-ui/gatsby-plugin`,
    // `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "uploads",
        path: `${__dirname}/static/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "products",
        path: `${__dirname}/product`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "testimonial",
        path: `${__dirname}/testimonial`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "blogs",
        path: `${__dirname}/blog`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: "faqs",
    //     path: `${__dirname}/faq`,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "tags",
        path: `${__dirname}/tag`,
      },
    },

    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              name: "uploads",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    "gatsby-remark-source-name",
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve(`./src/components/Layout/index.tsx`),
      },
    },

    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en`, `az`, `ru`],
        defaultLanguage: `en`,
        redirect: false,
      },
    },
  ],
}
