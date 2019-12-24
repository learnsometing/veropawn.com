/*
* Expanded Main Menu
*
* The header menu that is rendered when the screen width is above 767 px.
*/

// External Imports
import React from "react"

// Internal Imports
import DDMenuToggleBtn from "../dropdown-menu/dd-menu-toggle-btn"
import MDPageLinks from "../shared/md-page-links"

export default (props) => {
  return (
    <>
      <DDMenuToggleBtn
        value={"Categories"}
        key="browse-by-category"
        toggleMenu={props.toggleCategoryMenu}
      />
      <MDPageLinks collapsed={false} />
    </>
  );
}