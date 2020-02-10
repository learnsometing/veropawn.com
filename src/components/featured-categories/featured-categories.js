import React from "react";
import { Link } from 'gatsby';

import featuredCategories from './featured-categories.module.css';
import layout from '../../styles/layout.module.css';

export default function FeaturedCategories({ data }) {
  const featuredLinks = createFeaturedLinks();

  return (
    <section>
      <h2 className={featuredCategories.sectionHeading}>Featured Categories</h2>
      <ul className={`${layout.rowCenterStart} ${featuredCategories.linkList}`}>
        {featuredLinks}
      </ul>
    </section>
  );

  function createFeaturedLinks() {
    return data.nodes.map(category => {

      // just in case there is a typo in one of the files
      if (!hasBackgroundImage()
        || !(hasHref() && hasText())) {
        return null;
      }

      const backgroundImage = category.frontmatter.backgroundImage;
      // Remark wraps everything in a P element...
      const linkWrapper = category.htmlAst.children[0];
      // extract the link from the wrapper
      const link = linkWrapper.children[0];
      // extract the text node from the link
      const textNode = link.children[0];
      // Get the href property and the text of the link
      const href = link.properties.href;
      const text = textNode.value;

      return (
        <FeaturedLink
          backgroundImage={backgroundImage}
          href={href}
          key={category.id}
          text={text}
        />
      );

      function hasBackgroundImage() {
        return (category.frontmatter && category.frontmatter.backgroundImage);
      }

      function hasHref() {
        return (
          // the abstract syntax tree created by parsing the markdown file
          category.htmlAst
          // p tag link is wrapped in
          && category.htmlAst.children[0]
          // a tag
          && category.htmlAst.children[0].children[0]
          // a tag properties
          && category.htmlAst.children[0].children[0].properties
          // href
          && category.htmlAst.children[0].children[0].properties.href
        );
      }

      function hasText() {
        return (
          // text node
          category.htmlAst.children[0].children[0].children[0]
          // text node value
          && category.htmlAst.children[0].children[0].children[0].value
        );
      }
    });
  }
}

export function FeaturedLink({ backgroundImage, href, text }) {
  return (
    <li className={featuredCategories.listItem}>
      <Link to={href} className={featuredCategories.link}>
        <div className={featuredCategories.linkContentWrapper}>
          <div className={featuredCategories.bgImageWrapper}>
            <img
              className={featuredCategories.bgImage}
              src={backgroundImage.publicURL}
              alt={backgroundImage.name}
            />
          </div>
          <div className={featuredCategories.linkText}>
            {text}
          </div>
        </div>
      </Link>
    </li>
  );
}