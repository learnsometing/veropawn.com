/*
* Dropdown menu that opens/closes when clicked and closes if a click occurs outside
* the menu.
*/

import React from "react"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"

import MenuList from "./menu-list"
import HomeLink from "./home-link"
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

  render() {
    const listOpen = this.state.listOpen;
    const children = <>
      <HomeLink />
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
      <div className={dropdownMenuStyles.menu}>
        <button className={dropdownMenuStyles.mainMenuBtn} onClick={this.toggleList}>
          Menu {icon}
        </button>
        {menu}
      </div>
    );
  }
}

export default MainMenu