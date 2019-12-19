import React from "react"
import PropTypes from "prop-types"

import "./layout.css"
import headerStyles from "./header.module.css"

import HeaderMenu from "./header-menu"
import HeaderModalLeft from "./header-modal-left"

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerModalLeftOpen: false,
      mainMenuOpen: false,
      browseMenuOpen: false
    }
    this.toggleMainMenu = this.toggleMainMenu.bind(this);
    this.closeHeaderModalLeft = this.closeHeaderModalLeft.bind(this);
    this.openBrowseMenu = this.openBrowseMenu.bind(this);
    this.closeBrowseMenu = this.closeBrowseMenu.bind(this);
  }

  closeHeaderModalLeft() {
    this.setState({
      headerModalLeftOpen: false,
      mainMenuOpen: false,
      browseMenuOpen: false
    });
  }

  toggleMainMenu() {
    this.setState(state => ({
      headerModalLeftOpen: !state.headerModalLeftOpen,
      mainMenuOpen: !state.mainMenuOpen,
      browseMenuOpen: false
    }));
  }

  openBrowseMenu() {
    this.setState({
      mainMenuOpen: false,
      browseMenuOpen: true
    });
  }

  closeBrowseMenu() {
    this.setState({
      mainMenuOpen: true,
      browseMenuOpen: false
    });
  }

  render() {
    return (
      <>
        <div className={headerStyles.headerWrapper}>
          <header className={headerStyles.header}>
            <HeaderMenu
              toggleMenu={this.toggleMainMenu}
            />
          </header >
        </div>
        <div id="layout">
          <main>{this.props.children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
        <HeaderModalLeft
          isOpen={this.state.headerModalLeftOpen}
          closeModal={this.closeHeaderModalLeft}
          browseMenuOpen={this.state.browseMenuOpen}
          mainMenuOpen={this.state.mainMenuOpen}
          openBrowseMenu={this.openBrowseMenu}
          closeBrowseMenu={this.closeBrowseMenu}
        />
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
