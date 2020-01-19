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
    } else if (node.internal.type === "ItemsJson") {
      value = `/${_slugify(node.category)}/${_slugify(node.subcategory)}/${node.id}`;
    } else if (node.internal.type === "PagesJson") {
      value = `/${_slugify(node.category)}/${_slugify(node.subcategory)}/`
    }

    return value;
  }

  createNodeField({
    // Name of the field you are adding
    name: "slug",
    // Individual MarkdownRemark node
    node,
    value: generateSlug(node),
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const pagesJson = await graphql(`
    query pages {
      allPagesJson {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `);

  const itemsJson = await graphql(`
    query items {
      allItemsJson {
        nodes {
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
        nodes{
          id
          fields {
            slug
          }
        }
      }
    }
  `);
  // Create a page for each item

  // Create a page for each subcategory of item
  pagesJson.data.allPagesJson.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/shopping-page/shopping-page.js`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug: node.fields.slug
      }
    });
  });

  // Create a page for each markdown file.
  markdown.data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/markdown-page.js`),
      context: {
        id: node.id,
      }
    })
  })
}
