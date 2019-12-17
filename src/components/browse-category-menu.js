import React from "react"
import { FaAngleLeft } from "react-icons/fa"
import DDMenuList from "./dd-menu-list"
import DDMenuBtn from "./dd-menu-btn"
import InvCategoryBtns from "./inv-category-btns"

class BrowseByCategoryMenu extends React.Component {
  constructor(props) {
    super(props);
    this.closeBrowseMenu = this.props.closeBrowseMenu;
  }

  render() {
    const children = <>
      <DDMenuBtn children={
        <>
          <FaAngleLeft />
          {"Back"}
        </>
      }
        onClick={this.closeBrowseMenu} />
      <InvCategoryBtns />
    </>;


    return (
      <DDMenuList children={children}
        setDropdownMenuRef={this.props.setDropdownMenuRef} />
    );
  }
}

export default BrowseByCategoryMenu