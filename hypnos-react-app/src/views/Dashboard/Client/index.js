import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import withRouter from "@Hoc/Router";

import actions from "../actions";
import Bookings from "@Display/Bookings";
import BookingNew from "@Display/Bookings/New";
import PanelActions from "@Display/Panel/Actions";

class DashboardClient extends React.Component {
  renderDasboardView(view) {
    if (view === "new-booking") return <BookingNew />;
    if (view === "bookings") return <Bookings shape="client" />;
  }

  render() {
    const { view } = this.props.router.params;

    if (view) return this.renderDasboardView(view);

    return (
      <section aria-labelledby="quick-links-title">
        <PanelActions actions={actions(i18next).client} />
      </section>
    );
  }
}

DashboardClient.propTypes = {
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default withRouter(DashboardClient);
