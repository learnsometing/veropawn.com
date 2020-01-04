/*
* Collapsed Main Menu
*
* The main menu that is rendered when the screen width is below 668 px.
*/

// Node_Modules Imports
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";

// Internal Imports
import { DDMenuHeader, DDMenuBtn, DDMenuToggleBtn } from "../dropdown-menu/dd-menu";
import MDPageLinks from "../shared/md-page-links";

import CategoryMenu from "./category-menu";

export const MainMenu = (props) => {
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const openCategoryMenu = () => {
    setCategoryMenuOpen(true);
  }

  const backToMainMenu = () => {
    setCategoryMenuOpen(false);
  }

  return (
    categoryMenuOpen
      ? <>
        <DDMenuBtn key="back-to-main-menu" onClick={backToMainMenu} >
          <FaAngleLeft data-testid="fa-angle-left-icon" />
          {"Main Menu"}
        </DDMenuBtn>
        <CategoryMenu data={props.allInvJson} />
      </>
      : <>
        <DDMenuHeader key="main-menu">
          Main Menu
        </DDMenuHeader>
        <DDMenuBtn key="browse-by-category" onClick={openCategoryMenu}>
          Categories
        </DDMenuBtn>
        <MDPageLinks data={props.allMarkdownRemark} collapsed={true} />
      </>
  );
}

export default (props) => {
  const toggleMenu = props.toggleMenu.bind(
    null,
    <MainMenu
      allInvJson={props.allInvJson}
      allMarkdownRemark={props.allMarkdownRemark}
    />
  );

  return (
    <DDMenuToggleBtn
      isOpen={props.isOpen}
      value={"Menu"}
      toggleMenu={toggleMenu}
    />
  );
}