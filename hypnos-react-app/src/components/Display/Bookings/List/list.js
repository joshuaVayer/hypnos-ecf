import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { CalendarIcon, BellIcon } from "@heroicons/react/solid";

const { randomProfileImage } = require("@Utils/user");
import { toFriendlyString, areSameDay } from "@Utils/dates";

const List = ({ bookings, header }) => (
  <div>
    {header && header}
    <ol className=" divide-y divide-gray-100 text-sm leading-6">
      {bookings.map(booking => (
        <li
          key={booking._id}
          className="relative flex space-x-6 py-6 xl:static"
        >
          <img
            src={randomProfileImage()}
            alt=""
            className="h-14 w-14 flex-none rounded-full"
          />
          <div className="flex-auto">
            <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
              {booking.user.name}
            </h3>
            <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
              <div className="flex items-start space-x-3">
                <dt className="mt-0.5">
                  <span className="sr-only">Date</span>
                  <CalendarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  {/* eslint-disable-next-line prettier/prettier */}
                  {areSameDay(booking.startDate, booking.endDate) ? (
                    <time dateTime={booking.startDate}>
                      {`${i18next.t("date.the")} ${toFriendlyString(
                        new Date(booking.startDate)
                      )}`}
                    </time>
                  ) : (
                    <>
                      <time dateTime={booking.startDate}>
                        {`${i18next.t("date.from")} ${toFriendlyString(
                          new Date(booking.startDate)
                        )} ${i18next.t("date.to")} ${toFriendlyString(
                          new Date(booking.endDate)
                        )}`}
                      </time>
                    </>
                  )}
                </dd>
              </div>
              <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                <dt className="mt-0.5">
                  <span className="sr-only">Location</span>
                  <BellIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>{booking.room.roomNumber}</dd>
              </div>
            </dl>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

List.propTypes = {
  header: PropTypes.element,
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      room: PropTypes.shape({
        roomNumber: PropTypes.string.isRequired
      }).isRequired,
      startDate: PropTypes.string.isRequired,
      datetimeEnd: PropTypes.string.isRequired
    })
  )
};

export default List;
