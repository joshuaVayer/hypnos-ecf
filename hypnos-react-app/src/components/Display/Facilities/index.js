import React from "react";
import PropTypes from "prop-types";
import withRouter from "@Hoc/Router";

import FacilityService from "@Services/Facility";

import FacilityNew from "./New";
import FacilitiesList from "./List";
import FacilityDetails from "./Details";

const Facilities = ({ router, allowedFacilities, canCreate }) => {
  const { id } = router.params;
  const [facilities, setFacilities] = React.useState([]);

  const handleFacilityUpdate = (fieldName, newValue) => {
    console.log(fieldName, newValue);
    if (!id || id === "new") return;

    const facility = { _id: id, [fieldName]: newValue };

    FacilityService.update(facility).then(() => fetchFacilities());
  };

  const fetchFacilities = (callback = () => {}) =>
    FacilityService.getAll().then(facilities => {
      if (allowedFacilities && allowedFacilities.length) {
        setFacilities(
          facilities.filter(f => allowedFacilities.includes(f._id))
        );
        callback();
        return;
      }
      setFacilities(facilities);
      callback();
    });

  const handleRemoveFacility = () => {
    if (!id || id === "new") return;

    FacilityService.remove(id).then(() => {
      fetchFacilities(router.navigate("/dashboard/facilities"));
    });
  };

  const onCreateFacility = () => {
    fetchFacilities(router.navigate("/dashboard/facilities"));
  };

  React.useEffect(() => {
    if (!facilities.length) fetchFacilities();
  }, [facilities]);

  if (!facilities.length) return;

  const getPageContent = () => {
    if (id === "new")
      return <FacilityNew onCreateFacility={onCreateFacility} />;
    if (id) {
      const facility = facilities.find(
        facility => String(facility._id) === String(id)
      );
      return (
        <FacilityDetails
          facility={facility}
          onRemoveFacility={handleRemoveFacility}
          onFieldUpdate={handleFacilityUpdate}
        />
      );
    }
    return <FacilitiesList canCreate={canCreate} facilities={facilities} />;
  };

  return <section>{getPageContent()}</section>;
};

Facilities.propTypes = {
  router: PropTypes.shape({
    navigate: PropTypes.func,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  allowedFacilities: PropTypes.arrayOf(PropTypes.string),
  canCreate: PropTypes.bool
};

Facilities.defaultProps = {
  allowedFacilities: null,
  canCreate: false
};

export default withRouter(Facilities);
