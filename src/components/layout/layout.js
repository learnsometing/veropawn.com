import React from "react";
import PropTypes from "prop-types";
import sizeMe from "react-sizeme";

import "../../styles/base.scss";
import "./layout.css";

import SEO from "../../components/seo";
import Header from "../header/header";
import Footer from "../footer/footer";

const Layout = ({ size, ...props }) => {
  const width = size.width;
  return (
    <div id="root">
      <SEO title={props.title} />
      <Header width={width} />
      {props.children}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default sizeMe()(Layout);
