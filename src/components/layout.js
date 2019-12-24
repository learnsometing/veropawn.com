import React from "react"
import PropTypes from "prop-types"
import sizeMe from "react-sizeme";

import "./layout.css"
import headerStyles from "./header.module.css"

import HeaderLogo from "./header-logo";
import OpenDDBtn from "./open-dropdown-btn";
import HeaderModalLeft from "./header-modal-left"
import ExpandedMainMenu from "./expanded-main-menu";

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
    let mainMenu;
    if (this.props.size.width < 768) {
      mainMenu = <OpenDDBtn value={"Menu"} toggleMenu={this.toggleCollapsedMainMenu} />
    } else {
      mainMenu = <ExpandedMainMenu toggleCategoryMenu={this.toggleCategoryMenu} />
    }
    return (
      <div id="root">
        <div className={headerStyles.headerWrapper}>
          <header className={headerStyles.header}>
            <nav className={headerStyles.nav}>
              <HeaderLogo />
              {mainMenu}
            </nav >
          </header >
        </div>
        <main id="mainContainer">{this.props.children}</main>
        <footer>
          <span>{this.props.size.width}</span>
        </footer>
        <HeaderModalLeft
          state={this.state.headerModalLeft}
          closeModal={this.closeHeaderModalLeft}
          setToNestedCategoryMenu={this.setLeftModalToNestedCategories}
          setToMainMenu={this.setLeftModalToMain}
        />
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default sizeMe()(Layout);
