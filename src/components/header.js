import { DropdownMenu } from "./dropdown-menu"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header>
    <nav>
      <DropdownMenu />
    </nav>
  </header>
)

// const menuItems = useStaticQuery(graphql`
//   query Q {
//     allInvJson(
//       sort:{
//         fields:[category]
//         order:ASC
//       }
//     ){
//       edges{
//         node{
//           category
//           subcategory
//           slug
//         }
//       }
//     }
//   }
// `)
// const edges = menuItems.allInvJson.edges;
// const nodes = edges.map(edge => {
//   return edge.node;
// })
// const info = nodes.map(node => {
//   return { category: node.category, subcategory: node.subcategory, slug: node.slug }
// })

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
