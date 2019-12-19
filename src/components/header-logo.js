/*
*
* Header Logo
*
* A link to the home page that contains the site's SVG logo.
*
*/

import React from "react";
import headerStyles from "./header.module.css";
import { useStaticQuery, graphql } from "gatsby";

import { Link } from "gatsby";

export const PureHeaderLogo = ({ data }) => (
  <Link
    to='/'
    className={headerStyles.link}
  >
    <span className={headerStyles.iconWrapper}>
      <div className={headerStyles.svgWrapper}>
        <img
          className={headerStyles.svg}
          src={data.logo.publicURL}
          alt="Cash Pawn and Jewelry Logo"
        />
      </div>
    </span>
  </Link>
)

export default () => {
  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: file(relativePath: { eq: "logo.svg" }) {
        publicURL
      }
    }
  `);

  return (
    <PureHeaderLogo data={data}></PureHeaderLogo>
  );
}