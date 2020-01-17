const { catFksToNames, subcatFksToNames, prettifiedInvData } = require("./parse-csv");

exports.processedCSV = (path, resolve, reject) => {
  let result;

  if (path.includes('inv')) {
    result = prettifiedInvData;
  } else if (path.includes('subcategory')) {
    result = subcatFksToNames;
  } else {
    result = catFksToNames;
  }
  resolve(result);
};