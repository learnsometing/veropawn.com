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
      if (!hasBackgroundImage() || !hasTitle() || !hasTo()) {
        return null;
      }

      const backgroundImage = category.frontmatter.backgroundImage;
      const title = category.frontmatter.title;
      const to = category.frontmatter.to;

      return (
        <FeaturedLink
          backgroundImage={backgroundImage}
          text={title}
          to={to}
          key={category.id}
        />
      );

      function hasBackgroundImage() {
        return (category.frontmatter && category.frontmatter.backgroundImage);
      }

      function hasTitle() {
        return (category.frontmatter && category.frontmatter.title);
      }

      function hasTo() {
        return (category.frontmatter && category.frontmatter.to);
      }
    });
  }
}

export function FeaturedLink({ backgroundImage, text, to }) {
  return (
    <li className={featuredCategories.listItem}>
      <Link alt={text} to={to} className={featuredCategories.link}>
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