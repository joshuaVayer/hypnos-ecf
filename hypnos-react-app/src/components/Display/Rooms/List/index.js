import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  PencilIcon,
  PlusIcon,
  ArrowNarrowLeftIcon
} from "@heroicons/react/outline";
import ButtonPrimary from "@Controls/Buttons/Primary";

import TableShaped from "@Display/Table/Shaped";
const DEFAULT_IMAGE =
  "https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png";

const beautifyPrice = price => {
  if (!price && price == 0 && price.length < 2) return "Price not set";
  const euros = price / 100;
  const cents = String(price).slice(-2);
  return `${euros}, ${cents} €`;
};

const RoomList = ({ rooms }) => {
  const table = {
    cols: [
      {
        name: i18next.t("room.cover"),
        key: "cover"
      },
      {
        name: i18next.t("room.name"),
        key: "name"
      },
      {
        name: i18next.t("room.capacity"),
        key: "capacity"
      },
      {
        name: i18next.t("room.price"),
        key: "price"
      },
      {
        name: i18next.t("edit"),
        key: "edit"
      }
    ],
    lines: rooms.map(room => ({
      key: room._id,
      cover: (
        <div className="flex items-center">
          <div className="h-10 w-10 transition-all hover:h-24 hover:w-24 flex-shrink-0">
            <img
              className="h-10 w-10 transition-all rounded-full hover:h-24 hover:w-24"
              src={room.coverImage || DEFAULT_IMAGE}
              alt=""
            />
          </div>
        </div>
      ),
      name: room.roomNumber,
      capacity: `${room.capacity} ${i18next.t("people")}`,
      price: beautifyPrice(room.price),
      edit: (
        <Link to={`/dashboard/rooms/${room._id}`}>
          <span className="flex justify-center">
            <PencilIcon className="w-4 transition-all hover:w-5" />
          </span>
        </Link>
      )
    }))
  };

  return (
    <section>
      <div className="flex flex-row justify-between my-4">
        <div>
          <div className="flex gap-4">
            <Link to="/dashboard" className="self-center">
              <ArrowNarrowLeftIcon className="h-8 w-8 text-gray-800 hover:text-gray-500 hover:cursor-pointer" />
            </Link>
            <h3 className="text-lg font-medium text-gray-900">
              {i18next.t("room.all_rooms")}
            </h3>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {i18next.t("room.rooms_description")}
          </p>
        </div>
        <div className="self-center">
          <Link to="/dashboard/rooms/new">
            <ButtonPrimary>
              <div className="flex flex-row align-bottom text-sm gap-2 mx-2">
                <PlusIcon className="w-4" />
                <p className="font-medium truncate">
                  {i18next.t("room.add_room")}
                </p>
              </div>
            </ButtonPrimary>
          </Link>
        </div>
      </div>
      <TableShaped shape={table} />
    </section>
  );
};

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object)
};

export default RoomList;
