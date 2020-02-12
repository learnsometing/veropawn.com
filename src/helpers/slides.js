export function createContentFromSharp(alt, idx, node) {
  // Restructure a sharp node for the carousel

  var content = null;

  if (node.childImageSharp && node.id) {
    content = {
      alt: `${alt} ${idx + 1}`,
      id: node.id,
      photo: node.childImageSharp,
    };;
  }

  return content;
}

export function createContentFromMarkdown(node) {
  // Restructure a markdownRemark node for the carousel

  var content = null;

  if (node.frontmatter) {
    // Return early if slide doesn't have an image.
    if (!hasFrontmatterProperty('featuredImage')) {
      return null;
    }

    // alt, linkText, text, to, & title are optional. Some slides won't have an overlay.
    let alt, linkText, text, to, title = undefined;

    if (hasFrontmatterProperty(['featuredImage', 'name'])) {
      let name = node.frontmatter.featuredImage.name;
      if (isString(name)) {
        alt = name;
      }
    }

    if (hasFrontmatterProperty('linkText') && hasFrontmatterProperty('to')) {
      linkText = node.frontmatter.linkText;
      to = node.frontmatter.to;
    }

    if (hasFrontmatterProperty('text')) {
      text = node.frontmatter.text;
    }

    if (hasFrontmatterProperty('title')) {
      title = node.frontmatter.title;
    }

    content = {
      alt,
      id: node.frontmatter.featuredImage.id,
      linkText,
      photo: node.frontmatter.featuredImage.childImageSharp,
      text,
      title,
      to,
    };

    function hasFrontmatterProperty(properties) {
      // check for a single property or a nested property on node.frontmatter
      var result;

      if (isString(properties)) {
        result = node.frontmatter[properties];
      } else if (Array.isArray(properties)) {
        let prop = properties.shift();
        result = node.frontmatter[prop];
        while (result && properties.length) {
          prop = properties.shift();
          result = result[prop];
        }
      }

      return result;

    }

    function isString(val) {
      return typeof val === 'string'
    }
  }

  return content;
}