import React from "react";
import i18next from "i18next";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import RoomBooker from "@Display/RoomBooker";

const BookingNew = props => {
  return (
    <section>
      <div className="flex flex-row gap-4 ">
        <Link to="/dashboard" className="self-center">
          <ArrowNarrowLeftIcon className="h-8 w-8 text-gray-800 hover:text-gray-500 hover:cursor-pointer" />
        </Link>
        <div className="flex flex-row justify-between my-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {i18next.t("booking.new")}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {i18next.t("booking.new_description")}
            </p>
          </div>
        </div>
      </div>
      <RoomBooker key={1} {...props} />
    </section>
  );
};

export default BookingNew;
