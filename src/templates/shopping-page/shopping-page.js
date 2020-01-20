import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import RCPagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';
import sizeMe from "react-sizeme";

import SEO from "../../components/seo";
import Header from "../../components/header/header";
import getPhotosOfItem from "../util/getPhotosOfItem";
import "../../components/layout/layout.css";
import styles from "./shopping-page.module.scss";

export const ItemCard = ({ item, photo }) => {
  const descript = item.descript;
  return (
    <li className={styles.listItem}>
      <Link className={styles.itemCard} to={item.fields.slug}>
        <div className={styles.mainPhoto}>
          <Img
            alt={`${descript}`}
            fluid={photo.childImageSharp.fluid}
            style={{
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <span className={styles.itemDescriptText}>
            {item.descript}
          </span>
        </div>
      </Link>
    </li>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired,
};

export const ItemCards = ({ items, defaultPhoto, photos, ...props }) => {
  const _createItemCards = items => {
    return items.map(item => {
      let mainPhoto = getPhotosOfItem(defaultPhoto, photos, item.invNum)[0];
      return <ItemCard key={item.id} item={item} photo={mainPhoto} />;
    });
  };

  const itemCards = _createItemCards(items);

  return (
    <ul className={styles.itemsUL}>
      {itemCards}
    </ul>
  );
}

ItemCards.propTypes = {
  items: PropTypes.array.isRequired,
  defaultPhoto: PropTypes.object.isRequired,
  photos: PropTypes.array.isRequired,
};

export const CallToAction = ({ currentPage, ...props }) => {
  const _isCurrentPageEven = currentPage => {
    return currentPage % 2 === 1;
  };

  const _getCTA = currentPage => {
    const contact = {
      header: "Interested in an item?",
      text: "We're ready to answer your questions.",
      linkText: "Contact Us",
      link: "/contact/"
    };

    const about = {
      header: "Did you know?",
      text: "Your valuables can be used as credit towards any purchase.",
      linkText: "Learn More",
      link: "/about/"
    };

    return _isCurrentPageEven(currentPage) ? contact : about;
  };

  const CTA = _getCTA(currentPage);

  return (
    <div className={styles.CTAContainer}>
      <div>
        <h2 className={styles.CTAHeader}>{CTA.header}</h2>
      </div>
      <div>
        <p>{CTA.text}</p>
      </div>
      <Link to={CTA.link} className={styles.CTALink}>{CTA.linkText}</Link>
    </div>
  );
};

CallToAction.propTypes = {
  currentPage: PropTypes.number.isRequired,
};

const _setUpperLimitText = (upperLimit, numItems) => {
  let _upperLimit = upperLimit > numItems ? numItems : upperLimit;
  return _upperLimit.toString();
};

export const Pagination = ({ items, setDisplayRangeText, setItemsOnPage, width, ...props }) => {
  const numItems = items.length;
  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(1);

  const _calcLimits = (page, itemsPerPage) => {
    const _calcUpperLimit = (_page, _itemsPerPage) => {
      return Math.ceil(_page * _itemsPerPage);
    };

    const _calcLowerLimit = (_upperLimit, _itemsPerPage) => {
      return Math.ceil(_upperLimit - _itemsPerPage);
    };

    const upperLimit = _calcUpperLimit(page, itemsPerPage);
    const lowerLimit = _calcLowerLimit(upperLimit, itemsPerPage);

    return [lowerLimit, upperLimit];
  };

  const _setLimitsText = (lowerLimit, upperLimit, numItems) => {
    const _setLowerLimitText = (lowerLimit) => {
      return lowerLimit + 1;
    };

    const upperLimitText = _setUpperLimitText(upperLimit, numItems);
    const lowerLimitText = _setLowerLimitText(lowerLimit);

    return [lowerLimitText, upperLimitText]
  };

  const onChange = page => {
    setCurrentPage(page);

    const [lowerLimit, upperLimit] = _calcLimits(page, itemsPerPage);

    setItemsOnPage(items.slice(lowerLimit, upperLimit));

    const [lowerLimitText, upperLimitText] = _setLimitsText(lowerLimit, upperLimit, numItems);

    setDisplayRangeText(`Items ${lowerLimitText}-${upperLimitText} of ${numItems}`)

    if (typeof window.scrollTo !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <CallToAction currentPage={currentPage} />
      <div className={styles.paginationContainer}>
        <RCPagination
          current={currentPage}
          className={styles.pagination}
          total={numItems}
          defaultPageSize={24}
          onChange={onChange}
          hideOnSinglePage={true}
          showPrevNextJumpers={false}
          showLessItems={width < 568 ? true : false}
          locale={localeInfo}
          data-testid="rc-pagination"
        />
      </div>
    </>
  );
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  setDisplayRangeText: PropTypes.func.isRequired,
  setItemsOnPage: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
};

export const FilterBar = ({ displayRangeText, subcategory }) => {
  return (
    <>
      <div className={styles.pageTitleContainer}>
        <h1 className={styles.pageTitle}>{subcategory}</h1>
      </div>
      <div className={styles.displayRangeTextContainer} >
        {displayRangeText}
      </div>
    </>
  );
};

FilterBar.propTypes = {
  displayRangeText: PropTypes.string.isRequired,
  subcategory: PropTypes.string.isRequired,
};

export const PureShoppingPage = ({ allItems, defaultPhoto, allMainPhotos, subcategory, width, ...props }) => {
  const numItems = allItems.length;
  const initialItemsOnPage = allItems.slice(0, 24);
  const initialUpperLimit = _setUpperLimitText(24, numItems);
  const [filteredItems, setFilteredItems] = useState(allItems);
  const [itemsOnPage, setItemsOnPage] = useState(initialItemsOnPage);
  const [displayRangeText, setDisplayRangeText] = useState(`Items 1-${initialUpperLimit} of ${numItems}`);

  return (
    <>
      <FilterBar
        displayRangeText={displayRangeText}
        subcategory={subcategory}
      />
      <main id="mainContainer">
        <ItemCards
          items={itemsOnPage}
          defaultPhoto={defaultPhoto}
          photos={allMainPhotos}
        />
        <Pagination
          items={filteredItems}
          setDisplayRangeText={setDisplayRangeText}
          setItemsOnPage={setItemsOnPage}
          width={width}
        />
      </main>
    </>
  );
};

PureShoppingPage.propTypes = {
  allItems: PropTypes.array.isRequired,
  allMainPhotos: PropTypes.array.isRequired,
  defaultPhoto: PropTypes.object.isRequired,
  subcategory: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};

export const ShoppingPage = ({ data, size }) => {
  const allItems = data.inv.nodes;
  // Default photo used throughout the app
  const defaultPhoto = data.defaultPhoto;
  // Every image with '_a' identifier
  const allMainPhotos = data.allMainPhotos.nodes;
  const subcategory = allItems[0].subcategory;
  const width = size.width;

  return (
    <div id="root">
      <SEO title={subcategory} />
      <Header width={width} />
      <PureShoppingPage
        allItems={allItems}
        allMainPhotos={allMainPhotos}
        defaultPhoto={defaultPhoto}
        subcategory={subcategory}
        width={width}
      />
    </div>
  );
};

export default sizeMe()(ShoppingPage);

export const query = graphql`
  query($photoNames: [String!], $slug: String!) {

    inv: allItemsJson(filter: {fields: {slug: {regex: $slug } } }, sort: {fields: invNum, }){
      nodes {
        descript
        fields {
          slug
        }
        id
        invNum
        subcategory
      }
    }

    defaultPhoto: file(relativePath: {regex: "/0_default/" }) {
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

    allMainPhotos: allFile(
      filter: {
        extension: {regex: "/[jpeg png jpg]/" },
        relativeDirectory: {eq: "items" },
        name: {ne: "0_default", in: $photoNames }
      },
      sort: {fields: base }){
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
`;