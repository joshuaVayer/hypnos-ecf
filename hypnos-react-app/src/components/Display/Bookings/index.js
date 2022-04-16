import React from "react";
import PropTypes from "prop-types";
import withRouter from "@Hoc/Router";

import AuthService from "@Services/Auth";
import RoomService from "@Services/Room";
import BookingService from "@Services/Booking";
import FacilityService from "@Services/Facility";

import BookingsList from "./List";
import BookingsClient from "./Client";

const Bookings = ({ shape }) => {
  const [rooms, setRooms] = React.useState([]);
  const [bookings, setBookings] = React.useState([]);
  const [facilities, setFacilities] = React.useState([]);

  const cancelBooking = id =>
    BookingService.cancel(id).then(fetchData).catch(console.error);

  const fetchData = () => {
    RoomService.getAll().then(setRooms);
    FacilityService.getAll().then(setFacilities);

    if (shape === "client") {
      const { user } = AuthService.getCurrentUser();
      if (user && user._id)
        BookingService.getAll({ user: user._id }).then(setBookings);

      return;
    }

    BookingService.getAll().then(setBookings);
  };

  const enhancedBookings = bookings =>
    bookings.map(booking => {
      const room = rooms.find(room => room._id === booking.room);
      return {
        ...booking,
        room,
        facility:
          room && room.facility
            ? facilities.find(facility => facility._id === room.facility)
            : {}
      };
    });

  React.useEffect(fetchData, []);

  const getPageContent = () => {
    if (rooms.length === 0 || facilities.length === 0) return null;
    const shapedBookings = enhancedBookings(Object.values(bookings));
    if (shape === "client")
      return (
        <BookingsClient
          bookings={shapedBookings}
          onCancelBooking={cancelBooking}
        />
      );
    return <BookingsList bookings={shapedBookings} />;
  };

  return <section>{getPageContent()}</section>;
};

Bookings.propTypes = {
  router: PropTypes.shape({
    navigate: PropTypes.func,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  shape: PropTypes.string
};

Bookings.defaultProps = {
  shape: "client"
};

export default withRouter(Bookings);
