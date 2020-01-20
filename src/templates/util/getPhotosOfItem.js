export default (defaultPhoto, photoNodes, invNum) => {
  // Return the photos that include invNum in their name or the default photo
  let photosOfItem = photoNodes.filter(node => {
    const baseInvNum = node.name.split('_')[0];

    return baseInvNum.match(new RegExp(`^${invNum}$`));
  });

  if (!photosOfItem.length) {
    return [defaultPhoto];
  }

  return photosOfItem;
};