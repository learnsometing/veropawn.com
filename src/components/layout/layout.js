import React from "react";
import PropTypes from "prop-types";
import sizeMe from "react-sizeme";
import { Helmet } from 'react-helmet';

import "../../styles/base.css";
import layout from './layout.module.css';
import flex from '../../styles/layout.module.css';

import SEO from "../../components/seo";
import Header from "../header/header";
import Footer from "../footer/footer";

export function PageHeader({ text }) {
  return (
    <header id={layout.pageHeader}>
      <h1 id={layout.heading}>
        {text}
      </h1>
    </header >
  );
}

PageHeader.propTypes = {
  text: PropTypes.string
};

export const Layout = (props) => {
  var {
    children,
    description,
    hasPageHeader,
    pageHeaderText,
    title,
    width
  } = props;

  return (
    <div id={layout.root} className={flex.columnStartCenter}>
      <SEO title={title} description={description} />
      <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display+SC:700&display=swap" rel="stylesheet" />
      </Helmet>
      <Header width={width} />
      {
        hasPageHeader
          ? <PageHeader text={title || pageHeaderText} />
          : null
      }
      <main id={layout.content}>
        {children}
      </main>
      <Footer />
    </div>
  )
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  description: PropTypes.string,
  hasPageHeader: PropTypes.bool,
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
    description,
    hasPageHeader,
    pageHeaderText,
    title,
    size
  } = props;

  return (
    <Layout
      description={description}
      hasPageHeader={hasPageHeader}
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
  description: PropTypes.string,
  hasPageHeader: PropTypes.bool,
  pageHeaderText: PropTypes.string,
  title: PropTypes.string.isRequired,
  size: PropTypes.object.isRequired,
};

SizedLayout.defaultProps = {
  hasPageHeader: false,
  pageHeaderText: undefined,
};

export default sizeMe()(SizedLayout);
