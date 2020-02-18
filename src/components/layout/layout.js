import React from "react";
import PropTypes from "prop-types";
import sizeMe from "react-sizeme";

import "../../styles/base.css";
import "./layout.css";

import SEO from "../../components/seo";
import Header from "../header/header";
import Footer from "../footer/footer";

export function PageHeader({ className, text }) {
  return (
    <header className={className}>
      <h1 style={{ lineHeight: '1.25', marginTop: '1.45rem', textAlign: "center" }}>
        {text}
      </h1>
    </header >
  );
}

PageHeader.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string
};

export const Layout = (props) => {
  var {
    children,
    hasPageHeader,
    pageHeaderClass,
    pageHeaderText,
    title,
    width
  } = props;

  return (
    <div id="root">
      <SEO title={title} />
      <Header width={width} />
      {
        hasPageHeader
          ? <PageHeader className={pageHeaderClass} text={title || pageHeaderText} />
          : null
      }
      {children}
      <Footer />
    </div>
  )
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  title: PropTypes.string.isRequired,
  hasPageHeader: PropTypes.bool,
  width: PropTypes.number.isRequired,
};

const SizedLayout = ({ children, title, size }) => (
  <Layout title={title} width={size.width}>
    {children}
  </Layout>
);

export default sizeMe()(SizedLayout);
