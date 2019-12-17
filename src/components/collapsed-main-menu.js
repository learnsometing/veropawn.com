/*
* Collapsed Main Menu
*
* The main menu that is rendered when the screen width is below 767 px.
*/

// External Imports
import React from "react"

// Internal Imports
import DDMenuBtn from "./dd-menu-btn"
import DDMenuList from "./dd-menu-list"
import ddMenuStyles from "./dropdown-menu.module.css"
import MDPageLinks from "./md-page-links"

export default (props) => {
  return (
    <DDMenuList
      children={
        <>
          <DDMenuBtn
            children="Browse By Category"
            className={ddMenuStyles.link}
            key="browse-by-category"
            onClick={props.openBrowseMenu}
          />
          <MDPageLinks />
        </>
      }
      setDropdownMenuRef={props.setDropdownMenuRef}
    />
  );
}