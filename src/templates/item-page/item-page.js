import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { IconContext } from "react-icons";
import { MdPhone } from "react-icons/md";
import sizeMe from "react-sizeme";
import Obfuscate from 'react-obfuscate';

import { Layout } from "../../components/layout/layout";
import { DetailsCard, DetailsList } from "./details";
import FullScreenCarousel from "../../components/carousel/full-screen-carousel";
import CallToAction from '../../components/call-to-action/call-to-action';
import itemPage from "./item-page.module.css";
import layout from "../../styles/layout.module.css";
import { createContentFromSharp } from "../../helpers/slides";

const ItemPage = ({ data, size }) => {
  // Unpack the data used on the page
  var { category, descript, details, invNum, id, model } = data.item;
  var defaultPhoto = [data.defaultPhoto];
  var photos = data.photos.nodes.length
    ? data.photos.nodes
    : defaultPhoto;
  var content = photos.map((photo, idx) => (
    createContentFromSharp(descript, idx, photo)
  ));

  return (
    <Layout
      hasPageHeader={true}
      pageHeaderClass={`${layout.columnCenterCenter} ${itemPage.header}`}
      pageHeaderText={descript}
      title={`${descript} #${invNum}`}
      width={size.width}
    >
      <div className={`${layout.columnCenterCenter} ${itemPage.wrapper}`}>
        <FullScreenCarousel content={content} />
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
      <CallToAction heading={'Interested?'} >
        <div className={itemPage.CTAText}>
          Give us a call.
        </div>
        <div>
          <Obfuscate
            className={`${layout.rowStartCenter} ${itemPage.tel}`}
            obfuscateChildren={false}
            tel="17722995626"
          >
            <IconContext.Provider value={{ size: '1.25em' }}>
              <MdPhone />
            </IconContext.Provider>
            <span className={itemPage.telNumber}>(772) 299-5626</span>
          </Obfuscate>
        </div>
      </CallToAction>
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
      id
    }

  }
`