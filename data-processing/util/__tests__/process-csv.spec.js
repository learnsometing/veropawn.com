jest.mock('../parse-csv');
const { getFkNamePairs, getInvData, resolveFile } = require("../process-csv");
const { catFksToNames, prettifiedInvData } = require("../__mocks__/parse-csv");
describe('getFKNamePairs', () => {
  let data = `
    fk      name
    4001    COINS
    8001    FIREARM
    12001   JEWELRY
    21001   TOOLS-POWER
  `

  it('should return a promise resolved to a map of parsed csv data', () => {
    return expect(getFkNamePairs(data)).resolves.toEqual(catFksToNames);
  });
});

describe('getInvData', () => {
  let data = `
  12001   2339001 LADIES RING W/STONES    RING JEWELRY NONE, 14KT, 4.80 Grams; LADIES RING W/STONES               I-435
  21001   3299001 PHONE LINE TESTER       TESTER TOOLS-POWER FLUKE TS19; PHONE LINE TESTER        TS19    32825-5
  12001   2339001 MANS  RING      RING JEWELRY NONE, 14KT, 11.00 Grams; MANS  RING                I-942
  `
  it('should return the prettified, parsed inventory CSV', () => {
    return expect(getInvData(data)).resolves.toEqual(prettifiedInvData);
  });
})

describe('resolveFile', () => {
  it('should resolve correctly when given the path to the inventory table', () => {
    let p = new Promise((resolve, reject) => resolveFile('inv.tsv', '', resolve));
    return expect(p).resolves.toEqual(prettifiedInvData);
  });

  it('should resolve correctly when given the path to the category fk table', () => {
    const data = `
    fk      name
    4001    COINS
    8001    FIREARM
    12001   JEWELRY
    21001   TOOLS-POWER
  `
    let p = new Promise((resolve, reject) => resolveFile('category.tsv', data, resolve));
    return expect(p).resolves.toEqual(catFksToNames);
  });
});