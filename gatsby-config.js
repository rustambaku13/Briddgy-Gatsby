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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "faqs",
        path: `${__dirname}/faq`,
      },
    },
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
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        /**
         * One convention is to place your Netlify CMS customization code in a
         * `src/cms` directory.
         */
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },

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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Briddgy | Smart shopping enabled by smart travelers. `,
        short_name: `Briddgy`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#238BB3`,
        display: `standalone`,
        icon: `src/images/icon_opaque.png`,
        
        
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/order`,`/travel`,`/faq*`,'/trips','/orders','/profile'],
      },
    },
  ],
}
