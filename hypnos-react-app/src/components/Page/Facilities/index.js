import React from "react";

import { PhoneIcon, MapIcon } from "@heroicons/react/outline";
import FacilityService from "@Services/Facility";
import i18next from "i18next";
import { Link } from "react-router-dom";

const PageFacilities = () => {
  const [facilities, setFacilities] = React.useState([]);

  React.useEffect(() => {
    FacilityService.getAll().then(setFacilities);
  }, []);

  return (
    <div className="bg-gray-50 font-lora h-full px-6">
      <div className="pt-6 pb-2">
        <h1 className="text-4xl tracking-tight font-raylig text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
          <span className="block text-black xl:inline">
            {i18next.t("our_facilities")}
          </span>
        </h1>
      </div>
      {facilities.map(facility => (
        <div key={facility._id} className="cursor-pointer">
          <div className="w-full py-4">
            <div className="relative rounded-lg overflow-hidden lg:h-96">
              <Link to={`/facilities/${facility._id}`}>
                <div className="absolute inset-0 bg-primary">
                  <img
                    src={facility.coverImage}
                    alt=""
                    className="w-full h-full object-center object-cover hover:opacity-80"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="relative w-full h-96 lg:hidden hover:opacity-80"
                />
                <div
                  aria-hidden="true"
                  className="relative w-full h-32 lg:hidden hover:opacity-80"
                />
              </Link>
              <div className="absolute inset-x-0 bottom-0 bg-primary-600 bg-opacity-75 p-6 rounded-bl-lg rounded-br-lg backdrop-filter backdrop-blur sm:flex sm:items-center sm:justify-between lg:inset-y-0 lg:inset-x-auto lg:w-96 lg:rounded-tl-lg lg:rounded-br-none lg:flex-col lg:items-start">
                <div>
                  <h2 className="text-3xl font-bold text-white font-raylig">
                    {facility.name}
                  </h2>
                  <div className="border-b border-white w-1/3 my-2" />
                  <p className="mt-1 text-lg text-gray-300 overflow-auto flex">
                    <PhoneIcon className="mr-2 w-4" />
                    {facility.phone}
                  </p>
                  <div className="mt-1 text-lg text-gray-300 overflow-auto">
                    <p className="flex">
                      <MapIcon className="mr-2 w-4" />
                      <span>{facility.address}</span>
                    </p>
                    <p className="ml-6">
                      {facility.city} - {facility.zip}
                    </p>
                  </div>
                </div>
                <Link
                  to="/dashboard/new-booking"
                  onClick={() => {
                    localStorage.setItem("target", "/dashboard/new-booking");
                    localStorage.setItem("facility", JSON.stringify(facility));
                  }}
                  className="mt-6 flex-shrink-0 flex bg-white bg-opacity-0 py-3 px-4 border border-white border-opacity-25 rounded-md items-center justify-center text-base font-medium text-white hover:bg-opacity-10 sm:mt-0 sm:ml-8 lg:ml-0 lg:w-full"
                >
                  {i18next.t("book_now")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PageFacilities;
