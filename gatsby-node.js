/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  const generateSlug = (node) => {
    // Slugify a string
    const _slugify = (str) => {
      str = str.replace(/^\s+|\s+$/g, '');

      // Make the string lowercase
      str = str.toLowerCase();

      // Remove accents, swap ñ for n, etc
      var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
      var to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }

      // Remove invalid chars
      str = str.replace(/[^a-z0-9 -]/g, '')
        // Collapse whitespace and replace by -
        .replace(/\s+/g, '-')
        // Collapse dashes
        .replace(/-+/g, '-');

      return str;
    }

    let value;

    if (node.internal.type === "MarkdownRemark") {
      value = createFilePath({ node, getNode });
    } else if (node.internal.type === "InvJson") {
      value = `/${_slugify(node.category)}/${_slugify(node.subcategory)}`;
    }

    return value;
  }

  createNodeField({
    // Name of the field you are adding
    name: "slug",
    // Individual MarkdownRemark node
    node,
    // Generated value based on filepath. You don't need a separating "/" before
    // the value because createFilePath returns a path with the leading "/".
    value: generateSlug(node),
  });

}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const invPages = await graphql(`
    query categorizationData {
      allInvJson {
        nodes {
          category
          subcategory
          fields {
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
  `);

  // Create a page for each entry in the inventory data json file
  invPages.data.allInvJson.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/invPage/inv-page.js`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        category: node.category,
        subcategory: node.subcategory
      }
    });
  });

  // Create a page for each markdown file.
  markdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/markdown-page.js`),
      context: {
        id: node.id,
      }
    })
  })
}
