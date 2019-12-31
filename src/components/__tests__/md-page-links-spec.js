// Tests for MDPageLinks
import React from "react";
import { render } from "@testing-library/react";

import remarkData from "../__fixtures__/all-markdown-remark";
import MDPageLinks from "../shared/md-page-links";

describe("MDPageLinks", () => {
  const { allMarkdownRemark } = remarkData;

  it("Renders the correct links when collapsed", () => {
    const { queryAllByRole } = render(
      <MDPageLinks
        allMarkdownRemark={allMarkdownRemark}
        collapsed={true}
      />
    );

    queryAllByRole('link').forEach(link => expect(link.parentElement.tagName).toBe("LI"));
  });

  it("Renders the correct links when not collapsed", () => {
    const { queryAllByRole } = render(
      <MDPageLinks
        allMarkdownRemark={allMarkdownRemark}
        collapsed={false}
      />
    );

    queryAllByRole('link').forEach(link => expect(link.parentElement.tagName).not.toBe("LI"));
  });
})