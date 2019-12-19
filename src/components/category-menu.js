/*
* Browse by Category Menu
*
* A dropdown menu that exposes the categories of items in the pawn shop's inventory
* to the user.
*/

// External imports
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";

// Internal imports
import ddMenuStyles from "./dropdown-menu.module.css";
import DDMenuBtn from "./dd-menu-btn";
import CategoryMenuBtns from "./category-menu-btns";
import SubcategoryMenuBtns from "./subcategory-menu-links";

export default (props) => {
  const [subcatMenuOpen, setSubcatMenuOpen] = useState(false);
  const [subcatMenuLinks, setSubcatMenuLinks] = useState([]);

  const openSubcatMenu = links => {
    setSubcatMenuOpen(true);
    setSubcatMenuLinks(links);
  }

  const closeSubcatMenu = () => {
    setSubcatMenuOpen(false);
    setSubcatMenuLinks([]);
  }

  let children;

  if (subcatMenuOpen) {
    children = <>
      <DDMenuBtn key="back-to-categories" onClick={closeSubcatMenu}>
        <FaAngleLeft />
        {"Back"}
      </DDMenuBtn>
      <SubcategoryMenuBtns links={subcatMenuLinks} />
    </>
  } else if (props.isNested) {
    children = <>
      <DDMenuBtn key="back-to-main-menu" onClick={props.backToMainMenu} >
        <FaAngleLeft />
        {"Main Menu"}
      </DDMenuBtn>
      <CategoryMenuBtns onClick={openSubcatMenu} />
    </>;
  } else {
    children = <CategoryMenuBtns onClick={openSubcatMenu} />;
  }

  return (
    <ul className={ddMenuStyles.ulist}>
      {children}
    </ul>
  );
}