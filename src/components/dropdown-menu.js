/*
* Dropdown menu that opens/closes when clicked and closes if a click occurs outside
* the menu.
*/

import React from "react"
import { MenuBtn } from "./menu-btn"

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };

    // This binding is necessary to make `this` work in the callback
    this.open = this.open.bind(this);
  }

  open() {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }

  render() {
    if (this.state.isOpen) {
      return (
        <>
          <button onClick={this.open}>
            Menu
          </button>
          <ul>
            <MenuBtn text='Home' />
            <MenuBtn text='About' />
            <MenuBtn text='Contact' />
          </ul >
        </>
      );
    } else {
      return (
        <button onClick={this.open}>
          Menu
        </button>
      );
    }
  }
}

export { DropdownMenu }