module.exports = {
  siteMetadata: {
    title: `Cash Pawn & Jewelry`,
    description: `Browse the full inventory of Cash Pawn & Jewelry, located in Vero Beach, FL.`,
    author: `Brian Monaccio`,
    siteUrl: `http://veropawn.net`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/markdown/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pdf`,
        path: `${__dirname}/src/pdf/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        env: {
          development: {
            policy: [{ userAgent: '*', allow: [] }]
          },
          production: {
            policy: [{ userAgent: '*', disallow: [] }]
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Cash Pawn & Jewelry`,
        short_name: `Cash Pawn`,
        start_url: `/`,
        background_color: `#e7e8c8`,
        theme_color: `#e7e8c8`,
        display: `minimal-ui`,
        icon: `src/images/logos-and-icons/logo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`precss`),
          require(`postcss-preset-env`)({ stage: 4 }),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/images/logos-and-icons/favicon.svg",

        // WebApp Manifest Configuration
        appName: null, // Inferred with your package.json
        appDescription: "Browse Cash Pawn & Jewelry's (Vero Beach, FL) Full Inventory Catalog",
        developerName: 'Brian Monaccio',
        developerURL: null,
        dir: 'auto',
        lang: 'en-US',
        background: '#e7e8c8',
        theme_color: '#e7e8c8',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        version: '1.0',

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          yandex: true,
          windows: true
        }
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
