/*
* These objects are designed to extract details from DESCRIPT2.
*
* There are three extractor objects:
* - extractor (operates on all item categories except firearms and jewelry)
* - firearmExtractor
* - jewelryExtractor
* 
* extractorPrototype is the prototype obect each extractor object is linked to
*/

var { toTitleCase } = require('./text-formatting');

var extractorPrototype = {
  getDetailsSubstr: (desc2, category, subcategory) => {
    /*
    * Returns a copy of record.descript2 with the following removed:
    * - the record's descript
    * - the record's category
    * - the record's subcategory
    */

    var onlyDesc2 = removeDescFromDesc2(desc2);

    return removeCatAndSubcatFromDesc2(onlyDesc2, category, subcategory);

    function removeDescFromDesc2(desc2) {
      let _desc2 = desc2.split(';').slice(0, -1);
      return _desc2.toString();
    };

    function removeCatAndSubcatFromDesc2(desc2, category, subcategory) {
      return desc2.replace(`${category}`, '').replace(`${subcategory}`, '');
    };
  },
  isSerial: detail => {
    return detail.includes('#');
  },
  extractDetails: function (record) {
    // descript2 format: CATEGORY SUBCATEGORY DETAILS; DESCRIPT
    var descript2 = record.descript2;
    var category = record.category;
    var subcategory = record.subcategory;
    // extract the comma separated list of details from descript2
    var detailsSubstr = this.getDetailsSubstr(descript2, category, subcategory);
    // split the details substr on commas
    var detailsArr = getDetails();
    // make sure the details array isn't longer than 4 elements
    checkLengthOfDetailsArr();
    var model = record.model;
    // brand and model are the first element in the array, separated by a space
    var brandAndModel = detailsArr[0];
    // isolate the brand and replace the first element in detailsArr with brand
    var brand = this.getBrand(brandAndModel, model);
    detailsArr.splice(0, 1, brand);

    return this.getDetailsFromArr(detailsArr);

    // Helpers
    function getDetails() {
      // return the details substr split on commas
      return detailsSubstr.split(', ').map(el => el.trim());
    }

    function checkLengthOfDetailsArr() {
      const invNum = record.invNum;

      if (detailsArr.length > 4) {
        throw new RangeError(`Details out of range: Item ${invNum}: ${detailsArr}`);
      }
    }
  }
};

var extractor = Object.create(extractorPrototype);

extractor.getBrand = (brandAndModel, modelNum) => {
  return brandAndModel.replace(modelNum, '').trim();
};

extractor.getDetailsFromArr = function (detailsArr) {
  let details = { brand: '', serial: '', };

  detailsArr.forEach(detail => {
    if (this.isSerial(detail)) {
      details.serial = detail;
    } else {
      details.brand = detail;
    }
  });

  return details;
};

var firearmExtractor = Object.create(extractorPrototype);

firearmExtractor.getBrand = (brandAndModel, modelNum) => {
  let brand = (modelNum == '' || modelNum == 'NONE')
    ? brandAndModel.replace('NONE', '')
    : brandAndModel.replace(modelNum, '');
  return brand.trim();
};

firearmExtractor.getDetailsFromArr = (detailsArr) => {
  const _formattedAmmoType = (ammo) => {
    let formattedAmmo;
    if (ammo.includes('MM')) {
      formattedAmmo = ammo.replace('MM', 'mm');
    } else {
      formattedAmmo = toTitleCase(ammo);
    }
    return formattedAmmo;
  };

  let details = { brand: '', serial: '', ammo: '', action: '' };

  detailsArr.forEach((detail, i) => {
    switch (i) {
      case 1:
        details.serial = detail;
        break;
      case 2:
        details.ammo = _formattedAmmoType(detail);
        break;
      case 3:
        details.action = toTitleCase(detail);
        break;
      default:
        details.brand = detail;
        break;
    }
  });
  return details;
};

let jewelryExtractor = Object.create(extractorPrototype);

jewelryExtractor.getBrand = (brandAndModel, modelNum) => {
  let brand;
  if (brandAndModel == "NONE NONE") {
    brand = "NONE";
  } else {
    brand = brandAndModel.replace(modelNum, '');
  }
  return brand.trim();
};

jewelryExtractor.getDetailsFromArr = function (detailsArr) {
  //     // ANKLET
  //     // actual: NONE '', '', 10KT, 1.90 Grams
  //     // virtual: NONE, 10KT, 1.90 Grams

  //     // BRACELET
  //     // actual: NONE '', '', 10KT, 1.90 Grams
  //     // virtual: NONE, 10KT, 1.90 Grams

  //     //EARRINGS
  //     // actual: NONE '', '', 10KT, 1.90 Grams
  //     // virtual: NONE, 10KT, 1.90 Grams

  //     //NECKLACE
  //     // actual: NONE '', '', 10KT, 1.90 Grams
  //     // virtual: NONE, 10KT, 1.90 Grams

  //     //PENDANT/CHARM
  //     // actual: NONE '', '', 10KT, 1.90 Grams
  //     // virtual: NONE, 10KT, 1.90 Grams

  //     //WATCH
  //     //BULOVA 96B121, #s17453654, N/A, 86.50 Grams

  //     // RING
  //     // actual: NONE '', '', 10KT, 1.90 Grams
  //     // virtual: NONE, 10KT, 1.90 Grams

  let details = { brand: '', serial: '', metal: '', mass: '' };
  const _formattedMetal = metal => {
    let formattedMetal;
    if (metal.includes("KT")) {
      formattedMetal = metal.toLowerCase().trim() + " Gold";
    } else if (metal.includes("925")) {
      formattedMetal = "Sterling Silver"
    } else {
      formattedMetal = toTitleCase(metal);
    }

    return formattedMetal;
  };

  const _isMass = detail => {
    return detail.includes("Grams");
  };

  detailsArr.forEach((detail, i) => {
    switch (i) {
      case 1:
        if (_isMass(detail)) {
          details.mass = detail.toLowerCase();
        } else if (this.isSerial(detail)) {
          details.serial = detail;
        } else {
          details.metal = _formattedMetal(detail);
        }
        break;
      case 2:
        if (_isMass(detail)) {
          details.mass = detail.toLowerCase();
        } else {
          details.metal = _formattedMetal(detail);
        }
        break;
      case 3:
        details.mass = detailsArr[i].toLowerCase();
        break;
      default:
        details.brand = detail;
        break;
    }
  });

  return details;
};

exports.extractorPrototype = extractorPrototype;
exports.extractor = extractor;
exports.firearmExtractor = firearmExtractor;
exports.jewelryExtractor = jewelryExtractor;