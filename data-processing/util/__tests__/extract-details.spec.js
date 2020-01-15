const { extractDetails } = require('../extract-details');

describe('extractDetails from Firearm types', () => {
  it('should correctly extract the details from an item with a model number', () => {
    let record = {
      "category": "FIREARM",
      "subcategory": "SHOTGUN",
      "descript": "BROWNING 16GA SHOTGUN",
      "descript2": "SHOTGUN FIREARM BROWNING NONE, #X63480, 16 GAUGE, SINGLE-SHOT; BROWNING 16GA SHOTGUN",
      "invNum": "G-134092-1",
      "model": "NONE"
    }

    expect(extractDetails(record)).toEqual({
      brand: 'Browning',
      serial: '#X63480',
      ammo: '16 Gauge',
      action: 'Single-Shot'
    });
  });

  it('should correctly extract the details from an item without a model number', () => {
    let record = {
      "category": "FIREARM",
      "subcategory": "SHOTGUN",
      "descript": "BROWNING 16GA SHOTGUN",
      "descript2": "SHOTGUN FIREARM BROWNING, #X63480, 16 GAUGE, SINGLE-SHOT; BROWNING 16GA SHOTGUN",
      "invNum": "G-134092-1",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      brand: 'Browning',
      serial: '#X63480',
      ammo: '16 Gauge',
      action: 'Single-Shot'
    });
  });

  it('should correctly extract the details from an item without a model number that includes NONE in descript2', () => {
    let record = {
      "category": "FIREARM",
      "subcategory": "SHOTGUN",
      "descript": "BROWNING 16GA SHOTGUN",
      "descript2": "SHOTGUN FIREARM BROWNING NONE, #X63480, 16 GAUGE, SINGLE-SHOT; BROWNING 16GA SHOTGUN",
      "invNum": "G-134092-1",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      brand: 'Browning',
      serial: '#X63480',
      ammo: '16 Gauge',
      action: 'Single-Shot'
    });
  });

  it('should return the default details from an item without extra details', () => {
    let record = {
      "category": "FIREARM",
      "subcategory": "SHOTGUN",
      "descript": "BROWNING 16GA SHOTGUN",
      "descript2": "SHOTGUN FIREARM; BROWNING 16GA SHOTGUN",
      "invNum": "G-134092-1",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      brand: '',
      serial: '',
      ammo: '',
      action: ''
    });
  });

  it('should correctly format millimeter ammo types', () => {
    let record = {
      "category": "FIREARM",
      "subcategory": "PISTOL",
      "descript": "HANDGUN IN CASE 2 MAGS",
      "descript2": "PISTOL FIREARM GLOCK 26, #PTG061, 9 MM, SEMI-AUTOMATIC; HANDGUN IN CASE 2 MAGS",
      "invNum": "G-235381-1",
      "model": "26"
    }

    expect(extractDetails(record)).toEqual({
      brand: 'Glock',
      serial: '#PTG061',
      ammo: '9 mm',
      action: 'Semi-Automatic'
    });
  });

  it('should correctly format caliber ammo types', () => {
    let record = {
      "category": "FIREARM",
      "subcategory": "PISTOL",
      "descript": "HANDGUN 2 MAGS IN CASE",
      "descript2": "PISTOL FIREARM GLOCK 30, #LFH095, .45 CALIBER, SEMI-AUTOMATIC; HANDGUN 2 MAGS IN CASE",
      "invNum": "G-235087-1",
      "model": "30"
    }

    expect(extractDetails(record)).toEqual({
      brand: 'Glock',
      serial: '#LFH095',
      ammo: '.45 Caliber',
      action: 'Semi-Automatic'
    });
  });

  it('should correctly format gauge ammo types', () => {
    let record = {
      "category": "FIREARM",
      "subcategory": "SHOTGUN",
      "descript": "SHOT GUN",
      "descript2": "SHOTGUN FIREARM WINCHESTER 24, #107679, 12 GAUGE, SINGLE-SHOT; SHOT GUN",
      "invNum": "G-33126-1",
      "model": "24"
    }

    expect(extractDetails(record)).toEqual({
      brand: 'Winchester',
      serial: '#107679',
      ammo: '12 Gauge',
      action: 'Single-Shot'
    });
  });

  it('should throw an error if descript2 contains extra details', () => {
    let record = {
      "category": "FIREARM",
      "subcategory": "SHOTGUN",
      "descript": "SHOT GUN",
      "descript2": "SHOTGUN FIREARM REMINGTON 870 SUPER MAG, #12345, 12 GAUGE, PUMP, FOO; SHOT GUN",
      "invNum": "G-134253-2",
      "model": "870 SUPER MAG"
    };

    expect(() => { extractDetails(record) }).toThrow(RangeError);
  });
});

describe('extractDetails from Jewelry types', () => {
  it('should correctly extract the details from an item with a model number', () => {
    let record = {
      "category": "JEWELRY",
      "subcategory": "WATCH",
      "descript": "MANS WATCH",
      "descript2": "WATCH JEWELRY BULOVA 96B121, #s17453654, N/A, 86.50 Grams; MANS WATCH",
      "invNum": "134671-2",
      "model": "96B121"
    }

    expect(extractDetails(record)).toEqual({
      brand: 'Bulova',
      serial: '#s17453654',
      metal: 'N/A',
      mass: '86.50 grams'
    });
  });

  it('should return the default details from an item without extra details', () => {
    let record = {
      "category": "JEWELRY",
      "subcategory": "WATCH",
      "descript": "MANS WATCH",
      "descript2": "WATCH JEWELRY; MANS WATCH",
      "invNum": "134671-2",
      "model": "96B121"
    }

    expect(extractDetails(record)).toEqual({
      brand: '',
      serial: '',
      metal: '',
      mass: ''
    });
  });

  it('should correctly extract the details from an item without a model number', () => {
    let record = {
      "category": "JEWELRY",
      "subcategory": "WATCH",
      "descript": "LADIES WATCH W/STONES",
      "descript2": "WATCH JEWELRY HAMILTON, PLAT, 14.20 Grams; LADIES WATCH W/STONES",
      "invNum": "134123-5",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      brand: 'Hamilton',
      serial: '',
      metal: 'Plat',
      mass: '14.20 grams'
    });
  });

  it('should correctly extract the details from an item without a model number that includes NONE in descript2', () => {
    let record = {
      "category": "JEWELRY",
      "subcategory": "BRACELET",
      "descript": "LADIES RING",
      "descript2": "BRACELET JEWELRY NONE NONE, 925, 22.80 Grams; LADIES RING",
      "invNum": "I-634",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      brand: 'None',
      serial: '',
      metal: 'Sterling Silver',
      mass: '22.80 grams'
    });
  });

  it('should correctly extract the details from an item without a metal type', () => {
    let record = {
      "category": "JEWELRY",
      "subcategory": "BRACELET",
      "descript": "LADIES RING",
      "descript2": "BRACELET JEWELRY NONE, #12345, 22.80 Grams; LADIES RING",
      "invNum": "I-634",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      brand: 'None',
      serial: '#12345',
      metal: '',
      mass: '22.80 grams'
    });
  });

  it('should correctly extract the details from an item without a serial or metal type', () => {
    let record = {
      "category": "JEWELRY",
      "subcategory": "BRACELET",
      "descript": "LADIES RING",
      "descript2": "BRACELET JEWELRY NONE, 2.20 Grams; LADIES RING",
      "invNum": "I-634",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      brand: 'None',
      serial: '',
      metal: '',
      mass: '2.20 grams'
    });
  });

  it('should correctly format gold metal types', () => {
    let record = {
      "category": "JEWELRY",
      "subcategory": "BRACELET",
      "descript": "LADIES TENNIS BRACELET",
      "descript2": "BRACELET JEWELRY NONE, 14KT, 14.00 Grams; LADIES TENNIS BRACELET",
      "invNum": "30897-1",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      brand: 'None',
      serial: '',
      metal: '14kt Gold',
      mass: '14.00 grams'
    });
  });

  it('should throw an error if descript2 contains extra details', () => {
    let record = {
      "category": "JEWELRY",
      "subcategory": "BRACELET",
      "descript": "BRACELET",
      "descript2": "BRACELET JEWELRY NONE, #NONE, EXTRA, 14KT, 4.60 Grams; BRACELET",
      "invNum": "I-752",
      "model": ""
    };

    expect(() => { extractDetails(record) }).toThrow(RangeError);
  });
});

describe('extractDetails default behavior', () => {
  it('should successfully extract the brand and serial number from an item', () => {
    let record = {
      "category": "TOOLS-POWER",
      "subcategory": "GRINDER",
      "descript": "ANGLE GRINDER",
      "descript2": "GRINDER TOOLS-POWER RYOBI AG402, #AB124570622; ANGLE GRINDER",
      "invNum": "32570-1",
      "model": "AG402"
    }

    expect(extractDetails(record)).toEqual({
      brand: 'Ryobi',
      serial: '#AB124570622'
    })
  });

  it('should successfully extract the brand from an item without a model number', () => {
    let record = {
      "category": "TOOLS-POWER",
      "subcategory": "IMPACT WRENCH",
      "descript": "IMPACT 1 BATTERY CHARGER",
      "descript2": "IMPACT WRENCH TOOLS-POWER MATCO; IMPACT 1 BATTERY CHARGER",
      "invNum": "133871-1",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      brand: 'Matco',
      serial: ''
    })
  });

  it('should successfully extract NONE from an item without a model number or a brand', () => {
    let record = {
      "category": "DEFENSE ACCESSORIES",
      "subcategory": "AMMUNITION",
      "descript": "5400 ROUNDS OF 5.45X39",
      "descript2": "AMMUNITION DEFENSE ACCESSORIES NONE; 5400 ROUNDS OF 5.45X39",
      "invNum": "235218-1",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      brand: 'None',
      serial: ''
    })
  });

  it('should successfully return the default details when an item has no extra details', () => {
    let record = {
      "category": "DEFENSE ACCESSORIES",
      "subcategory": "PEPPER SPRAY",
      "descript": "PEPPER SPRAY",
      "descript2": "PEPPER SPRAY DEFENSE ACCESSORIES; PEPPER SPRAY",
      "invNum": "I-897",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      brand: '',
      serial: ''
    });
  });
});

describe('extractDetails from Coins/Collectibles', () => {
  it('should successfully extract the type and additional number from a coin', () => {
    let record = {
      "category": "COINS",
      "subcategory": "SLUG",
      "descript": "10 OZ SILVER BAR",
      "descript2": "SLUG COINS JOHNSON MATTHEY, #A051912; 10 OZ SILVER BAR",
      "invNum": "33340-1",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      type: 'Johnson Matthey',
      additional: '#A051912'
    })
  });

  it('should successfully extract the brand from an item without a model number', () => {
    let record = {
      "category": "COINS",
      "subcategory": "SLUG",
      "descript": "HALF POUND ROUND SILVER COIN",
      "descript2": "SLUG COINS NONE; HALF POUND ROUND SILVER COIN",
      "invNum": "I-584",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      type: 'None',
      additional: ''
    })
  });

  it('should successfully return the default details when an item has no extra details', () => {
    let record = {
      "category": "COINS",
      "subcategory": "SLUG",
      "descript": "HALF POUND ROUND SILVER COIN",
      "descript2": "SLUG COINS; HALF POUND ROUND SILVER COIN",
      "invNum": "I-583",
      "model": ""
    }

    expect(extractDetails(record)).toEqual({
      type: '',
      additional: ''
    });
  });
});