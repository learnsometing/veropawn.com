import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ItemCard from "../components/item-card"

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