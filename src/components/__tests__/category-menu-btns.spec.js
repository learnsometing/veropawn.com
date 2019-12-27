// Tests for CategoryMenuBtns

import React from "react";
import { render, fireEvent } from "@testing-library/react";

import catMenuBtnsData from "../__fixtures__/category-menu-btns-data";
import subcatNodes from "../__fixtures__/subcategory-nodes";
import { PureCategoryMenuBtns as CategoryMenuBtns } from "../header-modal-menus/category-menu-btns";

describe("Category Menu Buttons", () => {
  const { data } = catMenuBtnsData;
  const { nodes } = subcatNodes;

  let subcatMenuHeader = '';
  let subcatMenuLinks = [];

  const onClickMock = jest.fn((header, links) => {
    subcatMenuHeader = header;
    subcatMenuLinks = links
  });

  afterAll(() => {
    subcatMenuHeader = '';
    subcatMenuLinks = [];
  });

  it("Creates a button for each distinct category", () => {
    const { queryByText } = render(<CategoryMenuBtns data={data.allInvJson} onClick={onClickMock} />);

    data.allInvJson.distinct.forEach(category => {
      expect(queryByText(category)).toBeTruthy();
    });
  });

  it("Each button's onclick event returns the correct subcategory nodes", () => {
    const { queryByText } = render(<CategoryMenuBtns data={data.allInvJson} onClick={onClickMock} />);
    const airToolsBtn = queryByText('Air Tools');

    fireEvent.click(airToolsBtn);
    expect(subcatMenuHeader).toBe("Air Tools");
    expect(subcatMenuLinks).toStrictEqual(nodes);
  });
})