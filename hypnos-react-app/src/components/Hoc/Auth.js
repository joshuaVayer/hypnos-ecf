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
        return <div>Checking your rights...</div>;
      if (!this.state.isAllowed) return <Navigate to="/forbidden" />;

      return <Component {...this.props} role={role} />;
    }
  };
};

export default RequireAuth;
