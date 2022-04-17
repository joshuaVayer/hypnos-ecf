import React from "react";
import PropTypes from "prop-types";

import CardMedia from "@Controls/Card/Media";

const Line = ({ label, value, action, sensitive, type }) => (
  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      {type === "mediaPicker" ? (
        <div className="h-auto w-60 list-none">
          <CardMedia media={{ path: value }} />
        </div>
      ) : (
        <React.Fragment>
          {sensitive ? (
            <div className="flex-grow">
              <span className="text-gray-500 text-3xl">..............</span>
            </div>
          ) : (
            <span className="flex-grow">{value}</span>
          )}
        </React.Fragment>
      )}
      {action && <span className="ml-4 flex-shrink-0">{action}</span>}
    </dd>
  </div>
);

Line.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  sensitive: PropTypes.bool,
  action: PropTypes.element
};

Line.defaultProps = {
  sensitive: false,
  action: null
};

export default Line;
