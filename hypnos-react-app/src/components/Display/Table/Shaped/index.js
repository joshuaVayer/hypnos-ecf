import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { InboxIcon } from "@heroicons/react/outline";

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
      {lines && lines.length > 0 ? (
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
      ) : (
        <tbody>
          <tr>
            <td colSpan={cols.length}>
              <div className="text-center">
                <div className="w-full flex justify-center align-middle gap-2">
                  <InboxIcon className="text-gray-400 w-10 text-center" />
                  <h3 className="mt-2 text-sm font-light text-gray-500">
                    {i18next.t("empty_table")}
                  </h3>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      )}
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
