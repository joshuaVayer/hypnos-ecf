import React from "react";

import AuthLogin from "@Views/Auth/Login";
import AuthRegister from "@Views/Auth/Register";

const routes = [
  {
    key: "login",
    text: "Login",
    path: "/login",
    element: props => <AuthLogin {...props} />
  },
  {
    key: "signup",
    text: "Signup",
    path: "/signup",
    element: props => <AuthRegister {...props} />
  }
];

export default routes;
