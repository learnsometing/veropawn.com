import React from "react";
import { graphql, StaticQuery } from "gatsby";

import MenuLink from "./menu-link"

export default () => (
  <StaticQuery
    query={graphql`
      query MarkdownSlugs {
        allMarkdownRemark(sort: {fields: frontmatter___title}){
          edges{
            node{
              frontmatter{
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => (
      <>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <MenuLink link={node.fields.slug} text={node.frontmatter.title} />
        ))}
      </>
    )}
  />
);