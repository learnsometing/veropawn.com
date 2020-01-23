import React from "react";
import { Link } from "gatsby";

import { DDMenuLink } from "./dd-menu";
import header from "../header/header.module.scss";
import layout from "../../styles/layout.module.css";

export const HeaderMenuLink = (props) => {
  const linkClass = `${layout.rowCenterCenter} ${header.link}`
  return (
    <Link className={linkClass} to={props.link}>{props.text}</Link>
  );
};

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
          text={node.frontmatter.title}
        />
      ))}
    </>
  );
}