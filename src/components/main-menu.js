/*
* Dropdown menu that opens/closes when clicked and closes if a click occurs outside
* the menu.
*/

import React from "react"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import onClickOutside from "react-onclickoutside"

import MenuList from "./menu-list"
import MenuLink from "./menu-link"
import MDPageLinks from "./md-page-links"
import dropdownMenuStyles from "./dropdown-menu.module.css"

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listOpen: false };

    // This binding is necessary to make `this` work in the callback
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList() {
    this.setState(state => ({
      listOpen: !state.listOpen
    }));
  }

  handleClickOutside(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState(({
        listOpen: false
      }));
    }
  }

  render() {
    const listOpen = this.state.listOpen;
    const children = <>
      <MenuLink link="/" text="Home" />
      <MDPageLinks />
    </>
    let menu;
    let icon;

    if (listOpen) {
      menu = <MenuList children={children} />;
      icon = <FaAngleUp />;
    } else {
      menu = null;
      icon = <FaAngleDown />;
    }

    return (
      <>
        <button className={dropdownMenuStyles.mainMenuBtn} onClick={this.toggleList}>
          Menu {icon}
        </button>
        <div className={dropdownMenuStyles.menu}
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