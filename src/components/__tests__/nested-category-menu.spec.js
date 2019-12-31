// Nested Category Menu Tests

import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";

import NestedCategoryMenu from "../header-modal-menus/nested-category-menu";

// Mock data
import catMenuBtnsData from "../__fixtures__/category-menu-btns-data";
import subcatNodes from "../__fixtures__/subcategory-nodes";

describe("NestedCategoryMenu", () => {
  const { nodes } = subcatNodes;
  const subcategories = nodes.map(node => node.subcategory);
  const { data } = catMenuBtnsData;

  let menu;
  const backToMainMenuMock = jest.fn(() => {
    menu = true;
  });

  afterAll(() => {
    cleanup;
  });

  it("Should return the passed component", () => {
    const { queryByText, queryAllByRole } = render(
      <NestedCategoryMenu data={data.allInvJson} backToMainMenu={backToMainMenuMock} />
    );

    expect(queryByText("Main Menu")).toBeTruthy();
    expect(queryByText("Back")).toBeFalsy();
    queryAllByRole('button').forEach(button => {
      if (button.textContent === "Main Menu") {
        return;
      }
      expect(data.allInvJson.distinct.includes(button.textContent)).toBeTruthy();
    });
    subcategories.forEach(subcategory => {
      expect(queryByText(subcategory)).toBeFalsy();
    });
  });

  it("Should pass openBrowseMenu to CollapsedMainMenu", () => {
    const { queryByText } = render(
      <NestedCategoryMenu data={data.allInvJson} backToMainMenu={backToMainMenuMock} />
    );

    expect(menu).toBeFalsy();

    fireEvent.click(queryByText("Main Menu"));

    expect(menu).toBeTruthy();
  });

  it("Should enable subcategory menus to be opened/closed repeatedly", () => {
    const { queryByText, queryAllByRole } = render(
      <NestedCategoryMenu data={data.allInvJson} backToMainMenu={backToMainMenuMock} />
    );

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
      if (button.textContent === "Main Menu") {
        return;
      }
      expect(data.allInvJson.distinct.includes(button.textContent)).toBeTruthy();
    });
    subcategories.forEach(subcategory => {
      expect(queryByText(subcategory)).toBeFalsy();
    });
  });
});