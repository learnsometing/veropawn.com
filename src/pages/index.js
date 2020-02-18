import React from 'react';
import { graphql } from 'gatsby';
import SizedLayout from '../components/layout/layout';
import FullScreenCarousel from '../components/carousel/full-screen-carousel';
import FeaturedCategories from '../components/featured-categories/featured-categories';
import './index.css';
import { createContentFromMarkdown } from '../helpers/slides';

const IndexPage = ({ data }) => {
  var content = data.carousel.nodes.map(node => {
    return createContentFromMarkdown(node);
  });

  return (
    <SizedLayout title={'Home'}>
      <FullScreenCarousel
        content={content}
        currentSlideStyle={{ minWidth: '60%' }}
        isTimed={true}
        slideStyle={{ minWidth: '50%' }}
      />
      <FeaturedCategories data={data.featuredCategories} />
    </SizedLayout>
  );
}

export default IndexPage;

export var query = graphql`
  query {
    carousel: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/index/"}},
      sort: {fields: fileAbsolutePath}
    ) {
      nodes {
        frontmatter {
          featuredImage {
            childImageSharp{
              fluid(maxWidth: 1024){
                ...GatsbyImageSharpFluid
              }
            }
            id
            name
          }
          linkText
          text
          title
          to
        }
      }
    }

    featuredCategories: allMarkdownRemark(
      filter: {
        frontmatter: {
          backgroundImage: {
            relativeDirectory: {eq: "featured-categories"}
          }
        }
      }, 
      sort: {fields: frontmatter___linkText}) {
      nodes {
        frontmatter {
          backgroundImage {
            publicURL
          }
          linkText
          to
        }
        id
      }
    }

  }
`