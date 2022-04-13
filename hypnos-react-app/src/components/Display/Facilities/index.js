import React from "react";
import PropTypes from "prop-types";
import withRouter from "@Hoc/Router";

import FacilityService from "@Services/Facility";

import FacilityNew from "./New";
import FacilitiesList from "./List";
import FacilityDetails from "./Details";

const Facilities = ({ router }) => {
  const { id } = router.params;
  const [facilities, setFacilities] = React.useState([]);

  const handleFacilityUpdate = (fieldName, newValue) => {
    if (!id || id === "new") return;

    const facility = { _id: id, [fieldName]: newValue };

    FacilityService.update(facility).then(() => {
      FacilityService.getAll().then(facilities => {
        setFacilities(facilities);
      });
    });
  };

  const handleRemoveFacility = () => {
    if (!id || id === "new") return;

    FacilityService.remove(id).then(() => {
      FacilityService.getAll().then(facilities => {
        setFacilities(facilities);
        router.navigate("/dashboard/facilities");
      });
    });
  };

  const onCreateFacility = () => {
    FacilityService.getAll().then(facilities => {
      setFacilities(facilities);
      router.navigate("/dashboard/facilities");
    });
  };

  React.useEffect(() => {
    if (!facilities.length) {
      FacilityService.getAll().then(setFacilities);
    }
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
    return <FacilitiesList facilities={facilities} />;
  };

  return <section>{getPageContent()}</section>;
};

Facilities.propTypes = {
  router: PropTypes.shape({
    navigate: PropTypes.func,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default withRouter(Facilities);
