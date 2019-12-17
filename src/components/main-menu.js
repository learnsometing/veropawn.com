/*
* Main Menu
*
* Contains links to other pages on the site and allows the user to browse the
* inventory. Will be collapsed at smaller screen sizes.
* 
* The main menu possesses two states, mainMenuOpen and browseMenuOpen. 
*
* - mainMenuOpen:
* If collapsed, the main menu button will toggle mainMenuOpen when clicked.
* When expanded the menu will always be shown in the navigation bar.
*
* - browseMenuOpen:
* If collapsed, a button will appear in the main menu that opens the browse menu
* and closes the main menu. When expanded, the browse menu button will toggle
* the browse menu open and closed.
* 
* The main menu also maintains a reference to the current dropdown menu, which
* is set by setDropdownMenuRef dynamically. This reference is used to determine
* if the user is clicking outside the main menu, which should close the main menu
* when collapsed.
*/

import React from "react"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import onClickOutside from "react-onclickoutside"

import MainMenuList from "./main-menu-list"
import OpenDDMenuBtn from "./open-dd-menu-btn"
import BrowseByCategoryMenu from "./browse-category-menu"

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.closeBrowseMenu = this.closeBrowseMenu.bind(this);
    this.dropdownMenu = null;
    this.openBrowseMenu = this.openBrowseMenu.bind(this);
    this.setDropdownMenuRef = this.setDropdownMenuRef.bind(this)
    this.state = {
      isCollapsed: true,
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
    const isCollapsed = this.state.isCollapsed;
    const mainMenuOpen = this.state.mainMenuOpen;
    const browseMenuOpen = this.state.browseMenuOpen;

    let icon = <FaAngleUp />;
    let openDDMenuBtn = null;
    let menu = null;

    if (isCollapsed) {
      openDDMenuBtn = <OpenDDMenuBtn
        children={
          <>
            Menu {icon}
          </>
        }
        onClick={this.toggleMainMenu}
      />
    }

    if (mainMenuOpen) {
      menu = <MainMenuList
        isCollapsed={isCollapsed}
        openBrowseMenu={this.openBrowseMenu}
        setDropdownMenuRef={this.setDropdownMenuRef}
      />
    } else if (browseMenuOpen) {
      menu = <BrowseByCategoryMenu
        closeBrowseMenu={this.closeBrowseMenu}
        setDropdownMenuRef={this.setDropdownMenuRef}
      />;
    } else {
      icon = <FaAngleDown />;
    }

    return (
      <>
        {openDDMenuBtn}
        {menu}
      </>
    );
  }
}

export default onClickOutside(MainMenu)