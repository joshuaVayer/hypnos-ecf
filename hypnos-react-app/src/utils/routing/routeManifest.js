import React from "react";

import AuthLogin from "@Views/Auth/Login";

const routes = [
  {
    key: "login",
    text: "Login",
    path: "/login",
    show: true,
    element: props => <AuthLogin {...props} />
  }
];

export default routes;
