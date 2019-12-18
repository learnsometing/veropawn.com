/*
* Header Modal Left
*
* Modal for main menu dropdown content that appears on the left side of the screen.
* 
* The modal renders either the main menu or browse menu content based on props.
* 
* Maintains a reference to the current dropdown menu, which
* is set by setDropdownMenuRef dynamically. This reference is used to close the
* modal if the user is clicks outside it.
*/

import React from "react"
import onClickOutside from "react-onclickoutside"

import CollapsedMainMenu from "./collapsed-main-menu";
import BrowseByCategoryMenu from "./browse-category-menu"

import headerModalLeftStyles from "./header-modal-left.module.css"

class HeaderModalLeft extends React.Component {
  constructor(props) {
    super(props);
    //handling outside clicks
    this.dropdownMenu = null;
    this.setDropdownMenuRef = this.setDropdownMenuRef.bind(this)
    this.state = {
      isOpen: (this.props.mainMenuOpen || this.props.browseMenuOpen)
    }
  }

  setDropdownMenuRef = element => {
    this.dropdownMenu = element;
  };

  handleClickOutside(event) {
    if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
      this.setState(({
        isOpen: false
      }));
    }
  }

  render() {
    const mainMenuOpen = this.props.mainMenuOpen;
    const browseMenuOpen = this.props.browseMenuOpen;
    const isOpen = this.state.isOpen;

    let modal = null;

    if (isOpen) {
      let menu;

      if (mainMenuOpen) {
        menu = <CollapsedMainMenu
          id="main-menu"
          openBrowseMenu={this.props.openBrowseMenu}
          setDropdownMenuRef={this.props.setDropdownMenuRef}
        />
      } else if (browseMenuOpen) {
        menu = <BrowseByCategoryMenu
          closeBrowseMenu={this.props.closeBrowseMenu}
          setDropdownMenuRef={this.props.setDropdownMenuRef}
        />;
      }

      modal = <div className={headerModalLeftStyles.wrapper}>
        <div className={headerModalLeftStyles.overlay}>
        </div>
        {menu}
      </div>

    }

    return modal;

  }
}

export default onClickOutside(HeaderModalLeft);