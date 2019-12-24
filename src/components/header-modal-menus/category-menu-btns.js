import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import DDMenuBtn from "../dropdown-menu/dd-menu-btn"

export default (props) => {
  const { allInvJson } = useStaticQuery(
    graphql`
      query {
        allInvJson(sort: {fields: category}) {
          distinct(field: category)
          nodes{
            category
            id
            subcategory
            slug
          }
        }
      }
    `
  );

  const filterNodesByCategory = (category) => {
    return allInvJson.nodes.filter(node => node.category === category);
  }

  return (
    allInvJson.distinct.map(category => (
      <DDMenuBtn
        children={category}
        key={category}
        onClick={props.onClick.bind(null, category, filterNodesByCategory(category))}
      />
    ))
  );
};