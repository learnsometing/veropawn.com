import { DropdownMenu } from "./dropdown-menu"
import { HeaderLogo } from "./header-logo"
import headerStyles from "./header.module.css"
import PropTypes from "prop-types"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"


const Header = () => {
  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: file(relativePath: { eq: "logo.svg" }) {
        publicURL
      }
    }
  `)

  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <HeaderLogo logo={data.logo} />
        <DropdownMenu />
      </nav >
    </header >
  )
}

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
