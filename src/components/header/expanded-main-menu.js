/*
* Expanded Main Menu
*
* The header menu that is rendered when the screen width is above 667 px.
*/

// Node_Modules Imports
import React from "react";

// Internal Imports
import DDMenuToggleBtn from "../dropdown-menu/dd-menu-toggle-btn";
import MDPageLinks from "../shared/md-page-links";

import CategoryMenu from "./category-menu";

export default (props) => {
  const _categoryMenu = <CategoryMenu data={props.allInvJson} />

  const toggleMenu = props.toggleMenu.bind(null, _categoryMenu);

  return (
    <>
      <DDMenuToggleBtn
        isOpen={props.isOpen}
        value={"Categories"}
        key="browse-by-category"
        toggleMenu={toggleMenu}
      />
      <MDPageLinks
        allMarkdownRemark={props.allMarkdownRemark}
        collapsed={false}
      />
    </>
  );
}