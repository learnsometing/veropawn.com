/*
* Collapsed Main Menu
*
* The main menu that is rendered when the screen width is below 767 px.
*/

// External Imports
import React from "react"

// Internal Imports
import DDMenuBtn from "../dropdown-menu/dd-menu-btn"
import headerModalMenuStyles from "./header-modal-menu.module.css"
import MDPageLinks from "../shared/md-page-links"

export default (props) => {
  return (
    <ul className={headerModalMenuStyles.ulist}>
      <DDMenuBtn
        children="Categories"
        key="browse-by-category"
        onClick={props.openBrowseMenu}
      />
      <MDPageLinks collapsed={true} />
    </ul >
  );
}