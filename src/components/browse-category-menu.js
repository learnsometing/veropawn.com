import React from "react"

import DDMenuBtn from "./dd-menu-btn"

class BrowseByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.toggleList = props.toggleBrowseMenu.bind(this);
  }

  render() {
    return (
      <DDMenuBtn text="Browse By Category" onClick={this.toggleList} />
    );
  }
}

export default BrowseByCategory