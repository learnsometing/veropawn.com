const neatCSV = require('neat-csv');

exports.parseCSV = (data, options) => {
  // written to be easily mocked in unit tests
  return neatCSV(data, options);
};