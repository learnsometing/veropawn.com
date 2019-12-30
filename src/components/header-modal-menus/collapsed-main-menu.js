/*
* Collapsed Main Menu
*
* The main menu that is rendered when the screen width is below 767 px.
*/

// External Imports
import React from "react"

// Internal Imports
import DDMenuHeader from "../dropdown-menu/dd-menu-header";
import DDMenuBtn from "../dropdown-menu/dd-menu-btn"
import headerModalMenuStyles from "./header-modal-menu.module.css"
import MDPageLinks from "../shared/md-page-links"

export const PureCollapsedMainMenu = (props) => {
  return (
    <ul className={headerModalMenuStyles.ulist}>
      <DDMenuHeader key="main-menu">
        Main Menu
      </DDMenuHeader>
      <DDMenuBtn key="browse-by-category" onClick={props.openBrowseMenu}>
        Categories
      </DDMenuBtn>
      {props.children}
    </ul >
  );
}

export default ({ openBrowseMenu }) => {
  return (
    <PureCollapsedMainMenu openBrowseMenu={openBrowseMenu}>
      <MDPageLinks collapsed={true} />
    </PureCollapsedMainMenu>
  );
}