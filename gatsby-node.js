/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });

    createNodeField({
      // Name of the field you are adding
      name: "slug",
      // Individual MarkdownRemark node
      node,
      // Generated value based on filepath. Youdon't need a separating "/" before
      // the value because createFilePath returns a path with the leading "/".
      value: `${value}`,
    })
  }
}

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

  const markdown = await graphql(`
    query MDContent {
      allMarkdownRemark{
        edges{
          node{
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Create a page for each page in the inventory data json file
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

  // Create a page for each markdown file.
  markdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/markdown-page.js`),
      context: {
        slug: node.fields.slug,
      }
    })
  })
}
