import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@Root/App";

import "@Utils/i18n";
import "./style/index.css";

const root = document.getElementById("root");

ReactDOMClient.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
