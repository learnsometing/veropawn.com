/*
* Browse by Category Menu
*
* A dropdown menu that exposes the categories of items in the pawn shop's inventory
* to the user.
*/

// External imports
import React, { useState } from "react"
import { FaAngleLeft } from "react-icons/fa"

// Internal imports
import ddMenuStyles from "./dropdown-menu.module.css"
import DDMenuLink from "./dd-menu-link"
import DDMenuBtn from "./dd-menu-btn"
import BrowseByCategoryBtns from "./browse-category-menu-btns"

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
      <DDMenuBtn
        children={
          <>
            <FaAngleLeft />
            {"Back"}
          </>
        }
        key="browse-categories"
        onClick={closeSubcatMenu}
      />
      {subcatMenuLinks.map(node => (
        <DDMenuLink
          key={node.id}
          link={node.slug}
          value={node.subcategory}
        />
      ))}
    </>
  } else {
    children = <>
      <DDMenuBtn
        children={
          <>
            <FaAngleLeft />
            {"Main Menu"}
          </>
        }
        onClick={props.backToMainMenu}
      />
      <BrowseByCategoryBtns onClick={openSubcatMenu} />
    </>;
  }

  return (
    <ul className={ddMenuStyles.ulist}>
      {children}
    </ul>
  );
}