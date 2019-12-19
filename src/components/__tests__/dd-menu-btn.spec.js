/*
* Tests for the Dropdown Menu component.
*/

import React from "react";
import renderer from "react-test-renderer";

import DDMenuBtn from "../dd-menu-btn";

describe("Dropdown menu button", () => {
  test("Matches the snapshot", () => {
    const ddMenuBtn = renderer.create(<DDMenuBtn children={'foo'} />);
    expect(ddMenuBtn.toJSON()).toMatchSnapshot();
  });
});