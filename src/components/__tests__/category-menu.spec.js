// Category Menu Tests

import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import CategoryMenu, { sortByButtonText } from "../header/category-menu";

// Mock data
import { allInvJson, prettyAirToolSubcategories, prettyCategories } from "../__fixtures__/category-menu-data";

describe('sortByButtonText', () => {

  it("should throw a TypeError if props.text of either compared component isn't a string", () => {
    expect(() => {
      const ComponentA = <button text={() => console.log('text is a function!')} />
      const ComponentB = <button text={'Text is a string'} />
      sortByButtonText(ComponentA, ComponentB)
    }).toThrow(TypeError);
  });

  it('should return 0 if both components have the same text', () => {
    const ComponentA = <button text={"foo"} />;
    const ComponentB = <button text={"foo"} />;

    expect(sortByButtonText(ComponentA, ComponentB)).toEqual(0);
  });

  it("should return -1 if ComponentA's text is less than ComponentB's", () => {
    const ComponentA = <button text={"bar"} />;
    const ComponentB = <button text={"foo"} />;

    expect(sortByButtonText(ComponentA, ComponentB)).toEqual(-1);
  });

  it("should return 1 if ComponentA's text is greater than ComponentB's", () => {
    const ComponentA = <button text={"foo"} />;
    const ComponentB = <button text={"bar"} />;

    expect(sortByButtonText(ComponentA, ComponentB)).toEqual(1);
  });
});

describe("CategoryMenu", () => {
  afterEach(cleanup);

  it("Should render the default menu correctly", () => {
    const { queryByRole, queryAllByRole } = render(<CategoryMenu data={allInvJson} />);
    const buttonText = queryAllByRole('button').map(button => button.textContent);

    // Default menu should create a button with the prettified category as text
    // for each distinct category
    expect(buttonText).toEqual(prettyCategories);

    // The default category menu should not contain any subcategory links
    expect(queryByRole('link')).not.toBeInTheDocument();
  });

  it("Should render the correct subcat menu when its button is clicked", () => {
    const { queryByText,
      queryByRole,
      queryAllByRole,
      queryByTestId } = render(<CategoryMenu data={allInvJson} />);

    // Click the air tools button to open the air tools menu
    fireEvent.click(queryByText("Air Tools"));

    const backButton = queryByRole('button');
    const subcatPageLinks = queryAllByRole('link').map(link => link.textContent);

    // The button that takes the user back to the category menu should be present
    expect(backButton).toContainElement(queryByTestId('angle-left-icon'));
    expect(backButton).toHaveTextContent(/\w+/);

    // Each page of subcategories for the selected category should be given a link
    // using the prettified version of the subcategory as text
    expect(subcatPageLinks).toEqual(prettyAirToolSubcategories);
  });

  it("Should take the user back when the 'Categories' button is clicked", () => {
    const { queryByText, queryByRole, queryAllByRole, queryByTestId } = render(<CategoryMenu data={allInvJson} />);

    // Open the Air Tools menu
    fireEvent.click(queryByText("Air Tools"));

    // Get the "Categories" button
    let firstButton = queryAllByRole('button')[0];

    // Click the "Categories" button to return to the category menu
    fireEvent.click(firstButton);

    // Get the new first button in the list
    firstButton = queryAllByRole('button')[0];

    // Subcategory menu should be replaced with default menu

    // first button does not have the angle icon in it (only the back button does)
    expect(firstButton).not.toContainElement(queryByTestId('angle-left-icon'));

    const buttonText = queryAllByRole('button').map(button => button.textContent);

    // The text of all the buttons is equal to the distinct array
    expect(buttonText).toEqual(prettyCategories);

    // No subcategory links should remain
    expect(queryByRole('link')).not.toBeInTheDocument();
  });
});