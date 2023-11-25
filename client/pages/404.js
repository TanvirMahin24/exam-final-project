import React from "react";
import NotFound from "../templates/pages/notfound";

const Custom404 = () => {
  return <NotFound />;
};

Custom404.getLayout = function getLayout(page) {
  return page;
};

export default Custom404;
