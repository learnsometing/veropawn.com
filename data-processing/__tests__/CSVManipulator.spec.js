const { catFksToNames, subcatFksToNames, prettifiedInvData, joinedInvData } = require("../util/__mocks__/parse-csv");
const { CSVManipulator } = require('../CSVManipulator');

describe('CSVManipulator', () => {
  const lastItem = {
    category: '12001',
    subcategory: '2796001',
    descript: 'ROUND LAPEL PIN DIAMONG',
    descript2: 'PIN JEWELRY NONE, 14KT, 5.90 Grams; ROUND LAPEL PIN DIAMONG',
    model: '',
    invNum: '31623-5',
  };

  let invData = [...prettifiedInvData];
  invData.push(lastItem);

  const manipulator = CSVManipulator(catFksToNames, subcatFksToNames, invData);
  it(`getForSaleItems should only return items with a cat or subcat in either catNamesMap or subcatNamesMap`, () => {
    expect(manipulator.getForSaleItems()).toEqual(prettifiedInvData);
  });

  it(`getNotForSaleItems should only return items without a cat or subcat in either catNamesMap or subcatNamesMap`, () => {
    expect(manipulator.getNotForSaleItems()).toEqual(
      [{
        'LEVEL1_FK': '12001',
        'LEVEL2_FK': '2796001',
        'DESCRIPT': 'ROUND LAPEL PIN DIAMONG',
        'DESCRIPT2': 'PIN JEWELRY NONE, 14KT, 5.90 Grams; ROUND LAPEL PIN DIAMONG',
        'MODELNUM': '',
        'INVNUM': '31623-5',
      }]
    );
  });

  it('should correctly join items', () => {
    expect(manipulator.getItemsWithJoinedInNames(prettifiedInvData)).toEqual(joinedInvData);
  });
});