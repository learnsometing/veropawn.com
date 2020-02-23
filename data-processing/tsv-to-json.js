var fs = require('fs');
var { processedCSV } = require('./util/process-csv');
var { CSVManipulator } = require('./CSVManipulator');
var ObjectsToCSV = require('objects-to-csv');

function processCSVFiles(paths) {
  return paths.map((path) => {
    return new Promise((resolve, reject) => {
      processedCSV(path, resolve, reject);
    });
  });
}

exports.processCSVFiles = processCSVFiles;

function storeAsJson(data, path) {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error(err)
  }
}

exports.produceJson = function (files) {
  Promise.all(processCSVFiles(files))
    .then(values => fulfilled(values))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });

  function fulfilled(values) {
    const manipulator = CSVManipulator(...values);
    let notForSaleItems = manipulator.getNotForSaleItems();
    let prettifiedItems = manipulator.getPrettifiedItems();
    let organizedItems = manipulator.getItemsOrganizedByPage();

    // Store not for sale items in a CSV
    const notForSaleCSV = new ObjectsToCSV(notForSaleItems);
    notForSaleCSV.toDisk(`${__dirname}/../not-for-sale/not-for-sale.csv`);
    // Store the items and pages in json files
    storeAsJson(prettifiedItems, `${__dirname}/../src/data/items.json`)
    storeAsJson(organizedItems, `${__dirname}/../src/data/pages.json`)
  }
};
