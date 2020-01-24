import React from "react";

import SizedLayout from "../components/layout/layout";
import SEO from "../components/seo";

const IndexPage = () => (
  <SizedLayout title={"Home"}>
    <SEO title="Home" />
    <main id="content">
      <h1>Construction underway!</h1>
    </main>
  </SizedLayout>
);

export default IndexPage;
