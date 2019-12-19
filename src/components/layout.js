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
      headerModalLeft: {
        isOpen: false,
        isMainMenu: false,
        isBrowseMenu: false
      }
    }
    this.toggleMainMenu = this.toggleMainMenu.bind(this);
    this.closeHeaderModalLeft = this.closeHeaderModalLeft.bind(this);
    this.setLeftModalToBrowse = this.setLeftModalToBrowse.bind(this);
    this.setLeftModalToMain = this.setLeftModalToMain.bind(this);
  }

  closeHeaderModalLeft() {
    this.setState({
      headerModalLeft: {
        isOpen: false,
        isMainMenu: false,
        isBrowseMenu: false
      }
    });
  }

  toggleMainMenu() {
    this.setState(state => ({
      headerModalLeft: {
        isOpen: !state.headerModalLeft.isOpen,
        isMainMenu: !state.headerModalLeft.isMainMenu,
        isBrowseMenu: false
      }
    }));
  }

  setLeftModalToBrowse() {
    this.setState({
      headerModalLeft: {
        isOpen: true,
        isMainMenu: false,
        isBrowseMenu: true
      }
    });
  }

  setLeftModalToMain() {
    this.setState({
      headerModalLeft: {
        isOpen: true,
        isMainMenu: true,
        isBrowseMenu: false
      }
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
          state={this.state.headerModalLeft}
          closeModal={this.closeHeaderModalLeft}
          setToBrowseMenu={this.setLeftModalToBrowse}
          setToMainMenu={this.setLeftModalToMain}
        />
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
