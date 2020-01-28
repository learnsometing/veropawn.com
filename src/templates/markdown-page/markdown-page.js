import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { graphql } from 'gatsby';

import SizedLayout from '../../components/layout/layout';

import markdownPage from './markdown-page.module.css';
import layout from '../../styles/layout.module.css';

export default ({ data }) => {
  const createHtmlFromMarkup = () => {
    const html = data.markdownRemark.html;
    return ReactHtmlParser(html);
  }
  const title = data.markdownRemark.frontmatter.title;
  var headerClassName = `${layout.rowCenterCenter} ${markdownPage.header}`;

  return (
    <SizedLayout title={title}>
      <main id="content">
        <div className={markdownPage.wrapper}>
          <header className={headerClassName}>
            <h1>{title}</h1>
          </header>
          {createHtmlFromMarkup()}
        </div>
      </main>
    </SizedLayout>
  );
}

export const query = graphql`
  query($id: String) {
    markdownRemark(id: {eq: $id}) {
      frontmatter {
        title
      }
      html
    }
  }
`