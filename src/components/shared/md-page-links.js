import React from "react";

import DDMenuLink from "../dropdown-menu/dd-menu-link"
import HeaderMenuLink from "../header/header-menu-link"

export default ({ allMarkdownRemark, collapsed }) => {
  let markdownPageLinks;

  if (collapsed) {
    markdownPageLinks = allMarkdownRemark.nodes.map(node => (
      <DDMenuLink
        key={node.id}
        link={node.fields.slug}
        value={node.frontmatter.title}
      />
    ));
  } else {
    markdownPageLinks = allMarkdownRemark.nodes.map(node => (
      <HeaderMenuLink
        key={node.id}
        link={node.fields.slug}
        value={node.frontmatter.title}
      />
    ));
  }

  return <>{markdownPageLinks}</>;
}