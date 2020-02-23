const { extractDetails } = require('./util/extract-details');
const { prettifyDescript, prettifyName } = require('./util/text-formatting');

const CSVManipulator = (catNamesMap, subcatNamesMap, items) => {

  return {
    getForSaleItems,
    getNotForSaleItems,
    getItemsWithJoinedInNames,
    getPrettifiedItems,
    getItemsOrganizedByPage
  };

  function getForSaleItems() {
    return items.filter(item => isForSale(item) && !hasUndefinedFields(item));
  }

  function getNotForSaleItems() {
    let notForSale = items.filter(item => (
      !isForSale(item) || hasUndefinedFields(item)
    ));

    return notForSale.map(item => deprettifyHeaders(item));

    function deprettifyHeaders(item) {
      return {
        'LEVEL1_FK': item.category,
        'LEVEL2_FK': item.subcategory,
        'DESCRIPT': item.descript,
        'DESCRIPT2': item.descript2,
        'MODELNUM': item.model,
        'INVNUM': item.invNum
      };
    }
  }

  function getItemsWithJoinedInNames(items) {

    return items.map(item => joinInName(item));

    function joinInName(item) {
      if (isForSale(item)) {
        return itemWithJoinedInNames(item);
      } else {
        return item;
      }

      function itemWithJoinedInNames(item) {
        // replaces the category and subcategory foreign keys with their names
        return {
          category: catNamesMap.get(item.category),
          subcategory: subcatNamesMap.get(item.subcategory),
          descript: item.descript,
          descript2: item.descript2,
          invNum: item.invNum,
          model: item.model
        };
      }
    }
  }

  function getPrettifiedItems() {
    let forSaleItems = getForSaleItems();
    let itemsWithJoinedInNames = getItemsWithJoinedInNames(forSaleItems);

    return itemsWithJoinedInNames.map(item => createPrettifiedItem(item));

    function createPrettifiedItem(item) {
      return {
        category: prettifyName(item.category),
        subcategory: prettifyName(item.subcategory),
        descript: prettifyDescript(item.descript),
        details: extractDetails(item),
        invNum: item.invNum,
        model: item.model
      };
    }
  };

  function getItemsOrganizedByPage() {
    let prettifiedItems = this.getPrettifiedItems();
    const categories = getUniqueEntriesByFieldname(prettifiedItems, 'category');
    let organizedByPage = [];

    categories.forEach(category => {
      // filter down to the items in the category
      let itemsInCategory = prettifiedItems.filter(item => (
        item.category === category
      ));
      // get a set of the unique subcategories of items in the category
      const subcategories = getUniqueEntriesByFieldname(itemsInCategory, 'subcategory');
      // create an entry in organizedByPage for each unique subcategory of items
      subcategories.forEach(subcategory => {

        let itemsInSubcategory = itemsInCategory.filter(item => (
          item.subcategory === subcategory
        ));

        organizedByPage.push({
          category,
          subcategory,
          items: itemsInSubcategory
        });
      })
    });

    return organizedByPage;

    function getUniqueEntriesByFieldname(items, fieldName) {
      let entries = items.map(item => item[fieldName]);
      return new Set(entries);
    }
  }

  // Helpers
  function isForSale(item) {
    return catNamesMap.has(item.category) && subcatNamesMap.has(item.subcategory);
  }

  function hasUndefinedFields(item) {
    const fields = [
      'category',
      'subcategory',
      'descript',
      'descript2',
      'model',
      'invNum'
    ];

    for (let field of fields) {
      if (!item.hasOwnProperty(field)) {
        return true;
      }
    }

    return false;
  }
};

exports.CSVManipulator = CSVManipulator;