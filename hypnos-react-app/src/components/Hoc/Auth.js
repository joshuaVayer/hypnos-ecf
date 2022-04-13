import React from "react";
import { Navigate } from "react-router-dom";

import AuthService from "@Services/Auth";

const RequireAuth = Component => {
  return class Apps extends React.Component {
    constructor(props) {
      super(props);
      const currentUser = AuthService.getCurrentUser();

      // Should Check token validity

      this.state = {
        isAuthenticated: currentUser && currentUser.token !== null
      };
    }

    render() {
      const { isAuthenticated } = this.state;

      if (!isAuthenticated) {
        return <Navigate to="/login" />;
      }

      return <Component {...this.props} />;
    }
  };
};

export default RequireAuth;
