import React from "react";
import PropTypes from "prop-types";
import sizeMe from "react-sizeme";

import "./layout.css";

import Header from "../header/header";
import SEO from "../../components/seo";

const Layout = ({ size, ...props }) => {
  const width = size.width;
  return (
    <div id="root">
      <SEO title={props.title} />
      <Header width={width} />
      <main id="mainContainer">{props.children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default sizeMe()(Layout);
