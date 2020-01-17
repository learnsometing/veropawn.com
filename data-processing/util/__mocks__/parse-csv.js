const parsedCategoryTable = [
  { 'fk': '4001', 'name': 'COINS', },
  { 'fk': '8001', 'name': 'FIREARM', },
  { 'fk': '12001', 'name': 'JEWELRY', },
  { 'fk': '21001', 'name': 'TOOLS-POWER', },
];

exports.catFksToNames = new Map([
  ['4001', 'COINS'],
  ['8001', 'FIREARM'],
  ['12001', 'JEWELRY'],
  ['21001', 'TOOLS-POWER']
]);

const parsedSubcategoryTable = [
  { 'fk': '2223001', 'name': 'PISTOL' },
  { 'fk': '2339001', 'name': 'RING' },
  { 'fk': '2864001', 'name': 'SLUG' },
  { 'fk': '3299001', 'name': 'TESTER' },
];

exports.subcatFksToNames = new Map([
  ['2223001', 'PISTOL'],
  ['2339001', 'RING'],
  ['2864001', 'SLUG'],
  ['3299001', 'TESTER']
]);

const prettifiedInvData = [
  {
    'category': '12001',
    'subcategory': '2339001',
    'descript': 'LADIES RING W/STONES',
    'descript2': 'RING JEWELRY NONE, 14KT, 4.80 Grams; LADIES RING W/STONES',
    'model': '',
    'invNum': 'I-435'
  },
  {
    'category': "8001",
    'subcategory': "2223001",
    'descript': "BERETTA 950-B .22 HANDGUN 1 MAG",
    'descript2': "PISTOL FIREARM BERETTA 950-B, #C90805, .22 CALIBER, SEMI-AUTOMATIC; BERETTA 950-B .22 HANDGUN 1 MAG",
    'model': "950-B",
    'invNum': "G-133956-2",
  },
  {
    'category': '21001',
    'subcategory': '3299001',
    'descript': 'PHONE LINE TESTER',
    'descript2': 'TESTER TOOLS-POWER FLUKE TS19; PHONE LINE TESTER',
    'model': 'TS19',
    'invNum': '32825-5'
  },
  {
    'category': '12001',
    'subcategory': '2339001',
    'descript': 'MANS RING',
    'descript2': 'RING JEWELRY NONE, 14KT, 11.00 Grams; MANS RING',
    'model': '',
    'invNum': 'I-942'
  },
  {
    'category': "4001",
    'subcategory': "2864001",
    'descript': "10 OZ SILVER BAR",
    'descript2': "SLUG COINS JOHNSON MATTHEY, #A051912; 10 OZ SILVER BAR",
    'model': "",
    'invNum': "33340-1"
  }
];

exports.prettifiedInvData = prettifiedInvData;

const joinedInvData = [
  {
    'category': 'JEWELRY',
    'subcategory': 'RING',
    'descript': 'LADIES RING W/STONES',
    'descript2': 'RING JEWELRY NONE, 14KT, 4.80 Grams; LADIES RING W/STONES',
    'model': '',
    'invNum': 'I-435'
  },
  {
    'category': "FIREARM",
    'subcategory': "PISTOL",
    'descript': "BERETTA 950-B .22 HANDGUN 1 MAG",
    'descript2': "PISTOL FIREARM BERETTA 950-B, #C90805, .22 CALIBER, SEMI-AUTOMATIC; BERETTA 950-B .22 HANDGUN 1 MAG",
    'model': "950-B",
    'invNum': "G-133956-2",
  },
  {
    'category': 'TOOLS-POWER',
    'subcategory': 'TESTER',
    'descript': 'PHONE LINE TESTER',
    'descript2': 'TESTER TOOLS-POWER FLUKE TS19; PHONE LINE TESTER',
    'model': 'TS19',
    'invNum': '32825-5'
  },
  {
    'category': 'JEWELRY',
    'subcategory': 'RING',
    'descript': 'MANS RING',
    'descript2': 'RING JEWELRY NONE, 14KT, 11.00 Grams; MANS RING',
    'model': '',
    'invNum': 'I-942'
  },
  {
    'category': "COINS",
    'subcategory': "SLUG",
    'descript': "10 OZ SILVER BAR",
    'descript2': "SLUG COINS JOHNSON MATTHEY, #A051912; 10 OZ SILVER BAR",
    'model': "",
    'invNum': "33340-1"
  }
];

exports.joinedInvData = joinedInvData;

exports.parseCSV = (data, options) => {
  let result;
  if (data.includes('fk') && data.includes('4001')) {
    result = parsedCategoryTable;
  } else if (data.includes('fk') && data.includes('2223001')) {
    result = parsedSubcategoryTable;
  } else {
    result = prettifiedInvData;
  }

  return new Promise((resolve, reject) => resolve(result));
}