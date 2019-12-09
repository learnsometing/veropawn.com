import React from "react"
import Img from "gatsby-image"

export default ({ item }) => (
  <li>
    <div>
      <h2>
        {item.description}
      </h2>
      {item.photos.map(photo => <Img fluid={photo.childImageSharp.fluid} />)}
    </div>
  </li>
)