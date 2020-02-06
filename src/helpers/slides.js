export function createContentArray(alt, photos) {
  /*
  * returns an array of objects, each representing content for a single slide.
  * Can be used on an array or an object.
  */

  if (typeof photos === 'object') {
    if (Array.isArray(photos)) {
      return photos.map((photo, idx) => {
        return {
          alt: `${alt} ${idx + 1}`,
          html: undefined,
          id: photo.id,
          photo: photo.childImageSharp,
          title: undefined,
        };
      });
    } else if (
      photos !== null
      && photos !== undefined
      && photos.constructor.name === 'Object'
    ) {
      return [{
        alt: `${alt} 1`,
        html: undefined,
        id: photos.id,
        photo: photos.childImageSharp,
        title: undefined,
      }]
    }
  }
}

export function createSlideContent(node) {
  return {
    alt: node.frontmatter.featuredImage.name,
    html: node.html,
    id: node.frontmatter.featuredImage.id,
    photo: node.frontmatter.featuredImage.childImageSharp,
    title: node.frontmatter.title,
  };
}