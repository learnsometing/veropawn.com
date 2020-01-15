const { prettifyName, prettifyDescript, toTitleCase } = require("../text-formatting");

describe('toTitleCase', () => {
  it('should convert a single uppercase word to title case', () => {
    expect(toTitleCase("COLLECTIBLES")).toEqual("Collectibles");
  });

  it('should convert multiple words separated by spaces to title case', () => {
    expect(toTitleCase("FOO BAR")).toEqual("Foo Bar");
  });

  it('should solve the Jim-Bob problem', () => {
    expect(toTitleCase("jim-bob")).toEqual("Jim-Bob");
  });

  it('should solve the possessive noun/pronoun problem', () => {
    expect(toTitleCase("man's")).toEqual("Man's");
  });

  it('should convert words separated by any other symbol to titleCase', () => {
    expect(toTitleCase("PENDANT/CHARM")).toEqual("Pendant/Charm");
  });
});

describe('prettifyDescript', () => {
  it(`should trim '             "' off of the ends of any description`, () => {
    expect(prettifyDescript('BODY ARMOR             "')).toEqual("Body Armor");
  });

  it(`should replace any instances of "W/" with " With "`, () => {
    expect(prettifyDescript("Gun W/2 Mags")).toEqual("Gun With 2 Mags");
  });

  // Gender Possessive Nouns for Women
  it(`should replace any instances of "LADIES" with Women's`, () => {
    expect(prettifyDescript("LADIES ANKLET")).toEqual("Women's Anklet")
  });

  it(`should replace any instances of "LADIE'S" with Women's`, () => {
    expect(prettifyDescript("LADIE'S ANKLET")).toEqual("Women's Anklet")
  });

  it(`should replace any instances of "LADIES'" with Women's`, () => {
    expect(prettifyDescript("LADIES' ANKLET")).toEqual("Women's Anklet")
  });

  it(`should replace any instances of "WOMANS" with Women's`, () => {
    expect(prettifyDescript("WOMANS RING")).toEqual("Women's Ring")
  });

  it(`should replace any instances of "WOMAN'S" with Women's`, () => {
    expect(prettifyDescript("LADIE'S ANKLET")).toEqual("Women's Anklet")
  });

  // Gender Possessive Nouns for Men
  it(`should replace any instances of "MENS" with Men's`, () => {
    expect(prettifyDescript("MENS ANKLET")).toEqual("Men's Anklet")
  });

  it(`should replace any instances of "MEN'S" with Men's`, () => {
    expect(prettifyDescript("MEN'S ANKLET")).toEqual("Men's Anklet")
  });

  it(`should replace any instances of "MANS" with Men's`, () => {
    expect(prettifyDescript("MANS RING")).toEqual("Men's Ring")
  });

  it(`should replace any instances of "MAN'S" with Men's`, () => {
    expect(prettifyDescript("MAN'S ANKLET")).toEqual("Men's Anklet")
  });
});

describe('prettifyName', () => {
  it('should split and reverse strings that contain "Guitar/"', () => {
    expect(prettifyName("Guitar/Bass")).toEqual("Bass Guitar");
    expect(prettifyName("Guitar/Electric")).toEqual("Electric Guitar");
  });

  it('should split and join strings on & that contain "Pendant/"', () => {
    expect(prettifyName("Pendant/Charm")).toEqual("Pendant & Charm");
  });

  it('should split and reverse strings that contain "Tools-"', () => {
    expect(prettifyName("Tools-Air")).toEqual("Air Tools");
  });

  it('should replace any instances of "(S)" with "S"', () => {
    expect(prettifyName("Foreign Coin(S)")).toEqual("Foreign Coins");
  });
});

