import React from "react";
import PropTypes from "prop-types";

import withRouter from "@Hoc/Router";

import PageHome from "@Page/Home";
import PageContact from "@Page/Contact";
import ForbidenPage from "@Page/Forbiden";
import Header from "@Display/Header/Main";
import PageFacilities from "@Page/Facilities";
import PageFacilityDetails from "@Page/FacilityDetails";

const Main = props => {
  const getPage = () => {
    const { view, id } = props.router.params;
    if (view === "contact") return <PageContact />;
    if (view === "forbidden") return <ForbidenPage />;
    if (view === "facilities" && !id) return <PageFacilities />;
    if (view === "facilities" && id) return <PageFacilityDetails id={id} />;
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
