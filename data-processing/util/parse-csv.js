const neatCSV = require('neat-csv');

exports.parseCSV = (data, options) => {
  return neatCSV(data, options);
};