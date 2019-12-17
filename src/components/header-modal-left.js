/*
* Header Modal Left
*
* Modal for main menu dropdown content that appears on the left side of the screen.
* 
* The modal renders either the main menu or browse menu content based on props.
* 
* Maintains a reference to the current dropdown menu, which
* is set by setDropdownMenuRef dynamically. This reference is used to close the
* modal if the user is clicks outside it.
*/

import React from "react"

import CollapsedMainMenu from "./collapsed-main-menu";
import BrowseByCategoryMenu from "./browse-category-menu"

import headerModalLeftStyles from "./header-modal-left.module.css"

export default (props) => {
  const mainMenuOpen = props.mainMenuOpen;
  const browseMenuOpen = props.browseMenuOpen;
  const isOpen = (mainMenuOpen || browseMenuOpen);

  let modal = null;

  if (isOpen) {
    let menu;

    if (mainMenuOpen) {
      menu = <CollapsedMainMenu
        id="main-menu"
        openBrowseMenu={props.openBrowseMenu}
        setDropdownMenuRef={props.setDropdownMenuRef}
      />
    } else if (browseMenuOpen) {
      menu = <BrowseByCategoryMenu
        closeBrowseMenu={props.closeBrowseMenu}
        setDropdownMenuRef={props.setDropdownMenuRef}
      />;
    }

    modal = <div className={headerModalLeftStyles.wrapper}>
      <div className={headerModalLeftStyles.overlay}>
      </div>
      {menu}
    </div>

  }

  return modal;

}