const fs = require('fs');
const { processedCSV } = require('./util/process-csv');
const { CSVManipulator } = require('./CSVManipulator');
const ObjectsToCSV = require('objects-to-csv');

const RAW_DATA_PATH = `${__dirname}/../raw`;
const FK_TABLES_PATH = `${RAW_DATA_PATH}/fk_tables`;
const DATA_FILES = [
  `${FK_TABLES_PATH}/category.tsv`,
  `${FK_TABLES_PATH}/subcategory.tsv`,
  `${RAW_DATA_PATH}/inv/inv.tsv`
];

const processCSVFiles = _paths => {
  return _paths.map((_path) => {
    return new Promise((resolve, reject) => {
      processedCSV(_path, resolve, reject);
    });
  });
};

exports.processCSVFiles = processCSVFiles;

const storeAsJson = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error(err)
  }
};

const fulfilled = values => {
  const manipulator = CSVManipulator(...values)
  let notForSaleItems = manipulator.getNotForSaleItems();
  let prettifiedItems = manipulator.getPrettifiedItems();
  let organizedItems = manipulator.getItemsOrganizedByPage();

  const notForSaleCSV = new ObjectsToCSV(notForSaleItems);
  notForSaleCSV.toDisk(`${__dirname}/../not-for-sale/not-for-sale.csv`);

  storeAsJson(prettifiedItems, `${__dirname}/../src/data/items.json`)
  storeAsJson(organizedItems, `${__dirname}/../src/data/pages.json`)
};

const produceJson = (files) => {
  Promise.all(processCSVFiles(files))
    .then(
      values => fulfilled(values)
    )
    .catch(err => {
      console.error(err);
      process.exit(1);
    })
};

produceJson(DATA_FILES);