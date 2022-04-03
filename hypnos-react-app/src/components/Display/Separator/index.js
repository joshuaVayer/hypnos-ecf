import React from "react";
import PropTypes from "prop-types";

const Separator = ({ text }) => (
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300" />
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-2 bg-white text-gray-500">{text}</span>
    </div>
  </div>
);

Separator.propTypes = {
  text: PropTypes.string
};

Separator.defaultProps = {
  text: ""
};

export default Separator;
