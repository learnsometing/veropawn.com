// Mock implementation of ExpandedMainMenu

import React from "react";

import DDMenuToggleBtn from "../dropdown-menu/dd-menu-toggle-btn";

export default (props) => {
  const toggleMenu = props.toggleMenu.bind(null, <li>Test Item</li>);

  return (
    <DDMenuToggleBtn
      isOpen={props.isOpen}
      value={"Categories"}
      key="browse-by-category"
      toggleMenu={toggleMenu}
    />
  );
}