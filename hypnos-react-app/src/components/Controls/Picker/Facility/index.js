import React from "react";
import PropTypes from "prop-types";

import FacilityPickerItem from "./items";

const PickerFacility = ({ facilities, onClick }) => {
  const [selectedFacilities, setSelectedFacilities] = React.useState([]);

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
  onClick: PropTypes.func
};

PickerFacility.defaultProps = {
  onClick: () => {}
};

export default PickerFacility;
