import React from "react";
import { Link } from "gatsby";

import { DDMenuLink } from "../dropdown-menu/dd-menu";
import headerStyles from "../header/header.module.css";

export const HeaderMenuLink = (props) => (
  <Link className={headerStyles.link} to={props.link}>{props.value}</Link>
);

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