import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";

import { allInvJson } from "../__fixtures__/category-menu-data";
import allMarkdownRemark from "../__fixtures__/all-markdown-remark";
import ExpandedMainMenu from "../header/expanded-main-menu";

describe('ExpandedMainMenu', () => {
  const toggleMenuMock = jest.fn(menu => { if (menu) { return true } });

  afterEach(cleanup);

  it('should render the default menu correctly', () => {
    const { queryByRole, queryByTestId } = render(
      <ExpandedMainMenu
        allInvJson={allInvJson}
        allMarkdownRemark={allMarkdownRemark}
        isOpen={false}
        toggleMenu={toggleMenuMock}
      />
    );

    const categoryMenuToggleBtn = queryByRole('button');
    const children = Array.from(categoryMenuToggleBtn.childNodes);
    expect(categoryMenuToggleBtn.textContent).toMatch(/\w\b\s/);
    expect(children).toContain(queryByTestId("fa-angle-down-icon"));
  });

  it('should render the menu button with an up arrow when isOpen', () => {
    const { queryByRole, queryByTestId } = render(
      <ExpandedMainMenu
        allInvJson={allInvJson}
        allMarkdownRemark={allMarkdownRemark}
        isOpen={true}
        toggleMenu={toggleMenuMock}
      />
    );

    const categoryMenuToggleBtn = queryByRole('button');
    const children = Array.from(categoryMenuToggleBtn.childNodes);
    expect(categoryMenuToggleBtn.textContent).toMatch(/\w\b\s/);
    expect(children).toContain(queryByTestId("fa-angle-up-icon"));
  });

  it('should have a working toggleMenu function', () => {
    const { queryByRole } = render(
      <ExpandedMainMenu
        allInvJson={allInvJson}
        allMarkdownRemark={allMarkdownRemark}
        isOpen={false}
        toggleMenu={toggleMenuMock}
      />
    );

    const categoryMenuToggleBtn = queryByRole('button');
    fireEvent.click(categoryMenuToggleBtn);
    expect(toggleMenuMock.mock.calls.length).toBe(1);
    expect(toggleMenuMock.mock.results).toBeTruthy();
  });
});