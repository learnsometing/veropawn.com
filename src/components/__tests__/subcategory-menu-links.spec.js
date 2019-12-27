// Tests the appearance of Subcategory Menu Links

import React from "react";
import { render, cleanup } from "@testing-library/react";

import subcatNodes from "../__fixtures__/subcategory-nodes";
import SubcategoryMenuLinks from "../header-modal-menus/subcategory-menu-links"

describe("Subcategory Menu Links", () => {
  const { nodes } = subcatNodes;

  it("Renders a menu link for each given node", () => {
    const { queryByText } = render(<SubcategoryMenuLinks nodes={nodes} />);
    nodes.forEach(node => {
      const subcatMenuItem = queryByText(node.subcategory);
      expect(subcatMenuItem).toBeTruthy();
    });
    cleanup;
  });
});