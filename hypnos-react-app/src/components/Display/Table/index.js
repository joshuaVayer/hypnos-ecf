import React from "react";
import PropTypes from "prop-types";

import Line from "@Display/Table/Line";
import LineEditable from "@Display/Table/Line/Editable";

const Table = ({ lines }) => {
  if (!lines || !lines.length) return null;

  return (
    <div className="mt-5 border-t border-gray-200">
      <dl className="divide-y divide-gray-200">
        {lines.map((lineProps, index) => {
          if (lineProps.editing) {
            return <LineEditable key={index} {...lineProps} />;
          }
          return <Line key={index} {...lineProps} />;
        })}
      </dl>
    </div>
  );
};

Table.propTypes = {
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
      action: PropTypes.element
    })
  )
};

Table.defaultProps = {
  lines: []
};

export default Table;
