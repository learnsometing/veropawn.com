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
        isCategoryMenu: false,
      }
    }
    this.toggleCollapsedMainMenu = this.toggleCollapsedMainMenu.bind(this);
    this.toggleCategoryMenu = this.toggleCategoryMenu.bind(this);
    this.closeHeaderModalLeft = this.closeHeaderModalLeft.bind(this);
    this.setLeftModalToNestedCategories = this.setLeftModalToNestedCategories.bind(this);
    this.setLeftModalToMain = this.setLeftModalToMain.bind(this);
  }

  closeHeaderModalLeft() {
    this.setState({
      headerModalLeft: {
        isOpen: false,
        isCollapsedMainMenu: false,
        isNestedCategoryMenu: false,
        isCategoryMenu: false
      }
    });
  }

  toggleCollapsedMainMenu() {
    this.setState(state => ({
      headerModalLeft: {
        isOpen: !state.headerModalLeft.isOpen,
        isCollapsedMainMenu: !state.headerModalLeft.isCollapsedMainMenu,
        isNestedCategoryMenu: false,
        isCategoryMenu: false
      }
    }));
  }

  toggleCategoryMenu() {
    this.setState(state => ({
      headerModalLeft: {
        isOpen: !state.headerModalLeft.isOpen,
        isCollapsedMainMenu: false,
        isNestedCategoryMenu: false,
        isCategoryMenu: !state.headerModalLeft.isCategoryMenu
      }
    }));
  }

  setLeftModalToNestedCategories() {
    this.setState({
      headerModalLeft: {
        isOpen: true,
        isCollapsedMainMenu: false,
        isNestedCategoryMenu: true,
        isCategoryMenu: false
      }
    });
  }

  setLeftModalToMain() {
    this.setState({
      headerModalLeft: {
        isOpen: true,
        isCollapsedMainMenu: true,
        isNestedCategoryMenu: false,
        isCategoryMenu: false
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
              toggleCategoryMenu={this.toggleCategoryMenu}
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
          setToNestedCategoryMenu={this.setLeftModalToNestedCategories}
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
