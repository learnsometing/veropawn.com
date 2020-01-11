import { prettifyCatOrSubcatName, toTitleCase } from "../util/text-formatting";

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

  it('should convert words separated by any symbol to titleCase', () => {
    expect(toTitleCase("PENDANT/CHARM")).toEqual("Pendant/Charm");
  });


});

describe('prettifyCatOrSubcatName', () => {
  it('should split and reverse strings that contain "Guitar/"', () => {
    expect(prettifyCatOrSubcatName("Guitar/Bass")).toEqual("Bass Guitar");
    expect(prettifyCatOrSubcatName("Guitar/Electric")).toEqual("Electric Guitar");
  });

  it('should split and join strings on & that contain "Pendant/"', () => {
    expect(prettifyCatOrSubcatName("Pendant/Charm")).toEqual("Pendant & Charm");
  });

  it('should split and reverse strings that contain "Tools-"', () => {
    expect(prettifyCatOrSubcatName("Tools-Air")).toEqual("Air Tools");
  });

  it('should replace any instances of "(S)" with "S"', () => {
    expect(prettifyCatOrSubcatName("Foreign Coin(S)")).toEqual("Foreign Coins");
  });
});