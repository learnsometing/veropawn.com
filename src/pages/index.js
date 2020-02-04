import React from "react";
import { graphql } from 'gatsby';

import SizedLayout from "../components/layout/layout";
import SEO from "../components/seo";
import TimedCarousel from '../components/carousel/timed-carousel';

const IndexPage = ({ data }) => {
  var content = data.content.nodes.map(node => {
    return {
      alt: node.frontmatter.featuredImage.name,
      html: node.html,
      photo: node.frontmatter.featuredImage,
      title: node.frontmatter.title,
    }
  });

  return (
    <SizedLayout title={"Home"}>
      <SEO title="Home" />
      <main id="content">
        <TimedCarousel
          content={content}
        />
      </main>
    </SizedLayout>
  );
}

export default IndexPage;

export var query = graphql`
  query {
    content: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/index/"}},
      sort: {fields: fileAbsolutePath}
    ) {
      nodes {
        frontmatter {
          title
          featuredImage {
            childImageSharp{
              fluid(maxWidth: 1024){
                ...GatsbyImageSharpFluid
              }
            }
            name
          }
        }
        html
      }
    }

  }
`