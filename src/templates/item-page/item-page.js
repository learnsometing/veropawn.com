import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { MdPhone } from "react-icons/md";

import Layout from "../../components/layout/layout";
import Carousel from "../../components/carousel/carousel";
import styles from "./item-page.module.scss";

export const Detail = ({ name, value, ...props }) => {
  return (
    <li className={styles.deetsLI}>
      <div className={`${styles.row} ${styles.start} ${styles.deet}`}>
        <span className={styles.deetName}>{name}:</span><span>{value}</span>
      </div>
    </li>
  );
};

export const DetailsList = ({ category, details, invNum, model, ...props }) => {
  const {
    action,
    additional,
    ammo,
    brand,
    mass,
    metal,
    serial,
    type,
  } = details;

  const _createBaseList = (brand, model, invNum) => {
    let _brand = brand;
    let _model = model;
    if (brand === '' || brand === null || brand.match(/none/i)) {
      _brand = 'N/A';
    }

    if (model === '' || model === null || model === "None") {
      _model = 'N/A';
    }

    return [
      <Detail key={`${invNum}-invNum`} name={"Inventory #"} value={invNum} />,
      <Detail key={`${invNum}-brand`} name={"Brand"} value={_brand} />,
      <Detail key={`${invNum}-model`} name={"Model"} value={_model} />,
    ];
  };

  const _createTypedList = (category, baseList) => {
    let typedList = [...baseList.values()];

    switch (category) {
      case 'Coin' || 'Collectible':
        break;
      case 'Firearm':
        typedList.push(
          <Detail name={"Ammunition"} value={ammo} />,
          <Detail name={"Action"} value={action} />
        );
        break;
      case 'Jewelry':
        typedList.push(
          <Detail name={"Metal Type"} value={metal} />,
          <Detail name={"Mass"} value={mass} />
        );
        break;
    }
    return typedList;
  };

  let baseList = _createBaseList(brand, model, invNum);
  let list = _createTypedList(category, baseList);

  return (
    <ul className={styles.deetsList}>
      {list}
    </ul>
  );
};

export const DetailsCard = (props) => {
  return (
    <div className={styles.deetsCard}>
      <div className={`${styles.col} ${styles.centered} ${styles.deetsWrapper}`}>
        <header className={styles.deetsHeader}>
          <h2 className={styles.deetsHeading}>
            Details
        </h2>
        </header>
        {props.children}
      </div>
    </div>
  );
};

const ItemPage = ({ data }) => {
  // Unpack the data used on the page
  const { category, subcategory, descript, details, invNum, id, model } = data.item;
  const defaultPhoto = [data.defaultPhoto];
  const photos = data.photos.nodes;

  const title = `${descript}-${id}`
  let carouselPhotos = photos.length ? photos : defaultPhoto;

  return (
    <Layout title={title}>
      <header className={`${styles.col} ${styles.centered} ${styles.header}`}>
        <h1 className={styles.pageHeading}>
          {descript}
        </h1>
      </header>
      <div className={`${styles.content} ${styles.col} ${styles.centered}`}>
        <Carousel alt={descript} photos={carouselPhotos} />
        <div className={`${styles.col} ${styles.detailsColumn}`}>
          <DetailsCard>
            <DetailsList
              category={category}
              details={details}
              invNum={invNum}
              model={model}
            />
          </DetailsCard>
          <div className={`${styles.row} ${styles.start} ${styles.cardCTA}`}>
            <div className={`${styles.row} ${styles.centered} ${styles.telWrapper}`}>
              <span>Interested?</span>
              <span>
                <a className={`${styles.row} ${styles.start} ${styles.tel}`} href="tel:+17722995626">
                  <MdPhone />
                  (772) 299-5626
                </a>
              </span>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
};

ItemPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ItemPage;

export const query = graphql`
  query($regex: String!, $slug: String!) {
                item: itemsJson(fields: {slug: {eq: $slug } }) {
                category
      subcategory
              descript
      details {
                action
        additional
          ammo
          brand
          mass
          metal
          serial
          type
        }
        invNum
        id
        model
      }
      
    photos: allFile(filter: {relativeDirectory: {eq: "items"}, name: {regex: $regex}}) {
                nodes {
                name
        id
        childImageSharp {
                fluid(maxWidth: 4000){
                ...GatsbyImageSharpFluid
              }
              }
            }
          }
        
    defaultPhoto: file(relativePath: {regex: "/0_default/" }) {
                base
      childImageSharp {
                fluid(maxWidth: 4000){
                ...GatsbyImageSharpFluid
              }
              }
            }
        
          }
`