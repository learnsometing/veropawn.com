import React from "react"
import headerStyles from "./header.module.css"
import { useStaticQuery, graphql } from "gatsby"

import { Link } from "gatsby"

const HeaderLogo = () => {
  const { logo } = useStaticQuery(graphql`
    query LogoQuery {
      logo: file(relativePath: { eq: "logo.svg" }) {
        publicURL
      }
    }
  `)

  return (
    <Link
      to='/'
      className={headerStyles.link}
    >
      <span className={headerStyles.iconWrapper}>
        <div className={headerStyles.svgWrapper}>
          <img
            className={headerStyles.svg}
            src={logo.publicURL}
            alt="Cash Pawn and Jewelry Logo"
          />
        </div>
      </span>
    </Link>
  )
}

export default HeaderLogo;