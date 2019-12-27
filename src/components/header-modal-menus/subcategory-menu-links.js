/*
* Subcategory Menu Links
*
* A simple component that returns a menu of links rendered via the links prop.
*/

import React from "react";

import DDMenuLink from "../dropdown-menu/dd-menu-link";

export default ({ nodes }) => {
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