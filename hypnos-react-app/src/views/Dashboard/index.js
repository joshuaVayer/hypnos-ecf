import React from "react";
import PropTypes from "prop-types";
import AuthService from "@Services/Auth";

import withRouter from "@Hoc/Router";
import HocAuthentication from "@Hoc/Auth";

import Footer from "@Display/Footer";
import PanelWelcome from "@Display/Panel/Welcome";
import DashboardAdmin from "@Views/Dashboard/Admin";
import DashboardClient from "@Views/Dashboard/Client";
import DashboardManager from "@Views/Dashboard/Manager";
import HeaderDashboard from "@Display/Header/Dashboard";

const USER_IMG = `${process.env.REACT_APP_UPLOAD_URL}/avatar.png`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const { user } = AuthService.getCurrentUser() || {};
    user.role = { name: this.props.role, _id: user.role };

    this.state = { user };
  }

  redirectToLastTarget() {
    const target = localStorage.getItem("target");
    if (target) {
      localStorage.removeItem("target");
      this.props.router.navigate(target);
    }
  }

  getDashboardContent() {
    const { role } = this.state.user;
    if (role.name === "manager") {
      return <DashboardManager user={this.state.user} />;
    }
    if (role.name === "admin") {
      return <DashboardAdmin user={this.state.user} />;
    }
    return <DashboardClient user={this.state.user} />;
  }

  render() {
    if (!this.state.user || !this.state.user.role) return null;
    const { user } = this.state;

    return (
      <div className="min-h-full">
        <HeaderDashboard user={{ ...user, imageUrl: USER_IMG }} />
        <main className="-mt-20 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-1 lg:gap-8">
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <PanelWelcome user={{ ...user, imageUrl: USER_IMG }} />
                {this.getDashboardContent()}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  router: PropTypes.object.isRequired,
  role: PropTypes.string
};

export default HocAuthentication(withRouter(Dashboard));
