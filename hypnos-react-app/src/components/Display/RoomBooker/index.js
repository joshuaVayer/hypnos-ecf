import React from "react";
import PropTypes from "prop-types";
import { areSameDay, isBefore } from "@Utils/dates";

import RoomBookerForm from "./form";
import PickerDate from "@Controls/Picker/Date";

const RoomBooker = ({ facility, room, noFacilityUpdate, shouldRedirect }) => {
  const [endingDate, setEndingDate] = React.useState();
  const [startingDate, setStartingDate] = React.useState();

  React.useEffect(() => {}, []);

  const handleSelectDate = date => {
    if (areSameDay(date, startingDate)) {
      setStartingDate(null);
      setEndingDate(null);
      return;
    }
    if (!startingDate) {
      setStartingDate(date);
      return;
    } else {
      if (isBefore(date, startingDate)) {
        setStartingDate(date);
        return;
      }
      setEndingDate(date);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 md:gap-8">
      <div className="col-span-3 sm:col-span-2">
        <RoomBookerForm
          facility={facility}
          room={room}
          startingDate={startingDate}
          endingDate={endingDate || startingDate}
          noFacilityUpdate={noFacilityUpdate}
          shouldRedirect={shouldRedirect}
        />
      </div>
      <div>
        <PickerDate
          timeWindow={[startingDate, endingDate]}
          isWindow
          handleSelect={handleSelectDate}
        />
      </div>
    </div>
  );
};

RoomBooker.propTypes = {
  facility: PropTypes.object,
  room: PropTypes.object,
  noFacilityUpdate: PropTypes.bool,
  shouldRedirect: PropTypes.bool
};

RoomBooker.defaultProps = {
  facility: {},
  room: {},
  noFacilityUpdate: false,
  shouldRedirect: false
};

export default RoomBooker;
