var fs = require('fs');
var { parseCSV } = require('./parse-csv');
var { prettifyHeaders } = require('./text-formatting');

function processedCSV(path, resolve, reject) {
  // read in the .tsv file
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    }

    // get the processed records that were read into memory
    let records = parseRecords(path, data);
    resolve(records);
  });
};

exports.processedCSV = processedCSV;

async function parseFKTable(data) {
  /*
  * returns a promise resolved with either a map of foreign key/name pairs or
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

exports.parseFKTable = parseFKTable;

async function parseInvTable(data) {
  /*
  * returns a promise resolved with either an array of record objects or
  * an error generated during CSV parsing.
  * 
  * Prettifies each record's header name to adhere to JS camelCase style.
  */

  let parsedCSV = await parseCSV(data, {
    // method from neat-csv module, applies prettifyHeaders to each header
    mapHeaders: ({ header, index }) => prettifyHeaders(header),
    // methods from neat-csv module, trims each value
    mapValues: ({ header, index, value }) => value.trim(),
    separator: ',',
    skipComments: true,
    strict: false
  });

  return parsedCSV;
};

exports.parseInvTable = parseInvTable;

function parseRecords(path, data) {
  // decide how to process the file based on its path
  if (path.includes('inv')) {
    return parseInvTable(data);
  } else if (path.includes('category')) {
    return parseFKTable(data);
  }
};

exports.parseRecords = parseRecords;