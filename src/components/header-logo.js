import React from "react"
import headerLogoStyles from "./header-logo.module.css"
import { Link } from "gatsby"

const HeaderLogo = ({ logo }) => {
  return (
    <li className={headerLogoStyles.container}>
      <Link to='/'>
        <img className={headerLogoStyles.logo} src={logo.publicURL} alt="Cash Pawn and Jewelry Logo" />
      </Link>
    </li>
  )
}

export default HeaderLogo;