import React from "react"
import { Link } from "gatsby"
import MenuItem from "./menu-item"

export default () => (
  <MenuItem child={<Link to="/">Home</Link>} />
);