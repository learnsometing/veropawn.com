jest.mock('../parse-csv');
var { parseFKTable, parseInvTable, parseRecords } = require("../process-csv");
var { catFksToNames, prettifiedInvData } = require("../__mocks__/parse-csv");

let fkData = `
    fk      name
    4001    COINS
    8001    FIREARM
    12001   JEWELRY
    21001   TOOLS-POWER
  `;

let invData = `
  12001   2339001 LADIES RING W/STONES    RING JEWELRY NONE, 14KT, 4.80 Grams; LADIES RING W/STONES               I-435
  21001   3299001 PHONE LINE TESTER       TESTER TOOLS-POWER FLUKE TS19; PHONE LINE TESTER        TS19    32825-5
  12001   2339001 MANS  RING      RING JEWELRY NONE, 14KT, 11.00 Grams; MANS  RING                I-942
  `;

describe('parseFKTable', () => {
  it('should return a promise resolved to a map of parsed csv data', () => {
    return expect(parseFKTable(fkData)).resolves.toEqual(catFksToNames);
  });
});

describe('parseInvTable', () => {
  it('should return the prettified, parsed inventory CSV', () => {
    return expect(parseInvTable(invData)).resolves.toEqual(prettifiedInvData);
  });
})

describe('parseRecords', () => {
  it('should resolve correctly when given the path to the inventory table', () => {
    return expect(parseRecords('inv.tsv', invData)).resolves.toEqual(prettifiedInvData);
  });

  it('should resolve correctly when given the path to the category fk table', () => {
    return expect(parseRecords('category.tsv', fkData)).resolves.toEqual(catFksToNames);
  });
});