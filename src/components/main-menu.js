/*
* Dropdown menu that opens/closes when clicked and closes if a click occurs outside
* the menu.
*/

import React from "react"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import onClickOutside from "react-onclickoutside"

import DDMenuList from "./dd-menu-list"
import DDMenuLink from "./dd-menu-link"
import DDMenuBtn from "./dd-menu-btn"
import ddMenuStyles from "./dropdown-menu.module.css"
import MDPageLinks from "./md-page-links"
import InvCategoryBtns from "./inv-category-btns"
import BrowseByCategory from "./browse-category-menu"

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      isMainMenu: true,
      isBrowseMenu: false
    };

    // This binding is necessary to make `this` work in the callback
    this.toggleList = this.toggleList.bind(this);
    this.toggleBrowseMenu = this.toggleBrowseMenu.bind(this);
    this.toggleMainMenu = this.toggleMainMenu.bind(this);
  }

  toggleList() {
    this.setState(state => ({
      listOpen: !state.listOpen,
      isMainMenu: true,
      isBrowseMenu: false
    }));
  }

  toggleBrowseMenu() {
    this.setState({
      listOpen: true,
      isMainMenu: false,
      isBrowseMenu: true
    });
  }

  toggleMainMenu() {
    this.setState({
      listOpen: true,
      isMainMenu: true,
      isBrowseMenu: false
    });
  }

  handleClickOutside(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState(({
        listOpen: false,
        isMainMenu: true,
        isBrowseMenu: false
      }));
    }
  }

  render() {
    const listOpen = this.state.listOpen;
    const isMainMenu = this.state.isMainMenu;
    const isBrowseMenu = this.state.isBrowseMenu;
    const children = <>
      <DDMenuLink link="/" text="Home" />
      <BrowseByCategory toggleBrowseMenu={this.toggleBrowseMenu} />
      <MDPageLinks />
    </>

    let menu;
    let icon;

    if (listOpen && isMainMenu) {
      menu = <DDMenuList children={children} />;
      icon = <FaAngleUp />;
    } else if (listOpen && isBrowseMenu) {
      menu = <DDMenuList children={<>
        <DDMenuBtn text="Back" onClick={this.toggleMainMenu} />
        <InvCategoryBtns />
      </>} />
      icon = <FaAngleUp />
    } else {
      menu = null;
      icon = <FaAngleDown />;
    }

    return (
      <>
        <button className={ddMenuStyles.mainMenuBtn} onClick={this.toggleList}>
          Menu {icon}
        </button>
        <div className={ddMenuStyles.container}
          ref={(element) => {
            this.dropdownMenu = element;
          }}>
          {menu}
        </div>
      </>
    );
  }
}

export default onClickOutside(MainMenu)