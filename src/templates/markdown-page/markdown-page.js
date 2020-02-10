import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';

import SizedLayout from '../../components/layout/layout';

import markdownPage from './markdown-page.module.css';
import layout from '../../styles/layout.module.css';

export default ({ data: { mdx } }) => {
  var title = mdx.frontmatter.title;
  var headerClassName = `${layout.rowCenterCenter} ${markdownPage.header}`;

  return (
    <SizedLayout title={title}>
      <main id="content">
        <div className={markdownPage.wrapper}>
          <header className={headerClassName}>
            <h1>{title}</h1>
          </header>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      </main>
    </SizedLayout>
  );
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      body
      frontmatter {
        title
      }
      id
    }
  }
`