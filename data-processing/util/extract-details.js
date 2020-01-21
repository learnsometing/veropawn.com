const { extractor, firearmExtractor, jewelryExtractor } = require('./extractors');

exports.extractDetails = (record) => {
  /*
  * Extracts additional details from descript2. 
  * 
  * ex descript2: RIFLE FIREARM WINCHESTER 94, SERIAL, 30-30, LEVER; RIFLE
  * 
  * For firearms, brand, serial no., ammo type, and action are details.
  */

  let details;

  if (record.category === 'FIREARM') {
    details = firearmExtractor.extractDetails(record);
  } else if (record.category === 'JEWELRY') {
    details = jewelryExtractor.extractDetails(record);
  } else {
    details = extractor.extractDetails(record);
  }

  return details;
}