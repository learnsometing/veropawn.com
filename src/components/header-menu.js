import PropTypes from "prop-types"
import React from "react"

import headerStyles from "./header.module.css"

import HeaderLogo from "./header-logo"
import DDStatusIcon from "./dd-menu-status-icon"
import MainMenu from "./main-menu"

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

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;