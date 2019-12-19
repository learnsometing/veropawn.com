/*
* Header Menu
*
* This menu component resides in the site header and responds to changes in
* device width. Renders a different menu at each different size.
*/

import React from "react";
import sizeMe from "react-sizeme";

import headerStyles from "./header.module.css";

import HeaderLogo from "./header-logo";
import OpenDDBtn from "./open-dropdown-btn";
import ExpandedMainMenu from "./expanded-main-menu";

const HeaderMenu = (props) => {
  let mainMenu;
  if (props.size.width < 768) {
    mainMenu = <OpenDDBtn value={"Menu"} toggleMenu={props.toggleMainMenu} />
  } else {
    mainMenu = <ExpandedMainMenu toggleBrowseMenu={props.toggleBrowseMenu} />
  }

  return (
    <nav className={headerStyles.nav}>
      <HeaderLogo />
      {mainMenu}
    </nav >
  );
}

export default sizeMe()(HeaderMenu);