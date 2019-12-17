import React from "react"
import PropTypes from "prop-types"
import onClickOutside from "react-onclickoutside"

import "./layout.css"
import Header from "./header"
import HeaderModalLeft from "./header-modal-left"

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainMenuOpen: false,
      browseMenuOpen: false
    }
    this.toggleMainMenu = this.toggleMainMenu.bind(this);
    this.openBrowseMenu = this.openBrowseMenu.bind(this);
    this.closeBrowseMenu = this.closeBrowseMenu.bind(this);
    //handling outside clicks
    this.dropdownMenu = null;
    this.setDropdownMenuRef = this.setDropdownMenuRef.bind(this)
  }

  toggleMainMenu() {
    this.setState(state => ({
      mainMenuOpen: !state.mainMenuOpen,
      browseMenuOpen: false
    }));
  }

  openBrowseMenu() {
    this.setState({
      mainMenuOpen: false,
      browseMenuOpen: true
    });
  }

  closeBrowseMenu() {
    this.setState({
      mainMenuOpen: true,
      browseMenuOpen: false
    });
  }

  setDropdownMenuRef = element => {
    this.dropdownMenu = element;
  };

  handleClickOutside(event) {
    if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
      this.setState(({
        mainMenuOpen: false,
        browseMenuOpen: false
      }));
    }
  }

  render() {


    return (
      <>
        <Header
          toggleMainMenu={this.toggleMainMenu}
          mainMenuOpen={this.state.mainMenuOpen}
        />
        <div id="layout">
          <main>{this.props.children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
        <HeaderModalLeft
          browseMenuOpen={this.state.browseMenuOpen}
          mainMenuOpen={this.state.mainMenuOpen}
          openBrowseMenu={this.openBrowseMenu}
          closeBrowseMenu={this.closeBrowseMenu}
          setDropdownMenuRef={this.setDropdownMenuRef}
        />
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default onClickOutside(Layout)
