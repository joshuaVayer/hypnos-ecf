import React from "react";
import PropTypes from "prop-types";

import FacilityPickerItem from "./items";

const PickerFacility = ({ facilities, onClick, startingFacilities }) => {
  const [selectedFacilities, setSelectedFacilities] =
    React.useState(startingFacilities);

  const handleOnClick = facility => {
    const newSelectedFacilities = selectedFacilities.slice();
    if (newSelectedFacilities.includes(facility)) {
      newSelectedFacilities.splice(newSelectedFacilities.indexOf(facility), 1);
    } else {
      newSelectedFacilities.push(facility);
    }
    setSelectedFacilities(newSelectedFacilities);
    onClick(newSelectedFacilities);
  };

  return (
    <div className="grid sm:grid-cols-2 gap-4 sm:items-start mb-4">
      {facilities.map(facility => (
        <FacilityPickerItem
          isActive={selectedFacilities.includes(facility._id)}
          key={facility._id}
          facility={facility}
          onClick={handleOnClick}
        />
      ))}
    </div>
  );
};

PickerFacility.propTypes = {
  facilities: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  startingFacilities: PropTypes.array
};

PickerFacility.defaultProps = {
  onClick: () => {},
  startingFacilities: []
};

export default PickerFacility;
