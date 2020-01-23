/*
* Collapsed Main Menu
*
* The main menu that is rendered when the screen width is below 668 px.
*/

// Node_Modules Imports
import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// Internal Imports
import { DDMenuHeader, DDMenuBtn, DDMenuToggleBtn } from "./dd-menu";
import MDPageLinks from "./md-page-links";

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
        <DDMenuBtn
          key="back-to-main-menu"
          onClick={backToMainMenu}
          text={"Main Menu"}
          isNavButton={true}
        >
          <FaAngleLeft data-testid="fa-angle-left-icon" />
        </DDMenuBtn>
        <CategoryMenu data={props.allPagesJson} />
      </>
      : <>
        <DDMenuHeader key="main-menu">
          Main Menu
        </DDMenuHeader>
        <DDMenuBtn
          key="browse-by-category"
          onClick={openCategoryMenu}
          text={"Categories"}
          isNavButton={true}
          isIconAfterText={true}
        >
          <FaAngleRight data-testid="fa-angle-right-icon" />
        </DDMenuBtn>
        <MDPageLinks data={props.allMarkdownRemark} collapsed={true} />
      </>
  );
}

export default (props) => {
  const toggleMenu = props.toggleMenu.bind(
    null,
    <MainMenu
      allPagesJson={props.allPagesJson}
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