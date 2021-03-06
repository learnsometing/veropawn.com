/*
* Tests for the HeaderLogo component.
*/

import React from "react";
import renderer from "react-test-renderer";

import logoData from "../__fixtures__/logo-data"
import { HeaderLogo } from "../header/header";

describe("HeaderLogo component", () => {
  test("Matches the snapshot", () => {
    const { data } = logoData
    const headerLogo = renderer.create(<HeaderLogo logo={data} />);
    expect(headerLogo.toJSON()).toMatchSnapshot();
  });
});