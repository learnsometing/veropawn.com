import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import DDMenuBtn from "./dd-menu-btn"

export default (props) => {
  const { allInvJson } = useStaticQuery(
    graphql`
      query {
        allInvJson(sort: {fields: category}) {
          distinct(field: category)
          nodes{
            category
            subcategory
            slug
          }
        }
      }
    `
  );

  const filterSubcatLinks = (category) => {
    return allInvJson.nodes.filter(node => node.category === category);
  }

  return (
    allInvJson.distinct.map(category => (
      <DDMenuBtn
        children={category}
        onClick={props.onClick.bind(null, filterSubcatLinks(category))}
      />
    ))
  );
};