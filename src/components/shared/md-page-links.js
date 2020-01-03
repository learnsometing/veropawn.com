import React from "react";

import DDMenuLink from "../dropdown-menu/dd-menu-link"
import HeaderMenuLink from "../header/header-menu-link"

export default ({ data, collapsed }) => {
  let LinkType = HeaderMenuLink;

  if (collapsed) {
    LinkType = DDMenuLink;
  }

  return (
    <>
      {data.nodes.map(node => (
        <LinkType
          key={node.id}
          link={node.fields.slug}
          value={node.frontmatter.title}
        />
      ))}
    </>
  );
}