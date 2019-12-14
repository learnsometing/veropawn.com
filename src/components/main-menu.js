/*
* Dropdown menu that opens/closes when clicked and closes if a click occurs outside
* the menu.
*/

import React from "react"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import onClickOutside from "react-onclickoutside"

import DDMenuList from "./dd-menu-list"
import DDMenuLink from "./dd-menu-link"
import MDPageLinks from "./md-page-links"
import ddMenuStyles from "./dropdown-menu.module.css"

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
      <DDMenuLink link="/" text="Home" />
      <MDPageLinks />
    </>
    let menu;
    let icon;

    if (listOpen) {
      menu = <DDMenuList children={children} />;
      icon = <FaAngleUp />;
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