import React from "react"
import sizeMe from "react-sizeme"

import headerStyles from "./header.module.css"

import HeaderLogo from "./header-logo"
import DDStatusIcon from "./dd-menu-status-icon"

const HeaderMenu = (props) => {
  let mainMenu;
  if (props.size.width < 767) {
    mainMenu = <button
      className={headerStyles.mainMenuBtn}
      onClick={props.toggleMenu}
    >
      Menu <DDStatusIcon />
    </button>
  }

  return (
    <nav className={headerStyles.nav}>
      <HeaderLogo />
      {mainMenu}
    </nav >
  );
}

export default sizeMe()(HeaderMenu);