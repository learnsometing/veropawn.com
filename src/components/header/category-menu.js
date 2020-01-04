// External imports
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";

// Internal imports
import { DDMenuBtn, DDMenuLink, DDMenuHeader } from "../dropdown-menu/dd-menu";

const CategoryMenuBtns = ({ data, onClick }) => {
  /*
  * Returns a list of buttons that each have a category name as text.
  * 
  * When clicked, each button should render a list of links to the category's
  * subcategory pages.
  */

  const filterNodesByCategory = (category) => {
    return data.nodes.filter(node => node.category === category);
  }

  return (
    data.distinct.map(category => (
      <DDMenuBtn
        children={category}
        key={category}
        onClick={onClick.bind(null, category, filterNodesByCategory(category))}
      />
    ))
  );
}

const SubcategoryMenuLinks = ({ nodes }) => {
  return (
    nodes.map(node => (
      <DDMenuLink
        key={node.id}
        link={node.slug}
        value={node.subcategory}
      />
    ))
  );
}

export default ({ data, ...props }) => {
  /*
  * Category Menu
  *
  * A dropdown menu that exposes the categories of items in the pawn shop's
  * inventory to the user.
  */

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
          <FaAngleLeft data-testid="angle-left-icon" />
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