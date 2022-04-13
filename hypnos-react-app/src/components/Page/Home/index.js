import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Hero from "@Display/Hero";
import ButtonPrimary from "@Controls/Buttons/Primary";

const CalloutCard = ({ image, title, description }) => (
  <div>
    <h3 className="text-xl font-raylig font-bold">{title}</h3>
    <div className=" w-1/4 my-1 border-b border-gray-300 h-1" />
    <p className="text-gray-600 text-lg truncate">{description}</p>
    <div style={{ height: "470px" }} className="mt-3">
      <img className="w-full h-full object-cover" src={image} />
    </div>
  </div>
);

CalloutCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const PageHome = () => (
  <React.Fragment>
    <div className="relative">
      <Hero />
    </div>
    <div className="mt-6 bg-white px-4 py-8">
      <div className=" flex justify-center">
        <h1 className="text-4xl tracking-tight font-raylig text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl bg-white">
          <span className="block text-primary-400 xl:inline">
            {i18next.t("callout_title")}
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mt-8">
        <CalloutCard
          title={i18next.t("callout_title_meeting")}
          description={i18next.t("callout_description_meeting")}
          image="https://images.unsplash.com/photo-1605797491749-0c6989a44356?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
        />
        <CalloutCard
          title={i18next.t("callout_title_weddings")}
          description={i18next.t("callout_description_weddings")}
          image="https://images.unsplash.com/photo-1542995096-2e8bc2e739ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2788&q=80"
        />
        <CalloutCard
          title={i18next.t("callout_title_birthdays")}
          description={i18next.t("callout_description_birthdays")}
          image="https://images.unsplash.com/photo-1510223861799-1b97de838135?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2154&q=80"
        />
        <div className="grid grid-cols-3 col-span-3 mt-4">
          <p className="col-span-2 text-xl font-raylig font-bold">
            {i18next.t("callout_title_more")}
          </p>
          <Link to="/facilities" className="col-span-1 w-2/3 m-auto px-2">
            <ButtonPrimary className="px-8 py-3 md:py-4 md:text-lg md:px-10">
              {i18next.t("contact_us")}
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default PageHome;
