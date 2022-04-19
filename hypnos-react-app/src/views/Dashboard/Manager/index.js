import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import withRouter from "@Hoc/Router";

import actions from "../actions";
import Rooms from "@Display/Rooms";
import Bookings from "@Display/Bookings";
import Facilities from "@Display/Facilities";
import PanelActions from "@Display/Panel/Actions";

class DashboardManager extends React.Component {
  renderDasboardView(view) {
    const allowedFacilities = this.props.user.facilities;
    if (view === "facilities")
      return <Facilities allowedFacilities={allowedFacilities} />;
    if (view === "bookings")
      return <Bookings allowedFacilities={allowedFacilities} shape="staff" />;
    if (view === "rooms")
      return <Rooms allowedFacilities={allowedFacilities} />;
  }

  render() {
    const { view } = this.props.router.params;

    if (view) return this.renderDasboardView(view);

    return (
      <section aria-labelledby="quick-links-title">
        <PanelActions actions={actions(i18next).manager} />
      </section>
    );
  }
}

DashboardManager.propTypes = {
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default withRouter(DashboardManager);
