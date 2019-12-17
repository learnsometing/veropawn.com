import React from "react";
import { graphql, StaticQuery } from "gatsby";

import DDMenuLink from "./dd-menu-link"

export default () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => (
      <>
        {data.allMarkdownRemark.nodes.map(node => (
          <DDMenuLink
            key={node.id}
            link={node.fields.slug}
            value={node.frontmatter.title}
          />
        ))}
      </>
    )}
  />
);