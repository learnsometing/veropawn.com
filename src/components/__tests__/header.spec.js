import React from "react";
import { render } from "@testing-library/react";

import logoData from "../__fixtures__/logo-data";
import { allInvJson } from "../__fixtures__/category-menu-data";
import allMarkdownRemark from "../__fixtures__/all-markdown-remark";
import { PureHeader as Header } from "../header/header";

describe('Header', () => {
  const { data } = logoData;

  it('should render the collapsed menu when screen width < 667 ', () => {
    const { queryByRole } = render(
      <Header
        allInvJson={allInvJson}
        allMarkdownRemark={allMarkdownRemark}
        logo={data}
        size={{ width: 666 }}
      />
    );

    expect(queryByRole('button').textContent).toMatch(/menu/i)
  });

  it('should render the expanded menu when screen width >= 667 ', () => {
    const { queryByRole } = render(
      <Header
        allInvJson={allInvJson}
        allMarkdownRemark={allMarkdownRemark}
        logo={data}
        size={{ width: 667 }}
      />
    );

    expect(queryByRole('button').textContent).toMatch(/categories/i)
  });
});