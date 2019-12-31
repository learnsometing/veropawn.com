// External imports
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";

// Internal imports
import DDMenuBtn from "../dropdown-menu/dd-menu-btn";
import DDMenuHeader from "../dropdown-menu/dd-menu-header";
import CategoryMenuBtns from "./category-menu-btns";
import SubcategoryMenuLinks from "./subcategory-menu-links";

import headerModalMenuStyles from "./header-modal-menu.module.css";

export default (props) => {
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

  let menu;

  if (subcatMenuOpen) {
    menu =
      <>
        <DDMenuBtn key="back-to-categories" onClick={closeSubcatMenu}>
          <FaAngleLeft />
          {"Back"}
        </DDMenuBtn>
        <DDMenuHeader key={subcatMenuHeader}>
          {subcatMenuHeader}
        </DDMenuHeader>
        <SubcategoryMenuLinks nodes={subcatMenuLinks} />
      </>;
  } else {
    menu =
      <>
        <DDMenuBtn key="back-to-main-menu" onClick={props.backToMainMenu} >
          <FaAngleLeft />
          {"Main Menu"}
        </DDMenuBtn>
        <DDMenuHeader key={"categories"}>
          Categories
        </DDMenuHeader>
        <CategoryMenuBtns data={props.data} onClick={openSubcatMenu} />
      </>
  }

  return (
    <ul className={headerModalMenuStyles.uList}>
      {menu}
    </ul>
  );
}