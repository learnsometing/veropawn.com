/*
* Dropdown menu that opens/closes when clicked and closes if a click occurs outside
* the menu.
*/

import React from "react"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"

import MenuList from "./menu-list"
import { MenuBtn } from "./menu-btn"
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

  render() {
    const listOpen = this.state.listOpen;
    let menu;
    let icon;

    if (listOpen) {
      const menuItems = [
        <MenuBtn text='Home' />,
        <MenuBtn text='About' />,
        <MenuBtn text='Contact' />
      ];

      menu = <MenuList children={menuItems} />;
      icon = <FaAngleUp />;
    } else {
      menu = null;
      icon = <FaAngleDown />;
    }

    return (
      <div className={dropdownMenuStyles.menu}>
        <button className={dropdownMenuStyles.mainMenuBtn} onClick={this.toggleList}>
          Menu {icon}
        </button>
        {menu}
      </div>
    );
  }
}

export { MainMenu }