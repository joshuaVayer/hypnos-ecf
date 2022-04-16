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

      // Should Check token validity

      this.checkIfAllowed = this.checkIfAllowed.bind(this);
      let isAllowed = "pending";
      const everyOneAllowed = ["admin", "manager", "client"].every(role =>
        allowedRoles.includes(role)
      );
      everyOneAllowed ? (isAllowed = true) : this.checkIfAllowed();

      this.state = {
        isAuthenticated: currentUser && currentUser.token !== null,
        isAllowed
      };
    }

    checkIfAllowed() {
      AuthService.getUserRole().then(({ data }) => {
        if (data.role) {
          const { role } = data;
          if (allowedRoles.includes(role.name)) {
            this.setState({ isAllowed: true });
          } else {
            this.setState({ isAllowed: false });
          }
        }
      });
    }

    render() {
      const { isAuthenticated } = this.state;
      if (!isAuthenticated) return <Navigate to="/login" />;
      if (this.state.isAllowed === "pending")
        return <div>Checking your rights...</div>;
      if (!this.state.isAllowed) return <Navigate to="/forbidden" />;

      return <Component {...this.props} />;
    }
  };
};

export default RequireAuth;
