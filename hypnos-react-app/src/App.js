import React from "react";
import Routing from "@Utils/routing";
import { withTranslation } from "react-i18next";

const App = () => (
  <div>
    <Routing />
  </div>
);

export default withTranslation()(App);
