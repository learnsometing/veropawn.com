import React from "react";
import { graphql } from "gatsby";

import SEO from "../../components/seo";
import Layout from "../../components/layout/layout";
import ItemCard from "../../components/item-card/item-card";
import invPageStyles from "./inv-page.module.css";

export const getPhotosOfItem = (photoNodes, invNum) => {
  // Return the photos that include invNum in their name.

  return photoNodes.filter(node => {
    // remove the extension from the file name
    const imgNameWithOrderIndicator = node.base.split('.')[0];
    // remove the image order indicator from the file name
    const imgNameNoOrderIndicator = imgNameWithOrderIndicator.split('_')[0];

    return imgNameNoOrderIndicator.match(new RegExp(`^${invNum}$`));
  });
}

export default ({ data }) => {
  // Inventory data from the current page
  const subcategory = data.inv.nodes[0].subcategory;
  // Default photo used throughout the app
  const defaultPhoto = data.defaultPhoto;
  // Every node sourced from allImageSharp
  const allPhotoNodes = data.allPhotos.nodes;

  const itemCards = data.inv.nodes.map(node => {
    let photos = getPhotosOfItem(allPhotoNodes, node.invNum);
    if (!photos.length) { photos = [defaultPhoto] }
    return (
      <ItemCard
        key={node.id}
        item={node}
        photos={photos}
      />
    );
  });

  return (
    <Layout>
      <SEO title={subcategory} />
      <ul className={invPageStyles.itemsUL}>
        {itemCards}
      </ul>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    inv: allItemsJson(filter: {fields: {slug: {regex: $slug}}}, , sort: {fields: invNum,}) {
        nodes {
          descript
          fields {
            slug
          }
          id
          subcategory
        }
      }

  defaultPhoto: file(relativePath: {regex: "/0_default/"}) {
    base
    childImageSharp {
      fluid {
        aspectRatio
        base64
        sizes
        src
        srcSet
      }
    }
  }
  
  allPhotos: allFile(
    filter: {
      extension: { regex: "/jpeg/" },
      relativeDirectory: { eq: "items" },
      base: { ne: "0_default.jpeg" }
    },
    sort: { fields: base }
  ){
    nodes {
      base
      childImageSharp {
        fluid(maxWidth: 1024){
          ...GatsbyImageSharpFluid
        }
      }
      id
    }
  }
}
`;