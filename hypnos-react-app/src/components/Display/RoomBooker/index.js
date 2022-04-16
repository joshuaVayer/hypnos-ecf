import React from "react";
import PropTypes from "prop-types";
import { areSameDay, isBefore } from "@Utils/dates";

import { tomorrow } from "@Utils/dates";
import RoomBookerForm from "./form";
import PickerDate from "@Controls/Picker/Date";

const RoomBooker = ({ facility, room, noFacilityUpdate, shouldRedirect }) => {
  const storedFacility = JSON.parse(localStorage.getItem("facility"));
  const storedRoom = JSON.parse(localStorage.getItem("room"));
  const storedStartDate = JSON.parse(localStorage.getItem("startingDate"));
  const storedEndDate = JSON.parse(localStorage.getItem("endingDate"));
  const storageKeys = ["facility", "room", "endingDate", "startingDate"];
  storageKeys.forEach(key => localStorage.removeItem(key));

  const [endingDate, setEndingDate] = React.useState(
    storedStartDate ? new Date(storedStartDate) : tomorrow
  );
  const [startingDate, setStartingDate] = React.useState(
    storedEndDate ? new Date(storedEndDate) : tomorrow
  );

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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
      <div className="col-span-1 sm:col-span-2">
        <RoomBookerForm
          facility={storedFacility || facility}
          room={storedRoom || room}
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
