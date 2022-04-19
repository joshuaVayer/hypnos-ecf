import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import {
  XCircleIcon,
  ChevronRightIcon,
  ArrowNarrowLeftIcon
} from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import TableShaped from "@Display/Table/Shaped";
import ButtonDanger from "@Controls/Buttons/Danger";

import { isAfter, isBefore, toFriendlyString, todayPlus } from "@Utils/dates";

const BookingsClients = ({ bookings, onCancelBooking }) => {
  const today = new Date();
  const activeBkgs = bookings.filter(({ active }) => active);
  const inactiveBkgs = bookings.filter(({ active }) => !active);
  const passedBkgs = activeBkgs.filter(({ endDate }) =>
    isAfter(today, endDate)
  );
  const currentBkgs = activeBkgs.filter(({ endDate }) =>
    isBefore(today, endDate)
  );

  const tableShape = (filteredBookings, remove = []) => {
    const output = {
      cols: [
        {
          name: i18next.t("start_date"),
          key: "startDate"
        },
        {
          name: i18next.t("end_date"),
          key: "endDate"
        },
        {
          name: i18next.t("booked_room"),
          key: "room"
        },
        {
          name: i18next.t("capacity"),
          key: "capacity"
        },
        {
          name: i18next.t("facility"),
          key: "facility"
        },
        {
          name: i18next.t("cancel"),
          key: "cancel"
        }
      ],
      lines: filteredBookings.map(booking => ({
        startDate: toFriendlyString(new Date(booking.startDate)),
        endDate: toFriendlyString(new Date(booking.endDate)),
        capacity: booking.room.capacity,
        key: booking._id,
        room: booking.room.roomNumber,
        facility: booking.facility.name,
        cancel: isBefore(todayPlus(3), booking.startDate) ? (
          <ButtonDanger
            className="w-24"
            onClick={() => onCancelBooking(booking._id)}
          >
            <div className="flex flex-row align-bottom text-sm gap-2">
              <p className="font-medium truncate">{i18next.t("cancel")}</p>
              <XCircleIcon className="w-5" />
            </div>
          </ButtonDanger>
        ) : (
          <div className="text-sm font-light italic text-gray-400">
            <p>{i18next.t("cant_cancel")}</p>
            <p>{i18next.t("contact_facility")}</p>
          </div>
        )
      }))
    };

    remove.forEach(key => {
      output.cols = output.cols.filter(col => col.key !== key);
    });

    return output;
  };

  return (
    <div>
      <div className="flex flex-row gap-4 ">
        <Link to="/dashboard" className="self-center">
          <ArrowNarrowLeftIcon className="h-8 w-8 text-gray-800 hover:text-gray-500 hover:cursor-pointer" />
        </Link>
        <div className="flex flex-row justify-between my-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {i18next.t("bookings.clients.title")}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {i18next.t("bookings.clients.description")}
            </p>
          </div>
        </div>
      </div>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            {currentBkgs && (
              <div className="my-6">
                <Disclosure.Button className="py-2 px-4 flex align-middle justify-between w-full text-primary bg-primary bg-opacity-25 rounded-lg hover:bg-opacity-40 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
                  <h4 className="text-lg leading-6 font-medium text-gray-900">
                    {i18next.t("bookings.clients.current")}
                  </h4>
                  <ChevronRightIcon
                    className={`w-5 transition-all duration-300 ${
                      open ? "transform rotate-90" : "transform -rotate-90"
                    }`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel>
                  <TableShaped shape={tableShape(currentBkgs)} />
                </Disclosure.Panel>
              </div>
            )}
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            {passedBkgs && (
              <div className="my-6">
                <Disclosure.Button className="py-2 px-4 flex align-middle justify-between w-full text-primary bg-primary bg-opacity-25 rounded-lg hover:bg-opacity-40 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
                  <h4 className="text-lg leading-6 font-medium text-gray-900">
                    {i18next.t("bookings.clients.passed")}
                  </h4>
                  <ChevronRightIcon
                    className={`w-5 transition-all duration-300 ${
                      open ? "transform rotate-90" : "transform -rotate-90"
                    }`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel>
                  <TableShaped shape={tableShape(passedBkgs, ["cancel"])} />
                </Disclosure.Panel>
              </div>
            )}
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            {inactiveBkgs && (
              <div className="my-6">
                <Disclosure.Button className="py-2 px-4 flex align-middle justify-between w-full text-primary bg-primary bg-opacity-25 rounded-lg hover:bg-opacity-40 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
                  <h4 className="text-lg leading-6 font-medium text-gray-900">
                    {i18next.t("bookings.clients.inactive")}
                  </h4>
                  <ChevronRightIcon
                    className={`w-5 transition-all duration-300 ${
                      open ? "transform rotate-90" : "transform -rotate-90"
                    }`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel>
                  <TableShaped shape={tableShape(inactiveBkgs, ["cancel"])} />
                </Disclosure.Panel>
              </div>
            )}
          </>
        )}
      </Disclosure>
    </div>
  );
};

BookingsClients.propTypes = {
  bookings: PropTypes.array,
  onCancelBooking: PropTypes.func
};

BookingsClients.defaultProps = {
  bookings: [],
  onCancelBooking: () => {}
};

export default BookingsClients;
