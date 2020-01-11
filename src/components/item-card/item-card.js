import React from "react";
import Img from "gatsby-image";

import itemCardStyles from "./item-card.module.css";
import { toTitleCase } from "../util/text-formatting";

export default ({ category, item, photos, subcategory }) => {
  const mainPhoto = photos[0];

  return (
    <li>
      <div className={itemCardStyles.itemCard}>
        <div className={itemCardStyles.mainPhotoContainer}>
          <Img fluid={mainPhoto.childImageSharp.fluid} />
        </div>
        <span>
          <h2>
            {toTitleCase(item.descript)}
          </h2>
        </span>
        <span>
          <button>
            View Details
        </button>
        </span>
      </div>
    </li>
  );
}