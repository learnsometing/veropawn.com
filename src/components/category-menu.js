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
import DDMenuHeader from "./dd-menu-header";
import CategoryMenuBtns from "./category-menu-btns";
import SubcategoryMenuLinks from "./subcategory-menu-links";

export default (props) => {
  const [subcatMenuOpen, setSubcatMenuOpen] = useState(false);
  const [subcatMenuHeader, setSubcatMenuHeader] = useState("");
  const [subcatMenuLinks, setSubcatMenuLinks] = useState([]);

  const openSubcatMenu = (header, links) => {
    setSubcatMenuOpen(true);
    setSubcatMenuHeader(header);
    setSubcatMenuLinks(links);
  }

  const closeSubcatMenu = () => {
    setSubcatMenuOpen(false);
    setSubcatMenuHeader('');
    setSubcatMenuLinks([]);
  }

  let children;
  if (subcatMenuOpen) {
    children = <>
      <DDMenuBtn key="back-to-categories" onClick={closeSubcatMenu}>
        <FaAngleLeft />
        {"Back"}
      </DDMenuBtn>
      <DDMenuHeader key={subcatMenuHeader}>
        <span>{subcatMenuHeader}</span>
      </DDMenuHeader>
      <SubcategoryMenuLinks links={subcatMenuLinks} />
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