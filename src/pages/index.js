import React from "react";
import { graphql } from 'gatsby';

import SizedLayout from "../components/layout/layout";
import SEO from "../components/seo";
import TimedCarousel from '../components/carousel/timed-carousel';

const IndexPage = ({ data }) => {
  var photos = data.photos.nodes;
  var alts = photos.map(photo => photo.name.split('_')[1]);

  return (
    <SizedLayout title={"Home"}>
      <SEO title="Home" />
      <main id="content">
        <TimedCarousel
          alts={alts}
          photos={photos}
        />
      </main>
    </SizedLayout>
  );
}

export default IndexPage;

export var query = graphql`
  query {
    photos: allFile(
      filter: {
        extension: { regex: "/[jpeg png jpg]/" },
        relativeDirectory: { eq: "index" },
        name: { ne: "0_default" }
      },
      sort: { fields: name }
    ){
      nodes {
        name
        childImageSharp {
          fluid(maxWidth: 1024){
            ...GatsbyImageSharpFluid
          }
        }
        id
      }
    }
  }
`