import React from "react";
import i18next from "i18next";

import { Link } from "react-router-dom";
import ButtonPrimary from "@Controls/Buttons/Primary";

const Hero = () => (
  <React.Fragment>
    <div className="mx-auto max-w-7xl relative w-full pt-16 pb-20 text-center lg:py-48 lg:text-left z-10 ">
      <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16 ">
        <div className="bg-white bg-opacity-50">
          <h1 className="text-4xl tracking-tight font-raylig text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">
              {i18next.t("home_title_first")}
            </span>{" "}
            <span className="block text-primary-400 xl:inline">
              {i18next.t("home_title_second")}
            </span>
          </h1>
          <p className="mt-3 max-w-md font-extralight mx-auto text-lg text-gray-700 sm:text-xl md:mt-5 md:max-w-3xl ">
            {i18next.t("home_description")}
          </p>
        </div>
        <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <Link to="/facilities">
              <ButtonPrimary className="w-full flex items-center justify-center px-8 py-3 md:py-4 md:text-lg md:px-10">
                {i18next.t("explore_hotels")}
              </ButtonPrimary>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="relative w-full h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-2/3 lg:h-full">
      <img
        className="absolute inset-0 w-full h-full object-cover lg:p-6 -scale-x-100 brightness-75"
        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2960&q=80"
        alt=""
      />
    </div>
  </React.Fragment>
);

export default Hero;
