import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";

import MenuItem from "./menu-item"

export default () => (
  <StaticQuery
    query={graphql`
      query MarkdownSlugs {
        allMarkdownRemark{
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
          <MenuItem child={
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          } />
        ))}
      </>
    )}
  />
);