import React from "react";
import PropTypes from "prop-types";

import "./layout.css";

import Header from "../header/header";

const Layout = (props) => {
  return (
    <div id="root">
      {/* <SEO title={subcategory} /> */}
      <Header />
      <main id="mainContainer">{props.children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
