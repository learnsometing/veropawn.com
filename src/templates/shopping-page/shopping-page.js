import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import RCPagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import SizedLayout from '../../components/layout/layout';
import getPhotosOfItem from '../util/getPhotosOfItem';
import PureCallToAction from '../../components/call-to-action/call-to-action';
import 'rc-pagination/assets/index.css';
import shoppingPage from './shopping-page.module.css';
import layout from '../../styles/layout.module.css';
import './pagination.css';

export const ItemCard = ({ item, photo }) => (
  <li className={shoppingPage.listItem}>
    <Link
      className={`${layout.column} ${shoppingPage.itemCard}`}
      to={item.fields.slug}
    >
      <div className={shoppingPage.mainPhoto}>
        <Img
          alt={`${item.descript}`}
          fluid={photo.childImageSharp.fluid}
          style={{
            borderRadius: '4px',
          }}
        />
      </div>
      <div>
        <span
          className={`${layout.rowCenterCenter} ${shoppingPage.itemDescriptText}`}
          data-testid="item-card-text"
        >
          {item.descript}
        </span>
      </div>
    </Link>
  </li>
);

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired,
};

export const ItemCards = ({ items, defaultPhoto, photos }) => {
  var itemCards = createItemCards(items);

  return (
    <ul className={`${layout.rowStartStart} ${shoppingPage.itemsUL}`}>
      {itemCards}
    </ul>
  );

  function createItemCards(items) {
    return items.map(item => {
      let mainPhoto = getPhotosOfItem(defaultPhoto, photos, item.invNum)[0];
      return <ItemCard key={item.id} item={item} photo={mainPhoto} />;
    });
  }
}

ItemCards.propTypes = {
  items: PropTypes.array.isRequired,
  defaultPhoto: PropTypes.object.isRequired,
  photos: PropTypes.array.isRequired,
};

export const DisplayRange = ({ lowerLimit, numItems, upperLimit }) => {
  var lowerLimitText = setLowerLimitText(lowerLimit);
  var upperLimitText = setUpperLimitText(numItems, upperLimit);

  return (
    <div className={`${layout.rowCenterCenter} ${shoppingPage.displayRangeTextContainer}`} >
      {`Items ${lowerLimitText}-${upperLimitText} of ${numItems}`}
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

export function CallToAction({ pageNum }) {
  var CTA = getCTA(pageNum);

  return (
    <PureCallToAction heading={CTA.header} >
      <div>
        <p className={`${layout.rowCenterCenter} ${shoppingPage.CTAText}`}>
          {CTA.text}
        </p>
      </div>
      <Link
        to={CTA.link}
        className={`${layout.rowCenterCenter} ${shoppingPage.CTALink}`}
      >
        {CTA.linkText}
      </Link>
    </PureCallToAction>
  );

  function getCTA(pageNum) {
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

    return pageNum % 2 === 1 ? contact : about;
  }
}

export const PureShoppingPage = (props) => {
  var {
    allItems,
    allMainPhotos,
    defaultPhoto,
    location,
  } = props;

  // TODO: Implement item filtration!
  // click some filter check boxes
  // click apply -> Navigate to a shopping page with filters passed as state in Link
  // apply the filters to allItems
  var filters = getFilters();
  var filteredItems = getFilteredItems();
  var numItems = filteredItems.length;
  var itemsPerPage = 24;
  var pageNum = getPageNum();
  // first and last item numbers on the page
  var upperLimit = calcUpperLimit();
  var lowerLimit = calcLowerLimit();

  return (
    <>
      <DisplayRange
        lowerLimit={lowerLimit}
        numItems={numItems}
        upperLimit={upperLimit}
      />
      <Items />
      <CallToAction pageNum={pageNum} />
    </>
  );

  function calcUpperLimit() {
    return Math.floor(pageNum * itemsPerPage);
  }

  function calcLowerLimit() {
    return Math.floor(upperLimit - itemsPerPage);
  }

  function getPageNum() {
    let pageNum = 1;

    if (location.state && location.state.pageNum) {
      pageNum = location.state.pageNum;
    }

    return pageNum;
  }

  function getFilters() {
    let filters = {};

    if (location.state && location.state.filters) {
      filters = location.state.filters;
    }

    return filters;
  }

  function getFilteredItems() {
    /*
    * Filter structure
    *
    * filters = {
    *   brand: [
    *     'dewalt',
    *     'ryobit'
    *   ],
    *   model: [
    *   ],
    *   ...
    * }
    */

    // return the items sourced from json if no filters applied
    if (Object.entries(filters).length === 0 && filters.constructor === Object) {
      return allItems;
    } else if (location.state && location.state.filteredItems) {
      // return the items held in location.state if they already exist
      return location.state.filteredItems;
    }

    return allItems.filter(item => itemDetailsMatchFilters(item));

    function itemDetailsMatchFilters(item) {
      for (const [key, val] of Object.entries(filters)) {
        if (!val.includes(item.details[key])) {
          return false;
        }
      }
      return true;
    }
  }

  function Items() {
    var itemsOnPage = filteredItems.slice(lowerLimit, upperLimit);
    return (
      <>
        <ItemCards
          items={itemsOnPage}
          defaultPhoto={defaultPhoto}
          photos={allMainPhotos}
        />
        <Pagination />
      </>
    );

    function Pagination() {
      return (
        <div className={shoppingPage.paginationContainer}>
          <RCPagination
            current={pageNum}
            className={shoppingPage.pagination}
            total={numItems}
            defaultPageSize={itemsPerPage}
            itemRender={itemRender}
            hideOnSinglePage={true}
            showPrevNextJumpers={false}
            showLessItems={false}
            locale={localeInfo}
            data-testid="rc-pagination"
          />
        </div>
      );

      function itemRender(current, type, element) {
        let pathName = location.pathname;

        if (type === 'page') {
          return (
            <Link
              to={pathName}
              state={{ pageNum: current, filters, filteredItems }}

            >
              {current}
            </Link>
          );
        } else if (type === 'prev' || type === 'next') {
          return (
            <Link
              to={pathName}
              state={{ pageNum: current, filters, filteredItems }}
            >
            </Link>
          );
        }

        return element;
      }
    }
  }

};

PureShoppingPage.propTypes = {
  allItems: PropTypes.array.isRequired,
  allMainPhotos: PropTypes.array.isRequired,
  defaultPhoto: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const ShoppingPage = ({ data, location }) => {
  var allItems = data.inv.nodes;
  // Default photo used throughout the app
  var defaultPhoto = data.defaultPhoto;
  // Every image with '_a' identifier
  var allMainPhotos = data.allMainPhotos.nodes;
  var subcategory = allItems[0].subcategory;
  return (
    <SizedLayout
      description={`Cash Pawn & Jewelry ${subcategory.toLowerCase()} shopping page.`}
      hasPageHeader={true}
      pageHeaderClass={`${layout.rowCenterCenter} ${shoppingPage.pageTitleContainer}`}
      title={subcategory}
    >
      <PureShoppingPage
        allItems={allItems}
        allMainPhotos={allMainPhotos}
        defaultPhoto={defaultPhoto}
        location={location}
      />
    </SizedLayout>
  );
};

ShoppingPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default ShoppingPage;

export const query = graphql`
  query($photoNames: [String!], $slug: String!) {

    inv: allItemsJson(filter: {fields: {slug: {regex: $slug } } }, sort: {fields: invNum, }){
      nodes {
        descript
        details {
          action
          ammo
          mass
          brand
          metal
        } 
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
          ...GatsbyImageSharpFluid
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