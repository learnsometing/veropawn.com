// Category Menu Tests

import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";

import CategoryMenu from "../header-modal-menus/category-menu";

// Mock data
import catMenuBtnsData from "../__fixtures__/category-menu-btns-data";
import subcatNodes from "../__fixtures__/subcategory-nodes";

describe("CategoryMenuBtns", () => {
  const { nodes } = subcatNodes;
  const subcategories = nodes.map(node => node.subcategory);
  const { data } = catMenuBtnsData;

  afterAll(() => {
    cleanup;
  });

  it("Should render correctly", () => {
    const { queryByText, queryAllByRole } = render(<CategoryMenu data={data.allInvJson} />);

    expect(queryByText("Back")).toBeFalsy();
    queryAllByRole('button').forEach(button => {
      expect(data.allInvJson.distinct.includes(button.textContent)).toBeTruthy();
    });
    subcategories.forEach(subcategory => {
      expect(queryByText(subcategory)).toBeFalsy();
    });
  });

  it("Should enable subcategory menus to be opened/closed repeatedly", () => {
    const { queryByText, queryAllByRole } = render(<CategoryMenu data={data.allInvJson} />);

    // Open the Jewelry menu
    fireEvent.click(queryByText("Jewelry"));

    // Make assertions after opening the jewelry menu.
    expect(queryByText("Back")).toBeTruthy();
    expect(queryByText('Jewelry')).toBeTruthy();

    // Click the back button to return to the category menu
    fireEvent.click(queryByText("Back"));

    // Make assertions after returning to the category menu.
    expect(queryByText("Back")).toBeFalsy();

    //Open the Air Tools menu
    fireEvent.click(queryByText("Air Tools"));

    // Make assertions after the subcategory menu is opened.
    expect(queryByText("Back")).toBeTruthy();
    expect(queryByText('Air Tools')).toBeTruthy();
    queryAllByRole('button').forEach(button => {
      expect(data.allInvJson.distinct.includes(button.textContent)).toBeFalsy();
    })
    queryAllByRole('link').forEach(link => {
      expect(subcategories.includes(link.textContent)).toBeTruthy();
    });

    // Click the back button to return to the category menu
    fireEvent.click(queryByText("Back"));

    // Make assertions after returning to the category menu.
    expect(queryByText("Back")).toBeFalsy();
    queryAllByRole('button').forEach(button => {
      expect(data.allInvJson.distinct.includes(button.textContent)).toBeTruthy();
    });
    subcategories.forEach(subcategory => {
      expect(queryByText(subcategory)).toBeFalsy();
    });
  });
});