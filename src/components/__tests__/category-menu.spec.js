import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import CategoryMenu from "../header/category-menu";

// Mock data
import { allPagesJson, airToolSubcategories, distinctCategories } from "../__fixtures__/category-menu-data";

describe("CategoryMenu", () => {
  afterEach(cleanup);

  it("Should render the default menu correctly", () => {
    const { queryByRole, queryAllByRole } = render(<CategoryMenu data={allPagesJson} />);
    const buttonText = queryAllByRole('button').map(button => button.textContent);

    // Default menu should create a button with the prettified category as text
    // for each distinct category
    expect(buttonText).toEqual(distinctCategories);

    // The default category menu should not contain any subcategory links
    expect(queryByRole('link')).not.toBeInTheDocument();
  });

  it("Should render the correct subcat menu when its button is clicked", () => {
    const { queryByText,
      queryByRole,
      queryAllByRole,
      queryByTestId } = render(<CategoryMenu data={allPagesJson} />);

    // Click the air tools button to open the air tools menu
    fireEvent.click(queryByText("Air Tools"));

    const backButton = queryByRole('button');
    const pageLinks = queryAllByRole('link');

    // The button that takes the user back to the category menu should be present
    expect(backButton).toContainElement(queryByTestId('fa-angle-left-icon'));
    expect(backButton).toHaveTextContent(/\w+/);

    // Each page of subcategories for the selected category should be given a link
    // using the subcategory as text
    pageLinks.forEach(link => {
      expect(airToolSubcategories).toContain(link.textContent);
      expect(link.href).toMatch(/air-tools/);
    })
  });

  it("Should take the user back when the 'Back' button is clicked", () => {
    const { queryByText, queryByRole, queryAllByRole, queryByTestId } = render(<CategoryMenu data={allPagesJson} />);

    // Open the Air Tools menu
    fireEvent.click(queryByText("Air Tools"));

    // Get the "Categories" button
    let backButton = queryByText('Categories');

    // Click the "Categories" button to return to the category menu
    fireEvent.click(backButton);

    // Get the new first button in the list
    backButton = queryAllByRole('button')[0];

    // Subcategory menu should be replaced with default menu

    // first button does not have the angle icon in it (only the back button does)
    expect(backButton).not.toContainElement(queryByTestId('fa-angle-left-icon'));

    const buttonText = queryAllByRole('button').map(button => button.textContent);

    // The text of all the buttons is equal to the distinct array
    expect(buttonText).toEqual(distinctCategories);

    // No subcategory links should remain
    expect(queryByRole('link')).not.toBeInTheDocument();
  });
});