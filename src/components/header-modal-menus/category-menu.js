/*
* Category Menu
*
* A dropdown menu that exposes the categories of items in the pawn shop's
* inventory to the user.
*/

// External imports
import React from "react";
import { FaAngleLeft } from "react-icons/fa";

// Internal imports
import headerModalMenuStyles from "./header-modal-menu.module.css";
import DDMenuBtn from "../dropdown-menu/dd-menu-btn";
import DDMenuHeader from "../dropdown-menu/dd-menu-header";
import SubcategoryMenuLinks from "./subcategory-menu-links";

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export function withSubcategoryMenu(Component, backToMainMenu = undefined) {
  class WithSubcategoryMenu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        subcatMenuOpen: false,
        subcatMenuHeader: "",
        subcatMenuLinks: []
      }

      this.openSubcatMenu = this.openSubcatMenu.bind(this);
      this.closeSubcatMenu = this.closeSubcatMenu.bind(this);
    }

    openSubcatMenu = (header, links) => {
      this.setState({
        subcatMenuOpen: true,
        subcatMenuHeader: header,
        subcatMenuLinks: links
      });
    }

    closeSubcatMenu = () => {
      this.setState({
        subcatMenuOpen: false,
        subcatMenuHeader: '',
        subcatMenuLinks: []
      });
    }

    render() {
      const openSubcatMenu = this.openSubcatMenu;
      const closeSubcatMenu = this.closeSubcatMenu;

      const subcatMenuOpen = this.state.subcatMenuOpen;
      const subcatMenuHeader = this.state.subcatMenuHeader;
      const subcatMenuLinks = this.state.subcatMenuLinks;

      let children;

      if (getDisplayName(Component).includes("CategoryMenuBtns")) {
        children = <Component onClick={openSubcatMenu} />;
      } else if (getDisplayName(Component).includes("NestedCategoryMenu")) {
        children = <Component onClick={openSubcatMenu} backToMainMenu={backToMainMenu} />;
      };

      if (subcatMenuOpen) {
        children = <>
          <DDMenuBtn key="back-to-categories" onClick={closeSubcatMenu}>
            <FaAngleLeft />
            {"Back"}
          </DDMenuBtn>
          <DDMenuHeader key={subcatMenuHeader}>
            <span>{subcatMenuHeader}</span>
          </DDMenuHeader>
          <SubcategoryMenuLinks nodes={subcatMenuLinks} />
        </>
      }

      return (
        <ul className={headerModalMenuStyles.uList}>
          {children}
        </ul>
      );
    };
  }
  WithSubcategoryMenu.displayName = `WithSubscategory(${getDisplayName(Component)})`;
  return WithSubcategoryMenu;
}