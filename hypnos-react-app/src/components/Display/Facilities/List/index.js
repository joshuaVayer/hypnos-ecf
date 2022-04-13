import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";

import { PlusIcon } from "@heroicons/react/outline";

import { Link } from "react-router-dom";
import CardFacility from "@Controls/Card/Facility";
import ButtonPrimary from "@Controls/Buttons/Primary";

const FacilityList = ({ facilities }) => {
  return (
    <div>
      <div className="flex flex-row justify-between my-4">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {i18next.t("all_facilities")}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {i18next.t("facilities_card_description")}
          </p>
        </div>
        <div className="self-center">
          <Link to="/dashboard/facilities/new">
            <ButtonPrimary>
              <div className="flex flex-row align-bottom text-sm gap-2 mx-2">
                <PlusIcon className="w-4" />
                <p className="font-medium truncate">
                  {i18next.t("add_facility")}
                </p>
              </div>
            </ButtonPrimary>
          </Link>
        </div>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2"
      >
        {facilities.map(facility => (
          <Link key={facility._id} to={`/dashboard/facilities/${facility._id}`}>
            <CardFacility facility={facility} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

FacilityList.propTypes = {
  facilities: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      description: PropTypes.string,
      address: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip: PropTypes.string,
      phone: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      imageUrl: PropTypes.string
    })
  ).isRequired
};

export default FacilityList;
