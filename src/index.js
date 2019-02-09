import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux";
import WebfontLoader from "@dr-kobros/react-webfont-loader";

import App from "./App";

import "./global-styles.js";

const fontConfig = {
  google: {
    families: ["Raleway"]
  }
};

render(
  <WebfontLoader config={fontConfig}>
    <Provider store={store}>
      <App />
    </Provider>
  </WebfontLoader>,
  document.getElementById("root")
);
