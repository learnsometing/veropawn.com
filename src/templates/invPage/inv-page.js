import React from "react";
import { graphql } from "gatsby";

import SEO from "../../components/seo";
import Layout from "../../components/layout/layout";
import ItemCard from "../../components/item-card/item-card";
import { prettifyCatOrSubcatName } from "../../components/util/text-formatting";
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
  const category = data.inv.category;
  const subcategory = data.inv.subcategory;
  const prettySubcategory = prettifyCatOrSubcatName(subcategory);
  const items = data.inv.items;
  // Default photo used throughout the app
  const defaultPhoto = data.defaultPhoto;
  // Every node sourced from allImageSharp
  const allPhotoNodes = data.allPhotos.nodes;

  const itemCards = items.map((item, index) => {
    let photos = getPhotosOfItem(allPhotoNodes, item.invNum);
    if (!photos.length) { photos = [defaultPhoto] }
    return (
      <ItemCard
        category={category}
        key={index}
        item={item}
        photos={photos}
        subcategory={subcategory}
      />
    );
  });

  return (
    <Layout>
      <SEO title={prettySubcategory} />
      <ul className={invPageStyles.itemsUL}>
        {itemCards}
      </ul>
    </Layout>
  );
}

export const query = graphql`
  query($category: String!, $subcategory: String!) {
    inv: invJson(category: {eq: $category }, subcategory: {eq: $subcategory}) {
      category
      subcategory
      items {
        descript
        descript2
        invNum
        modelNum
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
      extension: {regex: "/jpeg/"},
      relativeDirectory: {eq: "items"},
      base: {ne: "0_default.jpeg"}
    }, 
    sort: {fields: base}) {
      nodes {
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
    }
  }
`