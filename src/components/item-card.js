import React from "react"
import Img from "gatsby-image"
import itemCardStyles from "./item-card.module.css"
export default ({ item }) => (
  <li>
    <div classname={itemCardStyles.itemCard}>
      <h2>
        {item.description}
      </h2>
      {item.photos.map(photo => <Img fluid={photo.childImageSharp.fluid} />)}
    </div>
  </li>
)