/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import PropTypes from "prop-types";
import { toFriendlyString, areSameDay } from "@Utils/dates";

import List from "./list";
import PickerDate from "@Controls/Picker/Date";

const BookingList = ({ bookings }) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleSelect = date => {
    setSelectedDate(date);
  };

  const filteredBookings = bookings.filter(
    booking =>
      areSameDay(selectedDate, new Date(booking.startDate)) && booking.active
  );

  const bookingsByFacility = filteredBookings.reduce((acc, booking) => {
    const facility = booking.facility;
    if (!facility) return acc;
    if (!acc[facility._id]) acc[facility._id] = [];
    acc[facility._id].push(booking);
    return acc;
  }, {});

  const facilities = filteredBookings.map(booking => booking.facility);
  const removeDuplicates = facilities => {
    const output = [];
    facilities.forEach(facility => {
      if (!output.find(f => f._id === facility._id)) output.push(facility);
    });
    return output;
  };

  return (
    <div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <PickerDate selectedDate={selectedDate} handleSelect={handleSelect} />
        {removeDuplicates(facilities).map(facility => (
          <div key={facility._id} className="lg:col-span-7 xl:col-span-8 mt-4">
            <List
              bookings={bookingsByFacility[facility._id]}
              header={
                <h3 className="text-lg font-semibold text-gray-900">
                  <span className="font-light"> Réservations pour </span>
                  {facility.name}
                  <span className="font-light"> à la date du </span>
                  {toFriendlyString(selectedDate)}
                </h3>
              }
            />
          </div>
        ))}
        {removeDuplicates(facilities).length === 0 && (
          <div className="lg:col-span-7 xl:col-span-8 mt-10 flex h-full">
            <h3 className="text-xl text-center flex-1 text-gray-400">
              Aucune réservation pour le {toFriendlyString(selectedDate)}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

BookingList.propTypes = {
  bookings: PropTypes.array.isRequired
};

export default BookingList;
