import React from "react";
import AuthService from "@Services/Auth";

const HocAuthentication = Component => {
  return class AuthenticatedComponent extends React.Component {
    isAuthenticated() {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) return true;
      return false;
    }

    render() {
      const loginErrorMessage = (
        <div>
          Please <a href="/login">login</a> in order to view this part of the
          application.
        </div>
      );

      return (
        <div>
          {this.isAuthenticated === true ? (
            <Component {...this.props} />
          ) : (
            loginErrorMessage
          )}
        </div>
      );
    }
  };
};

export default HocAuthentication;
