import React from "react";
import PropTypes from "prop-types";
import sizeMe from "react-sizeme";

import "./layout.css";
import headerStyles from "../header/header.module.css";

import HeaderLogo from "../header/header-logo";
import DDMenuToggleBtn from "../dropdown-menu/dd-menu-toggle-btn";
import HeaderModalLeft from "../modals/header-modal-left";
import CollapsedMainMenu from "../header-modal-menus/collapsed-main-menu";
import ExpandedMainMenu from "../header/expanded-main-menu";
import CategoryMenu from "../header-modal-menus/category-menu";


class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerModalLeft: {
        isOpen: false,
        menu: null
      }
    }
    this.closeHeaderModalLeft = this.closeHeaderModalLeft.bind(this);
    this.backToCollapsedMainMenu = this.openHeaderModalWithMenu.bind(
      this,
      <CollapsedMainMenu openBrowseMenu={this.openNestedCategoryMenu} />
    );
    this.openNestedCategoryMenu = this.openHeaderModalWithMenu.bind(
      this,
      <CategoryMenu backToMainMenu={this.backToCollapsedMainMenu} isNested={true} />
    );
    this.toggleCollapsedMainMenu = this.toggleHeaderModalWithMenu.bind(
      this,
      <CollapsedMainMenu openBrowseMenu={this.openNestedCategoryMenu} />
    );
    this.toggleCategoryMenu = this.toggleHeaderModalWithMenu.bind(
      this,
      <CategoryMenu backToMainMenu={this.backToCollapsedMainMenu} isNested={false} />
    );
  }

  closeHeaderModalLeft() {
    this.setState({
      headerModalLeft: {
        isOpen: false,
        menu: null
      }
    });
  }

  openHeaderModalWithMenu(menu) {
    this.setState({
      headerModalLeft: {
        isOpen: true,
        menu: menu
      }
    });
  }

  toggleHeaderModalWithMenu(menu) {
    if (this.state.headerModalLeft.menu) {
      this.closeHeaderModalLeft();
    } else {
      this.openHeaderModalWithMenu(menu);
    }
  }

  render() {
    let mainMenu;
    if (this.props.size.width < 768) {
      mainMenu = <DDMenuToggleBtn value={"Menu"} toggleMenu={this.toggleCollapsedMainMenu} />
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
        />
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default sizeMe()(Layout);
