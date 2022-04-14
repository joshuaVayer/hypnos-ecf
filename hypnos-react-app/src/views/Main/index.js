import React from "react";
import withRouter from "@Hoc/Router";
import PropTypes from "prop-types";

import PageHome from "@Page/Home";
import Header from "@Controls/Header";
import PageFacilityDetails from "@Page/FacilityDetails";
import PageFacilities from "@Page/Facilities";
import PageContact from "@Page/Contact";

const Main = props => {
  const getPage = () => {
    const { view, id } = props.router.params;
    if (view === "facilities" && id) return <PageFacilityDetails id={id} />;
    if (view === "facilities") return <PageFacilities />;
    if (view === "contact") return <PageContact />;
    return <PageHome />;
  };

  return (
    <div className="bg-gray-50 font-lora min-h-screen">
      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
        <Header />
        {getPage()}
      </main>
    </div>
  );
};

Main.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(Main);
