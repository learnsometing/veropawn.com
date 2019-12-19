/*
* Collapsed Main Menu
*
* The main menu that is rendered when the screen width is below 767 px.
*/

// External Imports
import React from "react"

// Internal Imports
import DDMenuBtn from "./dd-menu-btn"
import ddMenuStyles from "./dropdown-menu.module.css"
import MDPageLinks from "./md-page-links"

export default (props) => {
  return (
    <ul className={ddMenuStyles.ulist}>
      <DDMenuBtn
        children="Categories"
        className={ddMenuStyles.link}
        key="browse-by-category"
        onClick={props.openBrowseMenu}
      />
      <MDPageLinks collapsed={true} />
    </ul >
  );
}