import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import DDMenuLink from "../dropdown-menu/dd-menu-link"
import HeaderMenuLink from "../header/header-menu-link"

export const PureMDPageLinks = ({ allMarkdownRemark, collapsed }) => {
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

export default ({ collapsed }) => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
      query MarkdownSlugs {
        allMarkdownRemark(sort: {fields: frontmatter___title}){
          nodes{
            id
            frontmatter{
              title
            }
            fields {
              slug
            }
          }
        }
      }
    `
  )

  return <PureMDPageLinks allMarkdownRemark={allMarkdownRemark} collapsed={collapsed} />;
}