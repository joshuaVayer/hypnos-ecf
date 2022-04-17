import React from "react";
import PropTypes from "prop-types";
import withRouter from "@Hoc/Router";

import AuthService from "@Services/Auth";
import UserService from "@Services/User";
import RoomService from "@Services/Room";
import BookingService from "@Services/Booking";
import FacilityService from "@Services/Facility";

import BookingsList from "./List";
import BookingsClient from "./Client";

const Bookings = ({ shape, allowedFacilities }) => {
  const [rooms, setRooms] = React.useState([]);
  const [clients, setClients] = React.useState([]);
  const [bookings, setBookings] = React.useState([]);
  const [facilities, setFacilities] = React.useState([]);

  const cancelBooking = id =>
    BookingService.cancel(id).then(fetchData).catch(console.error);

  const fetchData = () => {
    RoomService.getAll().then(setRooms);
    FacilityService.getAll().then(fetchFacilities => {
      if (allowedFacilities) {
        setFacilities(
          fetchFacilities.filter(f => allowedFacilities.includes(f._id))
        );
        return;
      }
      setFacilities(fetchFacilities);
    });
    UserService.getAll().then(users => {
      const clients = users.filter(
        user => user.role && user.role.name === "client"
      );
      setClients(clients);
    });

    if (shape === "client") {
      const { user } = AuthService.getCurrentUser();
      if (user && user._id)
        BookingService.getAll({ user: user._id }).then(setBookings);

      return;
    }

    const params = {};
    if (allowedFacilities) params.facility = allowedFacilities;

    BookingService.getAll(params).then(setBookings);
  };

  const enhancedBookings = bookings =>
    bookings.map(booking => {
      const room = rooms.find(room => room._id === booking.room) || {};
      const user = clients.find(user => user._id === booking.user) || {};
      return {
        ...booking,
        room,
        user,
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
  shape: PropTypes.string,
  allowedFacilities: PropTypes.array
};

Bookings.defaultProps = {
  shape: "client",
  allowedFacilities: null
};

export default withRouter(Bookings);
