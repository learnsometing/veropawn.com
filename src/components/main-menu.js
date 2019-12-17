import React from "react"

import HeaderLogo from "./header-logo"
import headerStyles from "./header.module.css"
import DDStatusIcon from "./dd-menu-status-icon"
const MainMenu = (props) => {
  let mainMenu;
  if (props.width < 767) {
    mainMenu = <button
      className={headerStyles.mainMenuBtn}
      onClick={props.toggleMainMenu}
    >
      Menu <DDStatusIcon menuOpen={props.mainMenuOpen} />
    </button>
  }

  return (
    <>
      <HeaderLogo />
      {mainMenu}
    </>
  );
}

export default MainMenu