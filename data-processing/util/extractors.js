const { toTitleCase } = require('./text-formatting');

let extractorPrototype = {
  getCleanedDescript2: (desc2, category, subcategory) => {
    /*
    * Returns a copy of record.descript2 with the following removed:
    * - the record's descript
    * - the record's category
    * - the record's subcategory
    */

    const _removeDescFromDesc2 = (desc2) => {
      let _desc2 = desc2.split(';').slice(0, -1);
      return _desc2.toString();
    };

    const _removeCatAndSubcat = (desc2, category, subcategory) => {
      return desc2.replace(`${category}`, '').replace(`${subcategory}`, '');
    };

    const onlyDesc2 = _removeDescFromDesc2(desc2);
    return _removeCatAndSubcat(onlyDesc2, category, subcategory);
  },
  isSerial: detail => {
    return detail.includes('#');
  },
  extractDetails: function (record) {
    const {
      category,
      subcategory,
      descript,
      descript2,
      invNum,
      model
    } = record;

    const _getDetailsArr = (_desc2) => {
      return _desc2.split(', ').map(el => el.trim());
    };

    const _isDetailsArrTooLong = _detailsArr => {
      return _detailsArr.length > 4
    };

    let _cleanDesc2 = this.getCleanedDescript2(descript2, category, subcategory);
    let _rawDetailsArr = _getDetailsArr(_cleanDesc2);

    if (_isDetailsArrTooLong(_rawDetailsArr)) {
      throw new RangeError(`Details out of range: Item ${invNum}: ${_rawDetailsArr}`);
    }

    let _makeAndModel = _rawDetailsArr[0];
    let _make = this.getBrand(_makeAndModel, model);

    let _refinedDetailsArr = [..._rawDetailsArr];
    _refinedDetailsArr.splice(0, 1, _make);

    return this.getDetailsFromArr(_refinedDetailsArr);
  }
};

exports.extractorPrototype = extractorPrototype;

const extractor = Object.create(extractorPrototype);

extractor.getBrand = (brandAndModel, modelNum) => {
  return brandAndModel.replace(modelNum, '').trim();
};

extractor.getDetailsFromArr = function (detailsArr) {
  let _details = { brand: '', serial: '', };

  detailsArr.forEach(_detail => {
    if (this.isSerial(_detail)) {
      _details.serial = _detail;
    } else {
      _details.brand = _detail;
    }
  });
  return _details;
};

exports.extractor = extractor;

let firearmExtractor = Object.create(extractorPrototype);

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

  detailsArr.forEach((_detail, i) => {
    switch (i) {
      case 1:
        details.serial = _detail;
        break;
      case 2:
        details.ammo = _formattedAmmoType(_detail);
        break;
      case 3:
        details.action = toTitleCase(_detail);
        break;
      default:
        details.brand = _detail;
        break;
    }
  });
  return details;
};

exports.firearmExtractor = firearmExtractor;

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

exports.jewelryExtractor = jewelryExtractor;