jest.mock('../util/process-csv');
const { catFksToNames, subcatFksToNames, prettifiedInvData } = require("../util/__mocks__/parse-csv");
const { processCSVFiles } = require('../produce-json');

describe('processCSVFiles', () => {
  it('should return an array of promises each resolved to the result of processedCSV', () => {
    const paths = [
      `category.tsv`,
      `subcategory.tsv`,
      `inv/inv.tsv`
    ];
    const expected = [
      new Promise((resolve, reject) => resolve(catFksToNames)),
      new Promise((resolve, reject) => resolve(subcatFksToNames)),
      new Promise((resolve, reject) => resolve(prettifiedInvData)),
    ];
    expect(processCSVFiles(paths)).toEqual(expected);
  });
});