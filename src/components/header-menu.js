import React from "react"

import headerStyles from "./header.module.css"

import HeaderLogo from "./header-logo"
import DDStatusIcon from "./dd-menu-status-icon"

const HeaderMenu = (props) => {
  let mainMenu;
  if (props.width < 767) {
    mainMenu = <button
      className={headerStyles.mainMenuBtn}
      onClick={props.toggleMenu}
    >
      Menu <DDStatusIcon />
    </button>
  }

  return (
    <>
      <HeaderLogo />
      {mainMenu}
    </>
  );
}

export default HeaderMenu;