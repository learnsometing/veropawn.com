export default function createContentObj(alt, photos) {
  // Map over photos, an array of photos of one item, and create an object
  // for each photo, containing an alt property and a photo property.

  return photos.map((photo, idx) => {
    return {
      alt: `${alt} ${idx + 1}`,
      photo: photo
    }
  });
}