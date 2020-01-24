import React from "react";
import ReactHtmlParser from "react-html-parser";
import { graphql } from "gatsby";

import SizedLayout from "../components/layout/layout";

export default ({ data }) => {
  const createHtmlFromMarkup = () => {
    const html = data.markdownRemark.html;
    return ReactHtmlParser(html);
  }
  const title = data.markdownRemark.frontmatter.title;
  return (
    <SizedLayout title={title}>
      <main id="content">
        {createHtmlFromMarkup()}
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