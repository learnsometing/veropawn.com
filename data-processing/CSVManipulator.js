const { extractDetails } = require('./util/extract-details');
const { prettifyDescript, prettifyName } = require('./util/text-formatting');

const CSVManipulator = (catNamesMap, subcatNamesMap, items) => {
  const _isForSale = (item) => {
    return catNamesMap.has(item.category) && subcatNamesMap.has(item.subcategory);
  };

  const _createJoinedItem = ogItem => {
    return {
      category: catNamesMap.get(ogItem.category),
      subcategory: subcatNamesMap.get(ogItem.subcategory),
      descript: ogItem.descript,
      descript2: ogItem.descript2,
      invNum: ogItem.invNum,
      model: ogItem.model
    };
  };

  const _deprettifyHeaders = item => {
    return {
      'LEVEL1_FK': item.category,
      'LEVEL2_FK': item.subcategory,
      'DESCRIPT': item.descript,
      'DESCRIPT2': item.descript2,
      'MODELNUM': item.model,
      'INVNUM': item.invNum
    };
  };

  const _joinOnName = (item) => {
    if (_isForSale(item)) {
      return _createJoinedItem(item);
    } else {
      return item;
    }
  };

  const _hasUndefinedFields = item => {
    const fields = [
      'category', 'subcategory',
      'descript', 'descript2',
      'model', 'invNum'
    ];

    for (let field of fields) {
      if (!item.hasOwnProperty(field)) {
        return true;
      }
    }

    return false;
  };

  const getForSaleItems = () => {
    return items.filter(item => _isForSale(item) && !_hasUndefinedFields(item));
  };

  const getNotForSaleItems = () => {
    let notForSale = items.filter(item => !_isForSale(item) || _hasUndefinedFields(item));
    return notForSale.map(item => _deprettifyHeaders(item));
  };

  const getJoinedItems = (items) => {
    return items.map(item => _joinOnName(item));
  };

  const _createPrettifiedItem = item => {
    return {
      category: prettifyName(item.category),
      subcategory: prettifyName(item.subcategory),
      descript: prettifyDescript(item.descript),
      details: extractDetails(item),
      invNum: item.invNum,
      model: item.model
    }
  };

  const getPrettifiedItems = () => {
    let _forSaleItems = getForSaleItems();
    let _joinedItems = getJoinedItems(_forSaleItems);

    return _joinedItems.map(item => _createPrettifiedItem(item));
  };

  const getItemsOrganizedByPage = () => {
    const _getUniqueEntries = (items, fieldName) => {
      let entries = items.map(item => item[fieldName]);
      let uniqueEntries = new Set(entries);
      return [...uniqueEntries.values()];
    };

    let prettifiedItems = getPrettifiedItems();
    const categories = _getUniqueEntries(prettifiedItems, 'category');
    let organizedByPage = [];

    categories.forEach(category => {
      let _items = prettifiedItems.filter(item => item.category === category);
      const uniqueSubcategories = _getUniqueEntries(_items, 'subcategory');
      uniqueSubcategories.forEach(subcategory => {
        let items = _items.filter(_item => _item.subcategory === subcategory);
        organizedByPage.push({ category, subcategory, items });
      })
    })

    return organizedByPage;
  };

  return { getForSaleItems, getNotForSaleItems, getJoinedItems, getPrettifiedItems, getItemsOrganizedByPage };
};

exports.CSVManipulator = CSVManipulator;