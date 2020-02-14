# veropawn.com

Cash Pawn & Jewelry's website source code.

## Purpose

Increase sales by making the shop's inventory available for customers to browse. The
owner's goal is to direct his customers to the website when they call about what's
in stock. The website should direct customers to the types of items they want to
buy so they can visit the shop prepared to make purchases.

No transactions take place on the site.

## Overview

Veropawn.net was developed using GatsbyJS, a static site generator that leverages
both front-end and back-end JavaScript frameworks and related tools. It uses
server-side rendering to generate the static portion of the site’s HTML from the
application’s React components, then ‘re-hydrates’ the React DOM elements with a
JavaScript runtime it builds from any dynamic JS code.

It also bundles and optimizes static assets that are delivered to the web pages,
which drastically improves user experience.

## Getting Started

### Requirements

- [Node.js and npm CLI](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [Gatsby CLI](https://www.gatsbyjs.org/tutorial/part-zero/#using-the-gatsby-cli)

### Installation

1. clone the Git repository `git clone https://github.com/learnsometing/veropawn.com.git`
2. to install only production packages, run `npm install --production`
3. if you're a developer and want to install all packages, run `npm install`
4. add the required assets to the project

### Required Assets

The master repo doesn't include any of the assets needed by the website to avoid
conflicts when rebuilding the site on a weekly basis with new assets.

#### Raw Data Assets

The following files are required to generate the source json files that are used
to programmatically build the shopping and item pages:

- /raw/fk_tables/category.tsv
- /raw/fk_tables/subcategory.tsv
- /raw/inv/inv.tsv

In the production of the application, these assets originated from customer's
database.

##### Inventory Table Fields

The inventory table requires `LEVEL1_FK`, `LEVEL2_FK`, `DESCRIPT`, `DESCRIPT2`,
`MODELNUM`, and `INVNUM` fields.

Both `LEVEL1_FK` and `LEVEL2_FK` are foreign keys for `LEVEL1` (category) and
`LEVEL2` (subcategory). These are integers, like `20001`, and `2551001`.

`DESCRIPT` is an all-caps short description given to each item when it's
purchased or put up as collateral for a pawn loan. Ex: `GOPRO HERO`.

`DESCRIPT2` is a long description that may or may not include the item's `LEVEL1` and
`LEVEL2` names, combined with details about the item. For most items,
the details include the item's brand, model number, and serial number. Specialty
items like jewelry and firearms will include other details. Jewelry details may
include metals and mass. Firearms may include ammunition type and action type.
Finally, the list of details is trailed by a semicolon and the short
description of the item stored in the `DESCRIPT` field.

Examples:

- general: `SCREWGUN TOOLS-POWER MILWAUKEE 6742-20; SCREW GUN`
- jewelry: `RING JEWELRY NONE, 14KT, 3.10 Grams; LADIES RING W/STONES`
- firearm: `PISTOL FIREARM GLOCK 27, #serial, .40 CALIBER, SEMI-AUTOMATIC; HANDGUN 1 MAG`

The only items that are guaranteed to have a serial number are firearms, since it's
illegal to sell a gun without one.

The `MODELNUM` field stores the model number of the item, if available. This field
isn't always guaranteed to be present and may take different forms.
If it's missing, sometimes it is labeled as `NONE`. Other times it's blank.
Sometimes, `DESCRIPT2` will also contain a model number different from the one used
when `MODELNUM` is blank. Fun!

`INVNUM` stores the item's inventory number, which may vary by item type. For most
items, it's just an integer. For guns, it usually takes the form `G-12345`.
Inventory numbers may be followed by a ticket number as well, if they were
purchased or put up for pawn on the same ticket: `G-12345-1`.

##### Foreign Key Table Fields

Both fk_tables require `fk` and `name` fields. `fk` is a number (a foreign key)
that maps to an uppercase `name`. For example, `1001  BICYCLES`.

`category.tsv` is used to store `LEVEL1_FK` and `name` pairs, whereas `subcategory.tsv`
stores `LEVEL2_FK` and `name` pairs. These files are necessary to replace all of
the foreign keys in the inventory dump with their appropriate, human readable names.
They're used to essentially do a join operation with JavaScript, since it wasn't
possible to join using SQL queries (access rights?).

**NOTE**: Inventory items will only be processed if both `LEVEL1_FK` and `LEVEL2_FK`
values are found in the foreign key tables. If either foreign key remains,
it's effectively marked as not for sale. Read more [below](#source-data-generation)

#### Image Assets

Images are stored in four required subdirectories in the `src/images` folder.

- src/images/featured-categories
- src/images/index
- src/images/items
- src/images/logos-and-icons

##### src/images/featured-categories

Images in this folder are used as the background of the featured category links
on the index page. File names just need to be consistent with the names that
are referenced in the corresponding markdown file's `backgroundImage` frontmatter
property. See [below](#srcmarkdownfeatured-categories) for configuring featured category links.

##### src/images/index

This folder stores images used in the carousel on the index page. File names just
need to be consistent with the names that are referenced in the corresponding
markdown file's `featuredImage` frontmatter property. They should always have
a 1:1 aspect ratio in order for the carousel dimensions to remain consistent.

See [below](#srcmarkdownindex) for configuring the index carousel.

##### src/images/items

Images of inventory items are stored here. They can have either `.jpeg`, `.jpg`,
or `.png` extensions. The item photos are named after the inventory number of the
item, followed by a letter that indicates the order of the photo in the carousel.

For example, if an item has the inventory number `I-123`, and there are three
photos of the item, they should be named `I-123_a`, `I-123_b`, and `I-123_c`.
The photo followed by `_a` is always the main photo. It's used to display
the item on the shopping page and will be the first item the user sees in the
item page carousel. Alphabetical order will always dictate the highest priority
photos, even if they are missing. So if `_a` was missing, `_b` would take priority
and so on. In order to be picked up in the graphql query, the inventory numbers
must be EXACTLY as they are for the item. `i_123` wouldn't be returned in a query
for the item in the above example.

The letters used to assert priority should also conform to one case, either upper
or lower. If the case of these letters is mixed, they won't be sorted properly
by graphQL and the carousel will be out of order.

###### Default Photo

There should always be a default photo located in `src/images/items` named `0_default`
with any of the valid extensions above. It's used as a fallback if no photos for
an item are located.

##### src/images/logos-and-icons

This folder stores custom icons, like the site's favicon and the business logo.
The site's logo should be named `logo.svg` and the site's favicon should be
named `favicon.svg`.

#### Markdown Assets

Markdown files are used to programmatically build out the featured categories
links and the carousel on the home page. Two folders store these files:

##### src/markdown/featured-categories/

Files stored in this subdirectory are used to generate the featured categories
links on the home page. One link is created for each file.
Each file should be named after the subcategory that is featured in the link.
For example: `bracelets.md` would contain data needed to create a link to the
bracelets page.

##### Configuring Featured Category Links

Each file should only contain frontmatter used to store the data for the links.
There are three frontmatter properties needed to build the link:

1. `backgroundImage` provides the relative path to the background image of the link. Store these in `src/images/featured-categories`. Ex: `../../images/featured-categories/logo.svg`
2. `linkText` provides the text for the link. Ex: `Bracelets`
3. `to` provides the `href` attribute of the link. Ex: `/jewelry/bracelet`

Note that no quotes are required in frontmatter properties. The links will be
sorted alphabetically in descending order by the linkText property.

##### src/markdown/index/

Files stored in this subdirectory are used to fill out the index page carousel with
content. They can be named however you like and are put into the carousel in
alphabetical order. To maintain the order of the carousel slides, names like
`a_some-slide.md` and `b_another-slide.md` should be used.

Like the featured categories pages, frontmatter is the only thing in these files.

##### Configuring the Index Page Carousel

Frontmatter properties are used to build the content for each carousel slide.
Each file's frontmatter must have a `featuredImage` prop and may supply optional
properties if a text overlay at the bottom of the slide is desired. The text overlay
may have a title, some text, a link, or some combination of the three.

| property        | default     | description                     | example                             |
| --------------- | ----------- | ------------------------------- | ----------------------------------- |
| `featuredImage` | none        | Mandatory relative path         | `../../images/index/shop-front.jpg` |
| `title`         | `undefined` | Text value of the overlay title | `Welcome to our shop`               |
| `text`          | `undefined` | Text value of the overlay       | `We carry lots of cool stuff`       |
| `linkText`      | `undefined` | Text value of the link          | `Click here for more info`          |
| `to`            | `undefined` | The href attribute of the link  | `/faq`                              |

The title will always come first in the overlay, followed by text, then by the link.

**NOTE**: in order to include a link, both the `linkText` and `to` properties must be
present. If either is missing, the link will not render.

#### PDF Assets

PDF files should be stored in `src/pdf`. Currently, only one PDF asset is used by
the site, named `what-gun-should-I-buy.pdf`. Nothing special about this folder.

## Source Data Generation

Two JSON files serve as the backend of the website:

- `src/data/items.json`
- `src/data/pages.json`

They need to be produced from the raw data assets mentioned above, and should be
regenerated any time the raw data assets are changed.

The npm script `npm run produce` will generate source data from the raw data files.
If everything worked, two files will be present under `src/data` and another
file may be created under `not-for-sale` if any items weren't processed from the
inventory table.

Items marked as not for sale can be found in `not-for-sale/not-for-sale.csv`.
These items either have a `LEVEL1_FK` or `LEVEL2_FK` field that isn't found in
either foreign key table, or have a different number of fields than it should.

## Building the Site

After the site's source data has been produced, the website can be built with
gatsby. Simply run `gatsby build`, and the site's static assets will be generated
in the `public/` folder. The website can then be deployed via your host of choice.

See [the gatsby docs](https://www.gatsbyjs.org/docs/deploying-and-hosting/) for
more information on deploying and hosting.

## Running the Site Locally

To serve a local copy of the website, run `gatsby develop`. By default, the site
is configured for port 8000; navigate to `localhost:8000` to view the site under
development.

## Core Technologies

### JavaScript

From MDN: “JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.“

### [NPM](https://docs.npmjs.com/about-npm/)

NPM or npm is now the world’s largest software registry. It’s essentially a suite of tools combined with a website that's used to package, distribute, and install JavaScript packages. npm is used by the application for managing dependencies, installing/uninstalling software, and running tests and scripts.

### [GatsbyJS](https://www.gatsbyjs.org/)

An open-source static site generator that leverages modern JavaScript tools and technologies. Most notably, Node.JS, ReactJS, NPM, webpack, babel, and graphQL.

### [NodeJS](https://nodejs.org/en/)

An open-source back-end JavaScript framework with many modern applications. NodeJS allows JavaScript to run on any server and brings file system access and more to the JavaScript ecosystem. No code developed for a Node environment will ever be allowed to run in a browser environment, due to the massive security implications that arise by implementing file system access from the browser. Gatsby uses NodeJS for server-side rendering of React components to static assets during the build phase. A NodeJS script is also used by the application to create the source data used by the website.

### [ReactJS](https://reactjs.org/)

An open-source front-end JavaScript framework used to build dynamic user interfaces. ReactJS leverages a diffing algorithm that compares a virtual DOM tracked by React with the browser DOM to render only necessary changes. 

### [GraphQL](https://www.gatsbyjs.org/docs/graphql/)

GraphQL is an open-source query language that uses a JSON-like syntax to query data from the backend of an application. In the Cash Pawn app, it’s used to query data from the inventory files, images, and all other static assets so they can be included in React components. GraphQL can be run on a server to assist in completing API requests, but in our case, it’s used exclusively by Gatsby during the build phase to get the data used to build out the website.

### [Webpack](https://webpack.js.org/)

Webpack is a build tool used to bundle assets into static assets. It’s used in the app to combine (bundles) and minifies JS/CSS files and prepares images for production. Optimized assets drastically increase the site’s performance, especially for mobile users. Gatsby utilizes webpack under the hood and allows plugins to add custom webpack configurations. It’s unlikely that the app will ever need a custom webpack configuration, but if the need arises and isn’t already covered by someone else’s plugin, see the documentation here for customization options.

### [Babel](https://babeljs.io/)

Babel is another build tool that transpiles JavaScript code into pre-ECMAScript 2015 syntax in order to support a wider range of browsers. Gatsby uses it during the build phase when bundling assets with webpack. The app uses the default configuration, though it is possible to customize it to support a wider range of browsers. See the gatsby docs for more information about babel customization.

### [Jest](https://jestjs.io/)

Jest is an open-source test runner used to write unit and integration tests for JavaScript, Node, React and other JavaScript-based programs. You won’t need this at all in production, but use it if you need to test all of the code that was written for the website.

### [Testing Library](https://testing-library.com/)

Testing Library is composed of multiple packages that aim to improve the way tests for user interface components are developed. It provides a test renderer, customizable queries, and even a way to fire events in a simulated dom environment (jsdom). The @testing-library/react and @testing-library/jsdom/extend-expect packages are used in jest tests to render react components, select them from the DOM, and make assertions against their behavior. Not needed by the production environment.

## Authors

Brian Monaccio
