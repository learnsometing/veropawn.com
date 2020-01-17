const fs = require('fs');
const { parseCSV } = require('./parse-csv');
const { prettifyHeaders } = require('./text-formatting');

async function getFkNamePairs(data) {
  /*
  * returns a promise resolved with either a map of foreign key, name pairs or 
  * an error generated during CSV parsing.
  */
  let map = new Map();
  let parsedCSV = await parseCSV(data, {
    separator: '\t',
    skipComments: true,
    strict: true
  });

  parsedCSV.forEach(record => map.set(record['fk'], record['name']))
  return map;
};

exports.getFkNamePairs = getFkNamePairs;

async function getInvData(data) {
  /*
  * returns an array of records as objects from the inventory data table. 
  * 
  * Prettifies each record's header name to adhere to JS camelCase style.
  */

  let parsedCSV = await parseCSV(data, {
    mapHeaders: ({ header, index }) => prettifyHeaders(header),
    mapValues: ({ header, index, value }) => value.trim(),
    separator: '\t',
    skipComments: true,
  });

  return parsedCSV;
};

exports.getInvData = getInvData;

const resolveFile = (_path, _data, _resolve) => {
  if (_path.includes('inv')) {
    _resolve(getInvData(_data));
  } else if (_path.includes('category')) {
    // both foreign key tables include the word category
    _resolve(getFkNamePairs(_data));
  }
};

exports.resolveFile = resolveFile;

const processedCSV = (_path, _resolve, _reject) => {
  fs.readFile(_path, 'utf8', (_err, _data) => {
    if (_err) {
      _reject(_err);
    }

    resolveFile(_path, _data, _resolve);
  });
};

exports.processedCSV = processedCSV;