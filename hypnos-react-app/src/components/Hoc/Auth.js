import React from "react";
import { Navigate } from "react-router-dom";

import AuthService from "@Services/Auth";

const RequireAuth = (
  Component,
  allowedRoles = ["admin", "manager", "client"]
) => {
  return class Apps extends React.Component {
    constructor(props) {
      super(props);
      const currentUser = AuthService.getCurrentUser();

      this.checkIfAllowed = this.checkIfAllowed.bind(this);

      this.checkIfAllowed();

      this.state = {
        isAuthenticated: currentUser && currentUser.token !== null,
        isAllowed: "pending",
        role: null
      };
    }

    checkIfAllowed() {
      AuthService.getUserRole().then(({ data }) => {
        if (data.role) {
          const { role } = data;
          if (allowedRoles.includes(role.name)) {
            this.setState({ isAllowed: true, role: role.name });
          } else {
            this.setState({ isAllowed: false });
          }
        }
      });
    }

    render() {
      const { isAuthenticated, role } = this.state;
      if (!isAuthenticated) return <Navigate to="/login" />;
      if (this.state.isAllowed === "pending")
        return (
          <div className="w-screen h-screen relative block bg-white opacity-75 z-50">
            <div className="w-20 h-20 border-b-2 absolute -ml-10 shadow -mt-10 top-1/2 left-1/2 border-primary rounded-full animate-spin" />
          </div>
        );
      if (!this.state.isAllowed) return <Navigate to="/forbidden" />;

      return <Component {...this.props} role={role} />;
    }
  };
};

export default RequireAuth;
