import PropTypes from "prop-types"
import React from "react"
import sizeMe from "react-sizeme"

import MainMenu from "./main-menu"
import headerStyles from "./header.module.css"

const Header = (props) => {
  return (
    <div className={headerStyles.headerWrapper}>
      <header className={headerStyles.header}>
        <nav className={headerStyles.nav}>
          <MainMenu
            width={props.size.width}
            toggleMainMenu={props.toggleMainMenu}
            mainMenuOpen={props.mainMenuOpen}
          />
        </nav >
      </header >
    </div>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default sizeMe()(Header);