export function createContentFromSharp(alt, nodes) {
  // Restructure one or more sharp nodes for the carousel

  var content = [];

  if (Array.isArray(nodes)) {
    nodes.forEach((node, idx) => {
      let contentObj = createContentElement(node, idx);
      if (contentObj) {
        content.push(contentObj);
      } else {
        slideCreationErrorWarning()
      }
    });
  } else if (Object.prototype.isPrototypeOf(nodes)) {
    let contentObj = createContentElement(nodes, 0);
    if (contentObj) {
      content.push(contentObj);
    } else {
      slideCreationErrorWarning()
    }
  }

  return content;

  function createContentElement(node, idx) {
    if (node.childImageSharp && node.id) {
      return {
        alt: `${alt} ${idx + 1}`,
        id: node.id,
        photo: node.childImageSharp,
      };;
    }
  }

}

export function createContentFromMarkdown(nodes) {
  // Restructure a single or multiple markdownRemark nodes for the carousel

  var content = [];

  if (Array.isArray(nodes)) {
    nodes.forEach(node => {
      let contentObj = createContentElement(node);
      if (contentObj) {
        content.push(contentObj);
      } else {
        slideCreationErrorWarning()
      }
    });
  } else if (Object.prototype.isPrototypeOf(nodes)) {
    let contentObj = createContentElement(nodes);
    if (contentObj) {
      content.push(contentObj);
    } else {
      slideCreationErrorWarning()
    }
  }

  return content;

  function createContentElement(node) {
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

      return {
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
  }
}

function slideCreationErrorWarning() {
  console.warn(
    'Warning: An error occured while creating the carousel slides. ' +
    'Check the frontmatter properties for typos.'
  );
}