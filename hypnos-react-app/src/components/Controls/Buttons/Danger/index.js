import React from "react";
import PropTypes from "prop-types";

import { SpinnerCircular } from "spinners-react";

const ButtonDanger = ({ children, className, loading, ...props }) => {
  return (
    <button
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${className}`}
      {...props}
    >
      <span>{children}</span>
      {loading && (
        <span className="spinner-border spinner-border-sm pl-2">
          <SpinnerCircular size="20px" color="white" />
        </span>
      )}
    </button>
  );
};

ButtonDanger.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string
};

ButtonDanger.defaultProps = {
  className: "",
  loading: false
};

export default ButtonDanger;
