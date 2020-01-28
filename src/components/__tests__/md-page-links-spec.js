// Tests for MDPageLinks
import React from "react";
import { render } from "@testing-library/react";

import allMarkdownRemark from "../__fixtures__/all-markdown-remark";
import { MDPageLinks } from "../header/header";

describe("MDPageLinks", () => {
  it("Supplies the correct information to each link when rendered", () => {
    const { queryAllByRole } = render(
      <MDPageLinks
        data={allMarkdownRemark}
        collapsed={true}
      />
    );

    const links = queryAllByRole('link');

    const slugs = allMarkdownRemark.nodes.map(node => node.fields.slug);
    const values = allMarkdownRemark.nodes.map(node => node.frontmatter.title);

    links.forEach(link => {
      expect(slugs.some(slug => link.href.includes(slug))).toBeTruthy();
      expect(values).toContain(link.textContent);
    });
  });

  it("Renders dropdown menu links when collapsed", () => {
    const { queryAllByRole } = render(
      <MDPageLinks
        data={allMarkdownRemark}
        collapsed={true}
      />
    );

    queryAllByRole('link').forEach(link => expect(link.parentElement.tagName).toBe("LI"));
  });

  it("Renders header links when expanded", () => {
    const { queryAllByRole } = render(
      <MDPageLinks
        data={allMarkdownRemark}
        collapsed={false}
      />
    );

    queryAllByRole('link').forEach(link => expect(link.parentElement.tagName).not.toBe("LI"));
  });
})