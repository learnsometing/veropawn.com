/*
* Header Menu
*
* Child menu component to the site header. Renders the appropriate menu in
* response to changes in its width.
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
    mainMenu = <OpenDDBtn value={"Menu"} toggleMenu={props.toggleCollapsedMainMenu} />
  } else {
    mainMenu = <ExpandedMainMenu toggleCategoryMenu={props.toggleCategoryMenu} />
  }

  return (
    <nav className={headerStyles.nav}>
      <HeaderLogo />
      {mainMenu}
    </nav >
  );
}

export default sizeMe()(HeaderMenu);