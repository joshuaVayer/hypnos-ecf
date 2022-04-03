import React from "react";
import PropTypes from "prop-types";
// import { XIcon } from "@heroicons/react/solid";

import styles from "./styles";

const Alert = ({ text, className, type }) => {
  return (
    <div className={`rounded-md p-4 ${styles[type].mainBg} ${className || ""}`}>
      <div className="flex">
        <div className="flex-shrink-0">{styles[type].icon}</div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${styles[type].text}`}>{text}</p>
        </div>
        <div className="ml-auto pl-3">
          {/* <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles[type].btn}`}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]),
  className: PropTypes.string
};

Alert.defaultProps = {
  type: "success",
  className: ""
};

export default Alert;
