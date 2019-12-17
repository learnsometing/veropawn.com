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
import OpenDDMenuBtn from "./open-dd-menu-btn"
import ddMenuStyles from "./dropdown-menu.module.css"
import MDPageLinks from "./md-page-links"
import BrowseByCategoryMenu from "./browse-category-menu"

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.closeBrowseMenu = this.closeBrowseMenu.bind(this);
    this.dropdownMenu = null;
    this.openBrowseMenu = this.openBrowseMenu.bind(this);
    this.setDropdownMenuRef = this.setDropdownMenuRef.bind(this)
    this.state = {
      mainMenuOpen: false,
      browseMenuOpen: false,
    };
    this.toggleMainMenu = this.toggleMainMenu.bind(this);
  }

  setDropdownMenuRef = element => {
    this.dropdownMenu = element;
  };

  toggleMainMenu() {
    this.setState(state => ({
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

  handleClickOutside(event) {
    if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
      this.setState(({
        mainMenuOpen: false,
        browseMenuOpen: false
      }));
    }
  }

  render() {
    const mainMenuOpen = this.state.mainMenuOpen;
    const browseMenuOpen = this.state.browseMenuOpen;

    const children = <>
      <DDMenuLink
        key="home"
        link="/"
        value="Home"
      />
      <DDMenuBtn
        children="Browse By Category"
        className={ddMenuStyles.link}
        key="browse-by-category"
        onClick={this.openBrowseMenu}
      />
      <MDPageLinks />
    </>

    let menu = null;
    let browseMenu = null;
    let icon = <FaAngleUp />;

    if (mainMenuOpen) {
      menu = <DDMenuList
        children={children}
        setDropdownMenuRef={this.setDropdownMenuRef}
      />;
    } else {
      icon = <FaAngleDown />;
    }

    if (browseMenuOpen) {
      browseMenu = <BrowseByCategoryMenu
        closeBrowseMenu={this.closeBrowseMenu}
        setDropdownMenuRef={this.setDropdownMenuRef}
      />;
    }

    return (
      <>
        <OpenDDMenuBtn
          children={
            <>
              Menu {icon}
            </>
          }
          onClick={this.toggleMainMenu}
        />
        {menu}
        {browseMenu}
      </>
    );
  }
}

export default onClickOutside(MainMenu)