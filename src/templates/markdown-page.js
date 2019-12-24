import React from "react";
import ReactHtmlParser from "react-html-parser";
import { graphql } from "gatsby";

import Layout from "../components/layout/layout";

export default ({ data }) => {
  const createHtmlFromMarkup = () => {
    const html = data.markdownRemark.html;
    return ReactHtmlParser(html);
  }

  return (
    <Layout>
      <div>
        {createHtmlFromMarkup()}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($id: String) {
    markdownRemark(id: {eq: $id}) {
      html
    }
  }
`