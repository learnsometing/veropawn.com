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
  hasPageHeader: PropTypes.bool,
  pageHeaderClass: PropTypes.string,
  pageHeaderText: PropTypes.string,
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

Layout.defaultProps = {
  hasPageHeader: false,
  pageHeaderClass: undefined,
  pageHeaderText: undefined,
};

function SizedLayout(props) {
  var {
    children,
    hasPageHeader,
    pageHeaderClass,
    pageHeaderText,
    title,
    size
  } = props;

  return (
    <Layout
      hasPageHeader={hasPageHeader}
      pageHeaderClass={pageHeaderClass}
      pageHeaderText={pageHeaderText}
      title={title}
      width={size.width}
    >
      {children}
    </Layout>
  );
};

SizedLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  hasPageHeader: PropTypes.bool,
  pageHeaderClass: PropTypes.string,
  pageHeaderText: PropTypes.string,
  title: PropTypes.string.isRequired,
  size: PropTypes.object.isRequired,
};

SizedLayout.defaultProps = {
  hasPageHeader: false,
  pageHeaderClass: undefined,
  pageHeaderText: undefined,
};

export default sizeMe()(SizedLayout);
