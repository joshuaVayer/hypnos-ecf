import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import withRouter from "@Hoc/Router";

import Forms from "@Display/Forms";
import Users from "@Display/Users";
import Bookings from "@Display/Bookings";
import Facilities from "@Display/Facilities";
import PanelActions from "@Display/Panel/Actions";

import actions from "../actions";

class DashboardAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  renderDasboardView(view) {
    if (view === "users") return <Users />;
    if (view === "contacts") return <Forms />;
    if (view === "facilities") return <Facilities />;
    if (view === "bookings") return <Bookings shape="staff" />;

    return null;
  }

  render() {
    const { view } = this.props.router.params;

    if (view) return this.renderDasboardView(view);

    return (
      <section aria-labelledby="quick-links-title">
        <PanelActions actions={actions(i18next).admin} />
      </section>
    );
  }
}

DashboardAdmin.propTypes = {
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default withRouter(DashboardAdmin);
