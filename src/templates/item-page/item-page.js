import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { IconContext } from "react-icons";
import { MdPhone } from "react-icons/md";
import sizeMe from "react-sizeme";

import { Layout } from "../../components/layout/layout";
import { DetailsCard, DetailsList } from "./details";
import Carousel from "../../components/carousel/carousel";
import FullScreenCarousel from "./full-screen-carousel";

import itemPage from "./item-page.module.scss";
import layout from "../../styles/layout.module.css";
import createContentObj from "../../helpers/createContentObj";

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
            <IconContext.Provider value={{ size: '1.25em' }}>
              <MdPhone />
            </IconContext.Provider>
            <span className={itemPage.telNumber}>(772) 299-5626</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const ResponsiveCarousel = ({ content, size }) => {
  var [carouselIndex, setCarouselIndex] = useState(0);

  if (size.width >= 736 && size.height >= 375) {
    return (
      <FullScreenCarousel
        content={content}
        onIndexChange={setCarouselIndex}
        startIndex={carouselIndex}
      />
    );
  }
  return (
    <Carousel
      content={content}
      onIndexChange={setCarouselIndex}
      startIndex={carouselIndex}
    />
  );
};

const ItemPage = ({ data, size }) => {
  // Unpack the data used on the page
  var { category, descript, details, invNum, id, model } = data.item;
  var defaultPhoto = [data.defaultPhoto];
  var photos = data.photos.nodes.length
    ? data.photos.nodes
    : defaultPhoto;
  var content = createContentObj(descript, photos);

  const title = `${descript}-${invNum}`;
  const wrapperClass = `${layout.columnCenterCenter} ${itemPage.wrapper}`;

  return (
    <Layout title={title} width={size.width}>
      <main id="content">
        <PageHeader descript={descript} />
        <div className={wrapperClass}>
          <ResponsiveCarousel
            content={content}
            size={size}
          />
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
        <InterestedCTA />
      </main>
    </Layout>
  );

};

ItemPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default sizeMe({ monitorHeight: true })(ItemPage);

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

    photos: allFile(
      filter: {relativeDirectory: {eq: "items"}, name: {regex: $regex}},
      sort: {fields: name }) {
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