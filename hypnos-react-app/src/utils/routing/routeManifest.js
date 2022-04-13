import React from "react";

import Main from "@Views/Main";
import Medias from "@Views/Medias";
import Profile from "@Views/Profile";
import Dashboard from "@Views/Dashboard";
import AuthLogin from "@Views/Auth/Login";
import AuthLogout from "@Views/Auth/Logout";
import AuthRegister from "@Views/Auth/Register";

const routes = [
  {
    key: "main",
    text: "main",
    path: ["/", "/:view", "/:view/:id"],
    element: props => <Main {...props} />
  },
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
  },
  {
    key: "logout",
    text: "Logout",
    path: "/logout",
    element: props => <AuthLogout {...props} />
  },
  {
    key: "dashboard",
    text: "Dashboard",
    path: ["/dashboard", "/dashboard/:view", "/dashboard/:view/:id"],
    element: props => <Dashboard {...props} />
  },
  {
    key: "medias",
    text: "Medias",
    path: "/medias",
    element: props => <Medias {...props} />
  },
  {
    key: "profile",
    text: "Profile",
    path: "/profile",
    element: props => <Profile {...props} />
  }
];

export default routes;
