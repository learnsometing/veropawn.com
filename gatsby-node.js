/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.onCreateNode = ({ node, actions }) => {
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

    if (node.internal.type === "ItemsJson") {
      value = `/${_slugify(node.category)}/${_slugify(node.subcategory)}/${node.id}`;
    } else if (node.internal.type === "PagesJson") {
      value = `/${_slugify(node.category)}/${_slugify(node.subcategory)}/`
    }

    return value;
  }

  createNodeField({
    name: "slug",
    node,
    value: generateSlug(node),
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    query {
      allSubcatPages: allPagesJson {
        nodes {
          fields {
            slug
          }
          items{
            invNum
          }
        }
      }

      allItemPages: allItemsJson {
        nodes {
          fields {
            slug
          }
          invNum
        }
      }
    }
  `);

  // Create a page for each subcategory of item
  data.allSubcatPages.nodes.forEach(node => {
    let allMainPhotoNames = node.items.map(item => `${item.invNum}_a`);
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/shopping-page/shopping-page.js`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug: node.fields.slug,
        photoNames: allMainPhotoNames
      }
    });
  });

  // Create a page for each item
  data.allItemPages.nodes.forEach(node => {
    const regex = `/${node.invNum}_/`
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/item-page/item-page.js'),
      context: {
        regex: regex,
        slug: node.fields.slug,
      }
    });
  });
}
