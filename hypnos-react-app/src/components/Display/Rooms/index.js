import React from "react";
import PropTypes from "prop-types";

import withRouter from "@Hoc/Router";
import HocAuthentication from "@Hoc/Auth";

import AuthService from "@Services/Auth";
import RoomService from "@Services/Room";
import FacilityService from "@Services/Facility";

import RoomNew from "./New";
import RoomList from "./List";
import RoomDetails from "./Details";

const Rooms = ({ router }) => {
  const { id } = router.params;
  const user = AuthService.getCurrentUser();
  const [rooms, setRooms] = React.useState([]);
  const [facilities, setFacilities] = React.useState([]);

  const handleFacilityUpdate = (fieldName, newValue) => {
    if (!id || id === "new") return;

    const room = { _id: id, [fieldName]: newValue };

    RoomService.update(room).then(() => fetchRooms());
  };

  const fetchRooms = (callback = () => {}) => {
    RoomService.getAll({ user: user.user._id }).then(rooms => {
      const promises = rooms.map(room =>
        FacilityService.get(room.facility).then(facility => {
          return { ...room, facility };
        })
      );
      Promise.all(promises).then(rooms => {
        setRooms(rooms);
        const facilities = rooms.map(room => room.facility);
        const removeDuplicates = facilities => {
          const output = [];
          facilities.forEach(facility => {
            if (!output.find(f => f._id === facility._id))
              output.push(facility);
          });
          return output;
        };
        setFacilities(removeDuplicates(facilities));
        callback();
      });
    });
  };

  const handleRemoveRoom = () => {
    if (!id || id === "new") return;
    RoomService.remove(id).then(() => {
      fetchRooms(router.navigate("/dashboard/rooms"));
    });
  };

  const onCreateRoom = () => {
    fetchRooms(router.navigate("/dashboard/rooms"));
  };

  React.useEffect(fetchRooms, []);

  if (!rooms.length) return;

  const getPageContent = () => {
    if (id === "new")
      return <RoomNew onCreateRoom={onCreateRoom} facilities={facilities} />;
    if (id) {
      const room = rooms.find(room => String(room._id) === String(id));
      return (
        <RoomDetails
          room={room}
          onRemoveRoom={handleRemoveRoom}
          onFieldUpdate={handleFacilityUpdate}
        />
      );
    }
    return <RoomList rooms={rooms} />;
  };

  return <section>{getPageContent()}</section>;
};

Rooms.propTypes = {
  router: PropTypes.shape({
    navigate: PropTypes.func,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  allowedFacilities: PropTypes.arrayOf(PropTypes.string),
  canCreate: PropTypes.bool
};

Rooms.defaultProps = {
  allowedFacilities: null,
  canCreate: false
};

export default HocAuthentication(withRouter(Rooms, ["manager"]));
