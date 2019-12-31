/*
* Category Menu Buttons
*
* Returns a list of buttons that each have a category name as text.
* 
* When clicked, each button should render a list of links to the category's
* subcategory pages.
*/

import React from "react";

import DDMenuBtn from "../dropdown-menu/dd-menu-btn";

export default ({ data, onClick }) => {
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