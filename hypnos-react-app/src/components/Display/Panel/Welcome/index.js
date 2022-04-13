import React from "react";
import PropTypes from "prop-types";
import i18next from "i18next";
import { Link } from "react-router-dom";

const PanelWelcome = ({ user }) => (
  <section aria-labelledby="profile-overview-title">
    <div className="rounded-lg bg-white overflow-hidden shadow">
      <div className="bg-white p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img
                className="mx-auto h-20 w-20 rounded-full"
                src={`${process.env.REACT_APP_UPLOAD_URL}/avatar.png`}
                alt=""
              />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-600">
                {i18next.t("welcome")}
              </p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                {user.name}
              </p>
              <p className="text-sm font-medium text-gray-600">
                {user.username}
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:mt-0">
            <Link to="/profile">
              <span className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                {i18next.t("view_profile")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

PanelWelcome.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    imageUrl: PropTypes.string
  }).isRequired
};

export default PanelWelcome;
