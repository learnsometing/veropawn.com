// node_modules
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaAngleLeft } from "react-icons/fa";

// components and functions
import { DDMenuBtn, DDMenuLink, DDMenuHeader } from "../dropdown-menu/dd-menu";
import { prettifyCatOrSubcatName } from "../util/text-formatting";

export const sortByButtonText = (ComponentA, ComponentB) => {
  if (typeof ComponentA.props.text !== 'string' || typeof ComponentB.props.text !== 'string') {
    throw new TypeError('Invalid prop `text` supplied to `DDMenuBtn`, expected string');
  }

  if (ComponentA.props.text < ComponentB.props.text) {
    return -1;
  } else if (ComponentA.props.text > ComponentB.props.text) {
    return 1;
  }
  return 0;
}

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
    data.distinct.map(category => {
      let prettyCategory = prettifyCatOrSubcatName(category);

      return (
        <DDMenuBtn
          key={category}
          onClick={onClick.bind(null, prettyCategory, filterNodesByCategory(category))}
          text={prettyCategory}
        />
      );
    }).sort((CompA, CompB) => sortByButtonText(CompA, CompB))
  );
}

CategoryMenuBtns.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func
};

const SubcategoryMenuLinks = ({ nodes }) => {
  return (
    nodes.map(node => {
      const prettySubcategory = prettifyCatOrSubcatName(node.subcategory);
      return (
        <DDMenuLink
          key={node.id}
          link={node.fields.slug}
          text={prettySubcategory}
        />
      );
    }).sort((CompA, CompB) => sortByButtonText(CompA, CompB))
  );
}

SubcategoryMenuLinks.propTypes = {
  nodes: PropTypes.array
};

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