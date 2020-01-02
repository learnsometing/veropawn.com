/*
* Collapsed Main Menu
*
* The main menu that is rendered when the screen width is below 767 px.
*/

// Node_Modules Imports
import React from "react";
import { FaAngleLeft } from "react-icons/fa";

// Internal Imports
import DDMenuHeader from "../dropdown-menu/dd-menu-header";
import DDMenuBtn from "../dropdown-menu/dd-menu-btn";
import DDMenuToggleBtn from "../dropdown-menu/dd-menu-toggle-btn";
import MDPageLinks from "../shared/md-page-links";

import CategoryMenu from "./category-menu";

export default (props) => {
  const _mainMenu = <>
    <DDMenuHeader key="main-menu">
      Main Menu
    </DDMenuHeader>
    <DDMenuBtn key="browse-by-category" onClick={openCategoryMenu}>
      Categories
    </DDMenuBtn>
    <MDPageLinks allMarkdownRemark={props.allMarkdownRemark} collapsed={true} />
  </>;

  const _categoryMenu = <>
    <DDMenuBtn key="back-to-main-menu" onClick={openMainMenu} >
      <FaAngleLeft />
      {"Main Menu"}
    </DDMenuBtn>
    <CategoryMenu data={props.allInvJson} />
  </>

  function openMainMenu() {
    props.openModalWithMenu(_mainMenu);
  }

  function openCategoryMenu() {
    props.openModalWithMenu(_categoryMenu)
  }

  const toggleMenu = props.toggleMenu.bind(null, _mainMenu);

  return (
    <DDMenuToggleBtn
      isOpen={props.isOpen}
      value={"Menu"}
      toggleMenu={toggleMenu}
    />
  );
}