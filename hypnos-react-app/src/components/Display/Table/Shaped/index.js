import React from "react";
import PropTypes from "prop-types";

const TableShaped = ({ shape }) => {
  const { cols, lines } = shape;

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          {cols.map(col => (
            <th
              key={col.key}
              className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ${col.headerClassName}`}
            >
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {lines.map(line => (
          <tr key={line.key}>
            {cols.map(col => (
              <td
                key={col.key}
                className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${col.contentClassName}`}
              >
                {line[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableShaped.propTypes = {
  shape: PropTypes.shape({
    cols: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
        headerClassName: PropTypes.string,
        contentClassName: PropTypes.string
      })
    ),
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        [PropTypes.string]: PropTypes.any
      })
    )
  })
};

TableShaped.defaultProps = {
  lines: []
};

export default TableShaped;
