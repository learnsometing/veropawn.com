import React from "react"
import headerLogoStyles from "./header-logo.module.css"
import { Link } from "gatsby"

const HeaderLogo = ({ logo }) => {
  return (
    <div class={headerLogoStyles.container}>
      <Link to='/'>
        <img class={headerLogoStyles.logo} src={logo.publicURL} alt="Cash Pawn and Jewelry Logo" />
      </Link>
    </div>
  )
}

export default HeaderLogo;