const { extractor, firearmExtractor, jewelryExtractor } = require('./extractors');

exports.extractDetails = (record) => {
  /*
  * Extracts item details from descript2.
  * 
  * default descript2 format: CATEGORY SUBCATEGORY BRAND MODEL, SERIAL; DESCRIPT
  * firearm desript2 format: CATEGORY SUBCATEGORY BRAND MODEL, SERIAL, AMMUNITION, ACTION; DESCRIPT
  * jewelry desript2 format: CATEGORY SUBCATEGORY BRAND MODEL, SERIAL, METAL, MASS; DESCRIPT
  */

  var details;

  if (record.category === 'FIREARM') {
    details = firearmExtractor.extractDetails(record);
  } else if (record.category === 'JEWELRY') {
    details = jewelryExtractor.extractDetails(record);
  } else {
    details = extractor.extractDetails(record);
  }

  return details;
}