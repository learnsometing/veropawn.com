import React from "react"
import { graphql } from "gatsby"

import "../components/layout/layout.css";
import Layout from "../components/layout/layout"
import ItemCard from "../components/item-card/item-card"

export default ({ data }) => {
  const items = data.invJson.items

  return (
    <Layout>
      <ul>
        {items.map((item, index) => <ItemCard item={item} key={index}></ItemCard>)}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    invJson(slug: {eq: $slug }) {
      items{
        invnum
        description
        photos {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`