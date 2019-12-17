/*
* Browse by Category Menu
*
* A dropdown menu that exposes the categories of items in the pawn shop's inventory
* to the user.
*
* 
*/

// External imports
import React from "react"
import { FaAngleLeft } from "react-icons/fa"

// Internal imports
import DDMenuList from "./dd-menu-list"
import DDMenuLink from "./dd-menu-link"
import DDMenuBtn from "./dd-menu-btn"
import BrowseByCategoryBtns from "./browse-category-menu-btns"

class BrowseByCategoryMenu extends React.Component {
  constructor(props) {
    super(props);
    this.closeBrowseMenu = this.props.closeBrowseMenu;
    this.state = {
      subcatMenuOpen: false,
      subcatMenuLinks: []
    }
    this.openSubcatMenu = this.openSubcatMenu.bind(this);
    this.closeSubcatMenu = this.closeSubcatMenu.bind(this);
  }

  openSubcatMenu = links => {
    this.setState({
      subcatMenuOpen: true,
      subcatMenuLinks: links
    })
  }

  closeSubcatMenu = () => {
    this.setState({
      subcatMenuOpen: false,
      subcatMenuLinks: []
    })
  }

  render() {
    const subcatMenuOpen = this.state.subcatMenuOpen;
    const subcatMenuLinks = this.state.subcatMenuLinks;
    let children;
    if (subcatMenuOpen) {
      children = <>
        <DDMenuBtn
          children={
            <>
              <FaAngleLeft />
              {"Browse Categories"}
            </>
          }
          key="browse-categories"
          onClick={this.closeSubcatMenu}
        />
        {subcatMenuLinks.map(node => (
          <DDMenuLink
            key={node.id}
            link={node.slug}
            value={node.subcategory}
          />
        ))}
      </>
    } else {
      children = <>
        <DDMenuBtn
          children={
            <>
              <FaAngleLeft />
              {"Main Menu"}
            </>
          }
          onClick={this.closeBrowseMenu}
        />
        <BrowseByCategoryBtns onClick={this.openSubcatMenu} />
      </>;
    }


    return (
      <DDMenuList children={children}
        setDropdownMenuRef={this.props.setDropdownMenuRef} />
    );
  }
}

export default BrowseByCategoryMenu