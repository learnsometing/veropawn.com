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
        isCollapsedMainMenu: false,
        isNestedCategoryMenu: false,
      }
    }
    this.toggleCollapsedMainMenu = this.toggleCollapsedMainMenu.bind(this);
    this.closeHeaderModalLeft = this.closeHeaderModalLeft.bind(this);
    this.setLeftModalToBrowse = this.setLeftModalToBrowse.bind(this);
    this.setLeftModalToMain = this.setLeftModalToMain.bind(this);
  }

  closeHeaderModalLeft() {
    this.setState({
      headerModalLeft: {
        isOpen: false,
        isCollapsedMainMenu: false,
        isNestedCategoryMenu: false
      }
    });
  }

  toggleCollapsedMainMenu() {
    this.setState(state => ({
      headerModalLeft: {
        isOpen: !state.headerModalLeft.isOpen,
        isCollapsedMainMenu: !state.headerModalLeft.isCollapsedMainMenu,
        isNestedCategoryMenu: false
      }
    }));
  }

  setLeftModalToBrowse() {
    this.setState({
      headerModalLeft: {
        isOpen: true,
        isCollapsedMainMenu: false,
        isNestedCategoryMenu: true
      }
    });
  }

  setLeftModalToMain() {
    this.setState({
      headerModalLeft: {
        isOpen: true,
        isCollapsedMainMenu: true,
        isNestedCategoryMenu: false
      }
    });
  }

  render() {
    return (
      <>
        <div className={headerStyles.headerWrapper}>
          <header className={headerStyles.header}>
            <HeaderMenu
              toggleCollapsedMainMenu={this.toggleCollapsedMainMenu}
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
