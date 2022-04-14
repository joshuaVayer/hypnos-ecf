import React from "react";
import AuthService from "@Services/Auth";
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
    this.state = {
      user: AuthService.getCurrentUser(),
      role: ""
    };
  }

  componentDidMount() {
    // Ensure that user's datas are not corrupted
    AuthService.getUserRole().then(({ data }) => {
      if (data.role) {
        this.setState({ role: data.role.name });
      }
    });
  }

  getDashboardContent() {
    const { role } = this.state;
    if (role === "manager") {
      return <DashboardManager user={this.state.user} />;
    }
    if (role === "admin") {
      return <DashboardAdmin user={this.state.user} />;
    }
    return <DashboardClient user={this.state.user} />;
  }

  render() {
    if (!this.state.role) return null;
    const { role } = this.state;
    const { user: userDetails } = this.state.user;

    return (
      <div className="min-h-full">
        <HeaderDashboard user={{ ...userDetails, role, imageUrl: USER_IMG }} />
        <main className="-mt-20 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-1 lg:gap-8">
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <PanelWelcome user={{ ...userDetails, imageUrl: USER_IMG }} />
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

export default HocAuthentication(Dashboard);
