import React from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";
import "sweetalert2/src/sweetalert2.scss";
import buildClient from "../api/build-client";

const MyApp = ({ Component, pageProps, currentUser }) => {
  let props = { ...pageProps, currentUser };
  if (Component.getLayout) {
    return (
      <LayoutProvider>
        {Component.getLayout(<Component {...props} />)}
      </LayoutProvider>
    );
  } else {
    return (
      <LayoutProvider>
        <Component {...props} />
      </LayoutProvider>
    );
  }
};

MyApp.getInitialProps = async (appCtx) => {
  const client = buildClient(appCtx.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appCtx.Component.getInitialProps) {
    pageProps = await appCtx.Component.getInitialProps(
      appCtx.ctx,
      client,
      data.currentUser
    );
  }
  return {
    pageProps,
    currentUser: data.currentUser,
  };
};

export default MyApp;
