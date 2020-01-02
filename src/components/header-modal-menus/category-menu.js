/*
* Category Menu
*
* A dropdown menu that exposes the categories of items in the pawn shop's
* inventory to the user.
*/

// External imports
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";

// Internal imports
import DDMenuBtn from "../dropdown-menu/dd-menu-btn";
import DDMenuHeader from "../dropdown-menu/dd-menu-header";
import CategoryMenuBtns from "./category-menu-btns";
import SubcategoryMenuLinks from "./subcategory-menu-links";

export default ({ data, ...props }) => {
  const [subcatMenuOpen, setSubcatMenuOpen] = useState(false);
  const [subcatMenuHeader, setSubcatMenuHeader] = useState('');
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

  return (
    subcatMenuOpen
      ?
      <>
        <DDMenuBtn key="back-to-categories" onClick={closeSubcatMenu}>
          <FaAngleLeft />
          {"Categories"}
        </DDMenuBtn>
        <DDMenuHeader key={subcatMenuHeader}>
          {subcatMenuHeader}
        </DDMenuHeader>
        <SubcategoryMenuLinks nodes={subcatMenuLinks} />
      </>
      :
      <>
        <DDMenuHeader key={"categories"}>
          Categories
        </DDMenuHeader>
        <CategoryMenuBtns data={data} onClick={openSubcatMenu} />
      </>
  );
}