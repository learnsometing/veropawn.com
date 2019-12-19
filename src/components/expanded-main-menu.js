/*
* Expanded Main Menu
*
* The header menu that is rendered when the screen width is above 767 px.
*/

// External Imports
import React from "react"

// Internal Imports
import OpenDDBtn from "./open-dropdown-btn"
import MDPageLinks from "./md-page-links"

export default (props) => {
  return (
    <>
      <OpenDDBtn
        value={"Categories"}
        key="browse-by-category"
        toggleMenu={props.toggleBrowseMenu}
      />
      <MDPageLinks collapsed={false} />
    </>
  );
}