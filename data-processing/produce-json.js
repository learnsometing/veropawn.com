const { produceJson } = require('./tsv-to-json');

const RAW_DATA_PATH = `${__dirname}/../raw`;
const FK_TABLES_PATH = `${RAW_DATA_PATH}/fk_tables`;
const DATA_FILES = [
  `${FK_TABLES_PATH}/category.tsv`,
  `${FK_TABLES_PATH}/subcategory.tsv`,
  `${RAW_DATA_PATH}/inv/inv.csv`
];

produceJson(DATA_FILES);