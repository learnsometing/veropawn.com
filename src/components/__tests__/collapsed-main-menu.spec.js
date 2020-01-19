//node_modules
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
// fixtures
import { allPagesJson, distinctCategories } from "../__fixtures__/category-menu-data";
import allMarkdownRemark from "../__fixtures__/all-markdown-remark";
//components
import CollapsedMainMenu, { MainMenu } from "../header/collapsed-main-menu";

describe('MainMenu', () => {
  const titles = allMarkdownRemark.nodes.map(node => node.frontmatter.title);

  it('should render the default menu correctly', () => {
    const { queryByRole, queryByTestId, queryAllByRole } = render(
      <MainMenu
        allPagesJson={allPagesJson}
        allMarkdownRemark={allMarkdownRemark}
      />
    );

    const linkTextIsInTitles = (text) => {
      return titles.includes(text);
    }

    // should have a heading
    expect(queryByTestId('dd-menu-heading')).toBeInTheDocument();

    // should have a button that opens the category menu
    expect(queryByRole('button')).toBeInTheDocument();

    // rest of the menu should be filled with links to the markdown generated pages
    queryAllByRole('link').forEach(link => (
      expect(linkTextIsInTitles(link.textContent)).toBeTruthy()
    ));
  });

  it('should render the category menu when the "categories" button is clicked', () => {
    const { queryByRole, queryAllByRole, queryByText, queryByTestId } = render(
      <MainMenu
        allPagesJson={allPagesJson}
        allMarkdownRemark={allMarkdownRemark}
      />
    );

    // locate the 'categories' button
    const openCategoryMenuBtn = queryByRole('button');

    // Click the 'categories' button
    fireEvent.click(openCategoryMenuBtn);

    const mainMenuBtn = queryByText('Main Menu');
    const categoryBtns = queryAllByRole('button').slice(1);
    const categoryBtnTextList = categoryBtns.map(btn => btn.textContent);

    expect(mainMenuBtn).toContainElement(queryByTestId('fa-angle-left-icon'));
    expect(mainMenuBtn).toHaveTextContent(/\s/);
    expect(categoryBtnTextList).toEqual(distinctCategories);
  });

  it('should render the default menu when the "Main Menu" button is clicked', () => {
    const { queryByRole, queryAllByRole, queryByText, queryByTestId } = render(
      <MainMenu
        allPagesJson={allPagesJson}
        allMarkdownRemark={allMarkdownRemark}
      />
    );

    const linkTextIsInTitles = (text) => {
      return titles.includes(text);
    }

    // locate the 'categories' button
    const openCategoryMenuBtn = queryByRole('button');

    // Click the 'categories' button
    fireEvent.click(openCategoryMenuBtn);

    // locate the 'main menu' button
    const mainMenuBtn = queryByText('Main Menu');

    // Click the 'main menu' button
    fireEvent.click(mainMenuBtn);

    // Assertions

    // user should see the main menu heading again
    expect(queryByTestId('dd-menu-heading').textContent).toBe('Main Menu');

    // should have a button that opens the category menu
    expect(queryByRole('button').textContent).toBe('Categories');

    // rest of the menu should be filled with links to the markdown generated pages
    queryAllByRole('link').forEach(link => (
      expect(linkTextIsInTitles(link.textContent)).toBeTruthy()
    ));
  });
});

describe('CollapsedMainMenu', () => {
  const toggleMenuMock = jest.fn(menu => { if (menu) { return true } });

  it('should render the menu toggle button correctly', () => {
    const { queryByRole, queryByTestId } = render(
      <CollapsedMainMenu
        allPagesJson={allPagesJson}
        allMarkdownRemark={allMarkdownRemark}
        isOpen={false}
        toggleMenu={toggleMenuMock}
      />
    );

    const mainMenuToggleBtn = queryByRole('button');
    const children = Array.from(mainMenuToggleBtn.childNodes);
    expect(mainMenuToggleBtn.textContent).toMatch(/\w\b\s/);
    expect(children).toContain(queryByTestId("fa-angle-down-icon"));
  });

  it('should render the menu toggle button with an up arrow if isOpen', () => {
    const { queryByRole, queryByTestId } = render(
      <CollapsedMainMenu
        allPagesJson={allPagesJson}
        allMarkdownRemark={allMarkdownRemark}
        isOpen={true}
        toggleMenu={toggleMenuMock}
      />
    );

    const mainMenuToggleBtn = queryByRole('button');
    const children = Array.from(mainMenuToggleBtn.childNodes);
    expect(mainMenuToggleBtn.textContent).toMatch(/\w\b\s/);
    expect(children).toContain(queryByTestId("fa-angle-up-icon"));
  });

  it('should have a working toggleMenu function', () => {
    const { queryByRole } = render(
      <CollapsedMainMenu
        allPagesJson={allPagesJson}
        allMarkdownRemark={allMarkdownRemark}
        isOpen={false}
        toggleMenu={toggleMenuMock}
      />
    );

    const mainMenuToggleBtn = queryByRole('button');

    // Click the toggle button
    fireEvent.click(mainMenuToggleBtn);

    // Assert on toggleMenu's effects
    expect(toggleMenuMock.mock.calls.length).toBe(1);
    expect(toggleMenuMock.mock.results).toBeTruthy();
  });
});