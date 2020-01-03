// Category Menu Tests

import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";

import CategoryMenu from "../header/category-menu";

// Mock data
import { airToolPages, allInvJson } from "../__fixtures__/category-menu-data";

describe("CategoryMenu", () => {
  const subcategories = airToolPages.map(node => node.subcategory);

  afterEach(cleanup);

  it("Should render the default menu correctly", () => {
    const { queryByRole, queryAllByRole } = render(<CategoryMenu data={allInvJson} />);
    const buttonText = queryAllByRole('button').map(button => button.textContent);

    // The default category menu should give each distinct category its own button
    expect(buttonText).toEqual(allInvJson.distinct);

    // The default category menu should not contain any subcategory links
    expect(queryByRole('link')).toBeFalsy();
  });

  it("Should render the correct subcat menu when its button is clicked", () => {
    const { queryByText, queryByRole, queryAllByRole } = render(<CategoryMenu data={allInvJson} />);

    // Click the air tools button to open the air tools menu
    fireEvent.click(queryByText("Air Tools"));

    const backButton = queryByRole('button');
    const subcatPageLinks = queryAllByRole('link').map(link => link.textContent);

    // The button that takes the user back to the category menu should be present
    expect(backButton.textContent).toBe("Categories");

    // Each page of subcategories for the selected category should be given a link
    expect(subcatPageLinks).toEqual(subcategories);
  });

  it("Should take the user back when the 'Categories' button is clicked", () => {
    const { queryByText, queryByRole, queryAllByRole } = render(<CategoryMenu data={allInvJson} />);

    // Open the Air Tools menu
    fireEvent.click(queryByText("Air Tools"));

    // Get the "Categories" button
    let firstButton = queryAllByRole('button')[0];

    // Click the "Categories" button to return to the category menu
    fireEvent.click(firstButton);

    // Get the new first button in the list
    firstButton = queryAllByRole('button')[0];

    // Subcategory menu should be replaced with default menu
    expect(firstButton.textContent).not.toBe("Categories");

    const buttonText = queryAllByRole('button').map(button => button.textContent);

    expect(buttonText).toEqual(allInvJson.distinct);

    // No subcategory links should remain
    expect(queryByRole('link')).toBeFalsy();
  });
});