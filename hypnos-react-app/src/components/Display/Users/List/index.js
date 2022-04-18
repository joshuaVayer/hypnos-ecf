import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import TableShaped from "@Display/Table/Shaped";

const { randomProfileImage } = require("@Utils/user");

import { PlusIcon, PencilIcon, ArrowSmUpIcon } from "@heroicons/react/outline";

import { Link } from "react-router-dom";

import ButtonPrimary from "@Controls/Buttons/Primary";

const UserList = ({ users }) => {
  const table = {
    cols: [
      {
        name: i18next.t("picture"),
        key: "picture"
      },
      {
        name: i18next.t("name"),
        key: "name"
      },
      {
        name: i18next.t("username"),
        key: "username"
      },
      {
        name: i18next.t("role"),
        key: "role"
      },
      {
        name: i18next.t("facility"),
        key: "facility"
      },
      {
        name: i18next.t("edit"),
        key: "edit"
      }
    ],
    lines: users.map(user => ({
      key: user._id,
      picture: (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={randomProfileImage()}
              alt=""
            />
          </div>
        </div>
      ),
      name: user.name,
      username: user.username,
      role: user.role ? (
        <span
          className={`bg-${i18next.t(
            `${user.role.name}_color`
          )}-500 text-${i18next.t(
            `${user.role.name}_color`
          )}-700 inline-flex rounded-full bg-opacity-30 px-2 text-xs font-semibold leading-5 `}
        >
          {/* <span className="bg-primary-500 text-primary-700" />
          <span className="bg-green-500 text-green-700" />
          <span className="bg-red-500  text-red-700" /> */}
          {i18next.t(user.role.name)}
        </span>
      ) : (
        ""
      ),
      facility: (
        <React.Fragment>
          {user.facilities.map(facility => (
            <Link
              key={facility._id}
              to={`/dashboard/facilities/${facility._id}`}
            >
              <div className="flex mb-2">
                <p className="relative">
                  {facility.name}
                  <ArrowSmUpIcon className="w-4 opacity-40 rotate-45 absolute -right-5 -top-2" />
                </p>
              </div>
            </Link>
          ))}
        </React.Fragment>
      ),
      edit: (
        <Link to={`/dashboard/users/${user._id}`}>
          <span className="flex justify-center">
            <PencilIcon className="w-4 transition-all hover:w-5" />
          </span>
        </Link>
      )
    }))
  };

  return (
    <div>
      <div className="flex flex-row justify-between my-4">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {i18next.t("all_users")}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {i18next.t("users_description")}
          </p>
        </div>
        <div className="self-center">
          <Link to="/dashboard/users/new">
            <ButtonPrimary>
              <div className="flex flex-row align-bottom text-sm gap-2 mx-2">
                <PlusIcon className="w-4" />
                <p className="font-medium truncate">{i18next.t("add_user")}</p>
              </div>
            </ButtonPrimary>
          </Link>
        </div>
      </div>
      <TableShaped shape={table} />
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      username: PropTypes.string,
      role: PropTypes.object,
      facility: PropTypes.array
    })
  )
};

export default UserList;
