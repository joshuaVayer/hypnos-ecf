import React from "react";
import PropTypes from "prop-types";
import { PhoneIcon, MapIcon, ChevronRightIcon } from "@heroicons/react/outline";

const DEFAULT_IMAGE =
  "https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png";

const CardFacility = ({ facility, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const handleOnClick = () => {
    onClick(facility);
  };

  return (
    <li
      key={facility.email}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleOnClick}
      className="col-span-1 bg-white rounded-lg shadow divide-y border border-gray-200 hover:opacity-75 transition ease-in-out duration-150 cursor-pointer"
    >
      <div className="w-full flex items-center justify-between">
        <img
          className="w-60 h-40 object-cover bg-gray-300 rounded-l-lg flex-shrink-0"
          src={facility.coverImage || DEFAULT_IMAGE}
          alt=""
        />
        <div className="flex-1 p-6 truncate">
          <div className="flex items-center space-x-3 relative -mt-1">
            <h3 className="text-gray-900 text-lg font-medium truncate">
              {facility.name}
            </h3>
            {/* <div className="absolute inset-0 flex items-end -left-3 -bottom-1">
              <div className="w-full border-t border-gray-300" />
            </div> */}
          </div>
          <p className="mt-2 text-gray-500 text-sm truncate flex flex-row gap-2">
            <PhoneIcon className="w-4 h-4 text-gray-500 mt-1" />
            {facility.phone}
          </p>
          <p className="mt-1 text-gray-500 text-sm truncate flex flex-row gap-2">
            <MapIcon className="w-4 h-4 text-gray-500 mt-1" />
            <span className="flex flex-col">
              <span>{facility.address}</span>
              <span>{`${facility.city}, ${facility.zip} - ${facility.state}`}</span>
            </span>
          </p>
        </div>
        {isHovered && (
          <ChevronRightIcon className="w-10 h-10 mr-5 text-gray-300 animate-bounce" />
        )}
      </div>
    </li>
  );
};

CardFacility.propTypes = {
  facility: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    coverImage: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func
};

CardFacility.defaultProps = {
  onClick: () => {}
};

export default CardFacility;
