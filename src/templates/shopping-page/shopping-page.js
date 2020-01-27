import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import RCPagination from 'rc-pagination';
import sizeMe from 'react-sizeme';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';
import { Layout } from '../../components/layout/layout';
import getPhotosOfItem from '../util/getPhotosOfItem';

import shoppingPage from './shopping-page.module.scss';
import layout from '../../styles/layout.module.css';
import './pagination.scss';

export const ItemCard = ({ item, photo }) => {
  const descript = item.descript;
  const itemCardClass = `${layout.column} ${shoppingPage.itemCard}`;
  const itemDescriptTextClass = `${layout.rowCenterCenter} ${shoppingPage.itemDescriptText}`;

  return (
    <li className={shoppingPage.listItem}>
      <Link className={itemCardClass} to={item.fields.slug}>
        <div className={shoppingPage.mainPhoto}>
          <Img
            alt={`${descript}`}
            fluid={photo.childImageSharp.fluid}
            style={{
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <span className={itemDescriptTextClass} data-testid="item-card-text">
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
  const itemCardsClass = `${layout.rowStartStart} ${shoppingPage.itemsUL}`;

  return (
    <ul className={itemCardsClass}>
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
      header: 'Interested in an item?',
      text: "We're ready to answer your questions.",
      linkText: 'Contact Us',
      link: '/contact/'
    };

    const about = {
      header: 'Did you know?',
      text: 'Your valuables can be used as credit toward any purchase.',
      linkText: 'Learn More',
      link: '/about/'
    };

    return _isCurrentPageEven(currentPage) ? contact : about;
  };

  const CTA = _getCTA(currentPage);
  const CTAContainerClass = `${layout.columnCenterCenter} ${shoppingPage.CTAContainer}`;
  const CTATextClass = `${layout.rowCenterCenter} ${shoppingPage.CTAText}`
  const CTALinkClass = `${layout.rowCenterCenter} ${shoppingPage.CTALink}`;

  return (
    <div className={CTAContainerClass}>
      <div>
        <h2 className={shoppingPage.CTAHeader}>{CTA.header}</h2>
      </div>
      <div>
        <p className={CTATextClass}>{CTA.text}</p>
      </div>
      <Link to={CTA.link} className={CTALinkClass}>{CTA.linkText}</Link>
    </div>
  );
};

CallToAction.propTypes = {
  currentPage: PropTypes.number.isRequired,
};

export const DisplayRange = ({ lowerLimit, numItems, upperLimit }) => {
  var lowerLimitText = setLowerLimitText(lowerLimit);
  var upperLimitText = setUpperLimitText(numItems, upperLimit);
  var text = `Items ${lowerLimitText}-${upperLimitText} of ${numItems}`;
  var displayRangeTextContainerClass = `${layout.rowCenterCenter} ${shoppingPage.displayRangeTextContainer}`;

  return (
    <div className={displayRangeTextContainerClass} >
      {text}
    </div>
  );

  function setUpperLimitText(numItems, upperLimit) {
    let _upperLimit = upperLimit;

    if (upperLimit > numItems) {
      _upperLimit = numItems;
    }

    return _upperLimit.toString();
  }

  function setLowerLimitText(lowerLimit) {
    let _lowerLimit = lowerLimit + 1;
    return _lowerLimit.toString();
  }
};

DisplayRange.propTypes = {
  lowerLimit: PropTypes.number.isRequired,
  numItems: PropTypes.number.isRequired,
  upperLimit: PropTypes.number.isRequired,
};

export const PageHeader = ({ subcategory }) => {
  var pageTitleContainerClass = `${layout.rowCenterCenter} ${shoppingPage.pageTitleContainer}`;

  return (
    <div className={pageTitleContainerClass}>
      <h1 className={shoppingPage.pageTitle}>{subcategory}</h1>
    </div>
  );
};

PageHeader.propTypes = {
  subcategory: PropTypes.string.isRequired,
}

export const PureShoppingPage = (props) => {
  var { allItems, defaultPhoto, allMainPhotos, subcategory, width } = props;
  var numItems = allItems.length;
  var itemsPerPage = 24;

  // TODO: Implement item filtration!
  // var [filteredItems, setFilteredItems] = useState(allItems);
  var [currentPage, setCurrentPage] = useState(1);
  var [upperLimit, setUpperLimit] = useState(calcUpperLimit(itemsPerPage, currentPage));
  var [lowerLimit, setLowerLimit] = useState(calcLowerLimit(itemsPerPage, upperLimit));
  var [itemsOnPage, setItemsOnPage] = useState(allItems.slice(lowerLimit, upperLimit));

  return (
    <>
      <PageHeader
        subcategory={subcategory}
      />
      <DisplayRange
        lowerLimit={lowerLimit}
        numItems={numItems}
        upperLimit={upperLimit}
      />
      <main id="content">
        <ItemCards
          items={itemsOnPage}
          defaultPhoto={defaultPhoto}
          photos={allMainPhotos}
        />
        <CallToAction currentPage={currentPage} />
        <div className={shoppingPage.paginationContainer}>
          <RCPagination
            current={currentPage}
            className={shoppingPage.pagination}
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
      </main>
    </>
  );

  function calcUpperLimit(itemsPerPage, page) {
    return Math.floor(page * itemsPerPage);
  }

  function calcLowerLimit(itemsPerPage, upperLimit) {
    return Math.floor(upperLimit - itemsPerPage);
  }

  function onChange(page) {
    const upperLimit = calcUpperLimit(itemsPerPage, page);
    const lowerLimit = calcLowerLimit(itemsPerPage, upperLimit);
    const itemsOnPage = allItems.slice(lowerLimit, upperLimit);

    setCurrentPage(page);
    setUpperLimit(upperLimit);
    setLowerLimit(lowerLimit);
    setItemsOnPage(itemsOnPage);

    if (typeof window.scrollTo !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
};

PureShoppingPage.propTypes = {
  allItems: PropTypes.array.isRequired,
  allMainPhotos: PropTypes.array.isRequired,
  defaultPhoto: PropTypes.object.isRequired,
  subcategory: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

const ShoppingPage = ({ data, size }) => {
  var allItems = data.inv.nodes;
  // Default photo used throughout the app
  var defaultPhoto = data.defaultPhoto;
  // Every image with '_a' identifier
  var allMainPhotos = data.allMainPhotos.nodes;
  var subcategory = allItems[0].subcategory;
  var width = size.width;
  return (
    <Layout title={subcategory} width={width}>
      <PureShoppingPage
        allItems={allItems}
        allMainPhotos={allMainPhotos}
        defaultPhoto={defaultPhoto}
        subcategory={subcategory}
        width={width}
      />
    </Layout>
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
      sort: {fields: name }){
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