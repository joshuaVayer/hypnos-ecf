import React from "react";
import PropTypes from "prop-types";
import withRouter from "@Hoc/Router";

import BookingService from "@Services/Booking";

import BookingsList from "./List";

const Bookings = () => {
  const [bookings, setBookings] = React.useState([]);

  React.useEffect(() => {
    BookingService.getAll().then(setBookings);
  }, []);

  console.log(bookings);

  const getPageContent = () => {
    return <BookingsList bookings={[]} />;
  };

  return <section>{getPageContent()}</section>;
};

Bookings.propTypes = {
  router: PropTypes.shape({
    navigate: PropTypes.func,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

export default withRouter(Bookings);
