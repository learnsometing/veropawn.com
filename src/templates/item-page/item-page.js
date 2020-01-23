import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { IconContext } from "react-icons";
import { MdPhone } from "react-icons/md";

import Layout from "../../components/layout/layout";
import Carousel from "../../components/carousel/carousel";

import itemPage from "./item-page.module.scss";
import layout from "../../styles/layout.module.css";

export const Detail = ({ name, value, ...props }) => {
  const detailClass = `${layout.rowStartCenter} ${itemPage.deet}`;
  return (
    <li className={itemPage.deetsLI}>
      <div className={detailClass}>
        <span className={itemPage.deetName}>{name}:</span><span>{value}</span>
      </div>
    </li>
  );
};

Detail.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export const createBaseList = (brand, model, invNum, id) => {
  let _brand = brand;
  let _model = model;
  if (brand === '' || brand === null || brand.match(/none/i)) {
    _brand = 'N/A';
  }

  if (model === '' || model === null || model.match(/none/i)) {
    _model = 'N/A';
  }

  return [
    <Detail key={`${id}-invNum`} name={"Inventory #"} value={invNum} />,
    <Detail key={`${id}-brand`} name={"Brand"} value={_brand} />,
    <Detail key={`${id}-model`} name={"Model"} value={_model} />,
  ];
};

export const createTypedList = (baseList, category, id, action, ammo, mass, metal) => {
  let typedList = [...baseList.values()];

  if (category === 'Firearm') {
    typedList.push(
      <Detail key={`${id}-ammo`} name={"Ammunition"} value={ammo} />,
      <Detail key={`${id}-action`} name={"Action"} value={action} />
    );
  } else if (category === 'Jewelry') {
    typedList.push(
      <Detail key={`${id}-metal`} name={"Metals"} value={metal} />,
      <Detail key={`${id}-mass`} name={"Mass"} value={mass} />
    );
  }

  return typedList;
};

export const DetailsList = ({ category, details, id, invNum, model, ...props }) => {
  const {
    action,
    ammo,
    brand,
    mass,
    metal,
    serial,
  } = details;

  let baseList = createBaseList(brand, model, invNum, id);
  let list = createTypedList(baseList, category, id, action, ammo, mass, metal);

  return (
    <ul className={itemPage.deetsList}>
      {list}
    </ul>
  );
};

DetailsList.propTypes = {
  category: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  invNum: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
};

export const DetailsCard = ({ children, ...props }) => {
  const detailsWrapperClass = `${layout.columnCenterCenter} ${itemPage.deetsWrapper}`;
  const deetsH2Class = `${layout.rowCenterCenter} ${itemPage.deetsH2}`
  return (
    <div className={itemPage.deetsCard}>
      <div className={detailsWrapperClass}>
        <header className={itemPage.deetsHeader}>
          <h2 className={deetsH2Class}>
            Details
        </h2>
        </header>
        {children}
      </div>
    </div>
  );
};

DetailsCard.propTypes = {
  children: PropTypes.object.isRequired,
};

const PageHeader = ({ descript }) => {
  const pageHeaderClass = `${layout.columnCenterCenter} ${itemPage.header}`;
  return (
    <header className={pageHeaderClass}>
      <h1 className={itemPage.pageHeading}>
        {descript}
      </h1>
    </header>
  );
};

PageHeader.propTypes = {
  descript: PropTypes.string.isRequired,
};

const InterestedCTA = () => {
  const interestedCTAClass = `${layout.rowStartCenter} ${itemPage.interestedCTA}`;
  const CTAWrapperClass = `${layout.columnCenterCenter} ${itemPage.CTAWrapper}`;
  const telClass = `${layout.rowStartCenter} ${itemPage.tel}`;
  return (
    <div className={interestedCTAClass}>
      <div className={CTAWrapperClass}>
        <h2 className={itemPage.CTAHeader}>Interested?</h2>
        <div className={itemPage.CTAText}>Give us a call.</div>
        <div>
          <a
            className={telClass}
            href="tel:+17722995626"
          >
            <IconContext.Provider value={{ size: '1.25rem' }}>
              <MdPhone />
            </IconContext.Provider>
            <span className={itemPage.telNumber}>(772) 299-5626</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const ItemPage = ({ data }) => {
  // Unpack the data used on the page
  const { category, descript, details, invNum, id, model } = data.item;
  const defaultPhoto = [data.defaultPhoto];
  const photos = data.photos.nodes;

  const title = `${descript}-${id}`
  let carouselPhotos = photos.length ? photos : defaultPhoto;

  const detailsColumnClass = `${layout.column} ${itemPage.deetsColumn}`;
  const wrapperClass = `${layout.columnCenterCenter} ${itemPage.wrapper}`;
  return (
    <Layout title={title}>
      <main id="content">
        <PageHeader descript={descript} />
        <div className={wrapperClass}>
          <Carousel alt={descript} photos={carouselPhotos} />
          <div className={detailsColumnClass}>
            <DetailsCard>
              <DetailsList
                category={category}
                details={details}
                id={id}
                invNum={invNum}
                model={model}
              />
            </DetailsCard>
          </div>
        </div>
        <InterestedCTA />
      </main>
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
      descript
      details {
        action
        ammo
        brand
        mass
        metal
        serial
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