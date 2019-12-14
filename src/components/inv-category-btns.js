import React from "react";
import { graphql, StaticQuery } from "gatsby";

import DDMenuBtn from "./dd-menu-btn"

export default () => (
  <StaticQuery
    query={graphql`
      query Categories {
        allInvJson(sort: {fields: category}) {
          distinct(field: category)
        }
      }
    `}
    render={data => (
      <>
        {data.allInvJson.distinct.map((category) => (
          <DDMenuBtn text={category} />
        ))}
      </>
    )}
  />
);