import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import FacilityService from "@Services/Facility";
import withRouter from "@Hoc/Router";
import PickerFacility from "@Controls/Picker/Facility";
import { lines } from "./helper";

import UserService from "@Services/User";

import Table from "@Display/Table";

const UserDetails = ({ user, onUserUpdate }) => {
  const [facilitiesOptions, setFacilitiesOptions] = React.useState([]);
  const tableFields = lines(user);

  React.useEffect(() => {
    FacilityService.getAll().then(setFacilitiesOptions);
  }, []);

  const handleFacilityChange = facilities => {
    UserService.update({ ...user, facilities }, false).then(onUserUpdate);
  };

  return (
    <React.Fragment>
      <div className="flex flex-row gap-4">
        <Link to="/dashboard/users" className="self-center">
          <ArrowNarrowLeftIcon className="h-8 w-8 text-gray-800 hover:text-gray-500 hover:cursor-pointer" />
        </Link>
        <div className="flex flex-row justify-between my-4 w-full">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex">
              {user.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {i18next.t("users_edit_description")}
            </p>
          </div>
        </div>
      </div>
      <Table lines={tableFields} />
      {user.role && user.role.name === "manager" && (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="facilities"
            className="block text-sm font-medium text-gray-500"
          >
            {i18next.t("facilities")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            {facilitiesOptions.length > 0 && (
              <PickerFacility
                startingFacilities={
                  user.facilities ? user.facilities.map(({ _id }) => _id) : []
                }
                facilities={facilitiesOptions}
                onClick={handleFacilityChange}
              />
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

UserDetails.propTypes = {
  user: PropTypes.object,
  onUserUpdate: PropTypes.func
};

UserDetails.defaultProps = {
  user: {},
  onUserUpdate: () => {}
};

export default withRouter(UserDetails);
