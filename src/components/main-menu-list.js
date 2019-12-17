/*
* Main Menu List
*
* Conditionally renders the main menu list via props.
*/

// External Imports
import React from "react"

// Internal Imports
import DDMenuBtn from "./dd-menu-btn"
import DDMenuList from "./dd-menu-list"
import ddMenuStyles from "./dropdown-menu.module.css"
import MDPageLinks from "./md-page-links"

export default (props) => {
  let menuList;
  if (props.isCollapsed && props.setDropdownMenuRef) {
    menuList =
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
      />;
  }

  return menuList;

}