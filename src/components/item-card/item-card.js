import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import Img from "gatsby-image";

import itemCardStyles from "./item-card.module.css";

const ItemCard = ({ item, photos }) => {
  const descript = item.descript;
  const mainPhoto = photos[0];
  return (
    <li className={itemCardStyles.listItem}>
      <Link className={itemCardStyles.itemCard} to={item.fields.slug}>
        <div className={itemCardStyles.mainPhoto}>
          <Img
            alt={`${descript}`}
            fluid={mainPhoto.childImageSharp.fluid}
            style={{
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <span className={itemCardStyles.itemDescriptText}>
            {item.descript}
          </span>
        </div>
      </Link>
    </li>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  photos: PropTypes.array.isRequired,
};

export default ItemCard;