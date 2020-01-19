export default (defaultPhoto, photoNodes, invNum) => {
  // Return the photos that include invNum in their name or the default photo
  let photosOfItem = photoNodes.filter(node => {
    // remove the extension from the file name: I-123-1_a.jpeg => I-123-1_a
    const baseNoExt = node.base.split('.')[0];
    // remove the order indicator from the file name: I-123-1_a => I-123-1
    const baseInvNum = baseNoExt.split('_')[0];

    return baseInvNum.match(new RegExp(`^${invNum}$`));
  });

  if (!photosOfItem.length) {
    return [defaultPhoto];
  }

  return photosOfItem;
};