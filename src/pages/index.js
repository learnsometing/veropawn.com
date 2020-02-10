import React from 'react';
import { graphql } from 'gatsby';
import SizedLayout from '../components/layout/layout';
import SEO from '../components/seo';
import FullScreenCarousel from '../components/carousel/full-screen-carousel';
import FeaturedCategories from '../components/featured-categories/featured-categories';
import './index.css';
import { createSlideContent } from '../helpers/slides';

const IndexPage = ({ data }) => {
  var content = data.carousel.nodes.map(node => {
    return createSlideContent(node);
  });

  return (
    <SizedLayout title={'Home'}>
      <SEO title='Home' />
      <main id='content'>
        <FullScreenCarousel
          content={content}
          currentSlideStyle={{ minWidth: '60%' }}
          isTimed={true}
          slideStyle={{ minWidth: '50%' }}
        />
        <FeaturedCategories data={data.featuredCategories} />
      </main>
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
          title
          featuredImage {
            childImageSharp{
              fluid(maxWidth: 1024){
                ...GatsbyImageSharpFluid
              }
            }
            id
            name
          }
        }
        html
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
      sort: {fields: frontmatter___title}) {
      nodes {
        frontmatter {
          backgroundImage {
            publicURL
          }
        }
        htmlAst
        id
      }
    }

  }
`