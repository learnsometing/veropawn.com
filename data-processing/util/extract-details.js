const { toTitleCase } = require('./text-formatting');

exports.extractDetails = (record) => {
  /*
  * Extracts additional details from descript2. Info is only gathered
  * from firearms for now. Expand this method in the future to extract
  * information from all the types of items.
  * 
  * ex descript2: RIFLE FIREARM WINCHESTER 94, SERIAL, 30-30, LEVER; RIFLE
  * 
  * For firearms, brand, serial no., ammo type, and action are details.
  */

  const getBrand = (_brandAndModel, _modelNum) => {
    return _brandAndModel.replace(_modelNum, '').trim();
  };

  const _isSerial = _detail => {
    return _detail.includes('#');
  };

  const getDetails = (_getBrand, _setDetails) => {
    return (_cleanDesc2, record) => {
      const _model = record.model;
      const _invNum = record.invNum;
      const _getDetailsArr = (_desc2) => {
        return _desc2.split(', ').map(el => el.trim());
      };

      const _isDetailsArrTooLong = _detailsArr => {
        return _detailsArr.length > 4
      };

      let _rawDetailsArr = _getDetailsArr(_cleanDesc2);

      if (_isDetailsArrTooLong(_rawDetailsArr)) {
        throw new RangeError(`Details out of range: Item ${_invNum}: ${_rawDetailsArr}`);
      }

      let _makeAndModel = _rawDetailsArr[0];
      let _make = _getBrand(_makeAndModel, _model);

      let _refinedDetailsArr = [..._rawDetailsArr];
      _refinedDetailsArr.splice(0, 1, _make);
      return _setDetails(_refinedDetailsArr);
    };
  };

  const _defaultItem = ((_details) => {
    const _setDetails = (_detailsArr) => {
      _detailsArr.forEach(_detail => {
        if (_isSerial(_detail)) {
          _details.serial = _detail;
        } else {
          _details.brand = toTitleCase(_detail);
        }
      });
      return _details;
    };

    return { getDetails: getDetails.bind(null, getBrand, _setDetails) };
  })({ brand: '', serial: '', });

  const _firearm = ((_details) => {
    const _getBrand = (_brandAndModel, _modelNum) => {
      let _brand = (_modelNum == '' || _modelNum == 'NONE')
        ? _brandAndModel.replace('NONE', '')
        : _brandAndModel.replace(_modelNum, '');
      return _brand.trim();
    };

    const _setDetails = (_detailsArr) => {
      const _formattedAmmoType = (_ammo) => {
        let _cleanedAmmo;
        if (_ammo.includes('MM')) {
          _cleanedAmmo = _ammo.replace('MM', 'mm');
        } else {
          _cleanedAmmo = toTitleCase(_ammo);
        }
        return _cleanedAmmo;
      };
      _detailsArr.forEach((_detail, i) => {
        switch (i) {
          case 0:
            _details.brand = toTitleCase(_detail);
            break;
          case 1:
            _details.serial = _detail;
            break;
          case 2:
            _details.ammo = _formattedAmmoType(_detail);
            break;
          case 3:
            _details.action = toTitleCase(_detail);
            break;
        }
      });
      return _details;
    };

    return { getDetails: getDetails.bind(null, _getBrand, _setDetails) };
  })({ brand: '', serial: '', ammo: '', action: '' });

  const _jewelry = ((_details) => {
    const _getBrand = (_brandAndModel, _modelNum) => {
      let _brand;
      if (_brandAndModel == "NONE NONE") {
        _brand = "NONE";
      } else {
        _brand = _brandAndModel.replace(_modelNum, '');
      }
      return _brand.trim();
    };

    const _setDetails = (_detailsArr) => {
      // ANKLET
      // actual: NONE '', '', 10KT, 1.90 Grams
      // virtual: NONE, 10KT, 1.90 Grams

      // BRACELET
      // actual: NONE '', '', 10KT, 1.90 Grams
      // virtual: NONE, 10KT, 1.90 Grams

      //EARRINGS
      // actual: NONE '', '', 10KT, 1.90 Grams
      // virtual: NONE, 10KT, 1.90 Grams

      //NECKLACE
      // actual: NONE '', '', 10KT, 1.90 Grams
      // virtual: NONE, 10KT, 1.90 Grams

      //PENDANT/CHARM
      // actual: NONE '', '', 10KT, 1.90 Grams
      // virtual: NONE, 10KT, 1.90 Grams

      //WATCH
      //BULOVA 96B121, #s17453654, N/A, 86.50 Grams

      // RING
      // actual: NONE '', '', 10KT, 1.90 Grams
      // virtual: NONE, 10KT, 1.90 Grams

      const _formattedMetal = _metal => {
        if (_metal.includes("KT")) {
          _metal = _metal.toLowerCase().trim() + " Gold";
        } else if (_metal.includes("925")) {
          _metal = "Sterling Silver"
        } else {
          _metal = toTitleCase(_metal);
        }

        return _metal;
      };

      const _isMass = _detail => {
        return _detail.includes("Grams");
      };

      _detailsArr.forEach((_detail, i) => {
        switch (i) {
          case 0:
            _details.brand = toTitleCase(_detail);
            break;
          case 1:
            if (_isMass(_detail)) {
              _details.mass = _detail.toLowerCase();
            } else if (_isSerial(_detail)) {
              _details.serial = _detail;
            } else {
              _details.metal = _formattedMetal(_detail);
            }
            break;
          case 2:
            if (_isMass(_detail)) {
              _details.mass = _detail.toLowerCase();
            } else {
              _details.metal = _formattedMetal(_detail);
            }
            break;
          case 3:
            _details.mass = _detailsArr[i].toLowerCase();
            break;
        }
      });

      return _details;
    };

    return { getDetails: getDetails.bind(null, _getBrand, _setDetails) };
  })({ brand: '', serial: '', metal: '', mass: '' });

  const _coinOrCollectible = ((_details) => {
    const _setDetails = (_detailsArr) => {
      _detailsArr.forEach((_detail, _index) => {
        if (_index == 1) {
          _details.additional = _detail;
        } else {
          _details.type = toTitleCase(_detail);
        }
      });

      return _details;
    }

    return { getDetails: getDetails.bind(null, getBrand, _setDetails) };
  })({ type: '', additional: '', });

  const _cleanedDescript2 = (record, category) => {
    /*
    * Returns a copy of record.descript2 with the following removed:
    * - the record's descript
    * - the record's category
    * - the record's subcategory
    */

    const subcategory = record.subcategory;
    const _removeDescFromDesc2 = (record) => {
      let desc2 = record.descript2.split(';').slice(0, -1);
      return desc2.toString();
    };

    const _removeCatAndSubcat = (desc2, category, subcategory) => {
      return desc2.replace(`${category}`, '').replace(`${subcategory}`, '')
    };

    let desc2 = _removeDescFromDesc2(record);
    return _removeCatAndSubcat(desc2, category, subcategory);
  };

  const category = record.category;
  let details;
  let cleanedDesc2 = _cleanedDescript2(record, category);

  switch (category) {
    case "FIREARM":
      details = _firearm.getDetails()(cleanedDesc2, record);
      break;
    case "JEWELRY":
      details = _jewelry.getDetails()(cleanedDesc2, record);
      break;
    case "COINS" || "COLLECTIBLES":
      details = _coinOrCollectible.getDetails()(cleanedDesc2, record);
      break;
    default:
      details = _defaultItem.getDetails()(cleanedDesc2, record);
      break
  }

  return details;
}