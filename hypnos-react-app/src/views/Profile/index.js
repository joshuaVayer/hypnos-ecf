import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import AuthService from "@Services/Auth";
import UserService from "@Services/User";

import tableLines from "./helper";

import Table from "@Display/Table";
import RequireAuth from "@Hoc/Auth";
import Footer from "@Display/Footer";
import PanelWelcome from "@Display/Panel/Welcome";
import HeaderDashboard from "@Display/Header/Dashboard";

const USER_IMG = `${process.env.REACT_APP_UPLOAD_URL}/avatar.png`;

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.initTable = this.initTable.bind(this);
    this.handleEditLine = this.handleEditLine.bind(this);
    this.handleUpdateLine = this.handleUpdateLine.bind(this);
    this.handleCancelEditLine = this.handleCancelEditLine.bind(this);

    const { user } = AuthService.getCurrentUser() || {};
    user.role = { name: this.props.role, _id: user.role };

    this.state = {
      user,
      lines: []
    };
  }

  componentDidMount() {
    this.initTable();
  }

  initTable(callback = () => {}) {
    const { user } = this.state;
    if (!user) return;

    this.setState({ lines: tableLines(user, this.handleEditLine) }, callback);
  }

  handleEditLine(id) {
    // We dont want to edit several lines at the same time
    this.initTable(() => {
      const { lines } = this.state;
      const safeLines = lines.map(line => {
        if (line.id === id) {
          return {
            ...line,
            name: id,
            editing: true,
            onSubmit: newValue => this.handleUpdateLine(id, newValue),
            onCancel: this.handleCancelEditLine
          };
        }
        return line;
      });

      this.setState({ lines: safeLines });
    });
  }

  handleUpdateLine(key, newValue) {
    const { user } = this.state;

    const newUser = {
      ...user,
      [key]: newValue
    };

    UserService.update(newUser, true).then(user => {
      this.setState(
        { user: { ...user, role: this.state.user.role } },
        this.initTable
      );
      // As user stored in lhe local storage is also updated
      // we need to refresh the all page to rerender all related components
      window.location.reload();
    });
  }

  handleCancelEditLine() {
    // Make to reset data to the original state
    const user = AuthService.getCurrentUser();
    this.setState({ user }, this.initTable);
  }

  render() {
    const { user, lines } = this.state;

    if (!user) return null;

    return (
      <div className="min-h-full">
        <HeaderDashboard user={{ ...user, imageUrl: USER_IMG }} />
        <main className="-mt-20 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-1 lg:gap-8">
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <PanelWelcome user={{ ...user, imageUrl: USER_IMG }} />
                {lines && lines.length > 0 && (
                  <React.Fragment>
                    <div className="mt-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {i18next.t("user_details")}
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {i18next.t("user_details_description")}
                      </p>
                    </div>
                    <Table lines={lines} />
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  role: PropTypes.string
};

export default RequireAuth(Profile);
