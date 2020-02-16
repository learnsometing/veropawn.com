import React from "react";
import PropTypes from "prop-types";
import sizeMe from "react-sizeme";

import "../../styles/base.css";
import "./layout.css";

import SEO from "../../components/seo";
import Header from "../header/header";
import Footer from "../footer/footer";

export const Layout = ({ width, ...props }) => {
  return (
    <div id="root">
      <SEO title={props.title} />
      <Header width={width} />
      {props.children}
      <Footer />
    </div>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
};

const SizedLayout = ({ size, ...props }) => (
  <Layout title={props.title} width={size.width}>
    {props.children}
  </Layout>
);

export default sizeMe()(SizedLayout);
