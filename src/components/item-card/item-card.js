import React from "react";
import Img from "gatsby-image";
import PropTypes from "prop-types";

import itemCardStyles from "./item-card.module.css";
import { prettifyDescript } from "../util/text-formatting";

const ItemCard = ({ category, item, onClick, photos, subcategory }) => {
  const mainPhoto = photos[0];
  return (
    <li className={itemCardStyles.listItem}>
      <button className={itemCardStyles.itemCard} onClick={onClick.bind(null, photos)}>
        <div className={itemCardStyles.mainPhoto}>
          <Img fluid={mainPhoto.childImageSharp.fluid} />
        </div>
        <div>
          <span className={itemCardStyles.itemDescriptText}>
            {prettifyDescript(item.descript)}
          </span>
        </div>
      </button>
    </li>
  );
}

ItemCard.propTypes = {
  category: PropTypes.string,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  subcategory: PropTypes.string
};

export default ItemCard;