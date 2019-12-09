/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const invPages = await graphql(`
    query {
      allInvJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  invPages.data.allInvJson.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/inv-page.js`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug: node.slug,

      }
    });
  });
}
