import i18next from "i18next";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { XCircleIcon } from "@heroicons/react/solid";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import { ArrowNarrowLeftIcon, PlusIcon } from "@heroicons/react/outline";

import RequireAuth from "@Hoc/Auth";
import { required, formStyle } from "@Utils/form";

import ModalMedia from "@Display/Modal/Media";
import CardMedia from "@Controls/Card/Media";
import FacilityService from "@Services/Facility";
import ButtonPrimary from "@Controls/Buttons/Primary";
import ButtonSecondary from "@Controls/Buttons/Secondary";

const FacilityNew = ({ onCreateFacility }) => {
  const navigate = useNavigate();
  const [openSelect, setOpenSelect] = React.useState(false);
  const [zip, setZip] = React.useState("");
  const [name, setName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [state, setState] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [coverImage, setCoverImage] = React.useState("");
  const [description, setDescription] = React.useState("");

  let form = null;
  let checkBtn = null;

  const handleOnSubmit = e => {
    e.preventDefault();
    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      const newFacility = {
        zip,
        name,
        city,
        state,
        phone,
        address,
        coverImage: coverImage.path,
        description
      };
      FacilityService.create(newFacility).then(() => {
        onCreateFacility();
      });
    }
  };

  const handleCancel = e => {
    e.preventDefault();
    navigate("/dashboard/facilities");
  };

  const onSelectMedia = media => {
    setCoverImage(media);
    setOpenSelect(false);
  };

  return (
    <div>
      <div className="flex flex-row gap-4 ">
        <Link to="/dashboard/facilities" className="self-center">
          <ArrowNarrowLeftIcon className="h-8 w-8 text-gray-800 hover:text-gray-500 hover:cursor-pointer" />
        </Link>
        <div className="flex flex-row justify-between my-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {i18next.t("new_facility")}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {i18next.t("facility_new_description")}
            </p>
          </div>
        </div>
      </div>
      <Form onSubmit={handleOnSubmit} ref={c => (form = c)}>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("facility_name")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <Input
              type="text"
              className={formStyle.input}
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              validations={[required]}
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("description")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <TextArea
              type="textarea"
              name="description"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              validations={[required]}
              className={`${formStyle.textArea}`}
            />
            <p className="mt-2 text-sm text-gray-500">
              {i18next.t("facilities_new_about_description")}
            </p>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("phone")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <Input
              type="text"
              className={formStyle.input}
              name="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              validations={[required]}
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            {i18next.t("cover_image")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <ButtonSecondary onClick={() => setOpenSelect(true)}>
              <span className="flex flex-col">
                <PlusIcon className="h-8 w-8 self-center" />
                {i18next.t("select_image")}
              </span>
            </ButtonSecondary>
          </div>
          {openSelect && (
            <ModalMedia
              onCancel={() => setOpenSelect(false)}
              onSelectMedia={onSelectMedia}
              isOpen={openSelect}
            />
          )}
          {coverImage && (
            <div className="relative ml-5">
              <button className="absolute" onClick={() => setCoverImage("")}>
                <XCircleIcon className="h-6 w-6 text-red-700  hover:opacity-60 absolute -top-3 -left-3 z-10 rounded-full" />
              </button>
              <ul
                role="list"
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
              >
                <CardMedia media={coverImage} className="mt-4" />
              </ul>
            </div>
          )}
        </div>
        {/* Address Section */}
        <div className="flex flex-row justify-between my-4 mt-10">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {i18next.t("facility_address")}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {i18next.t("address_section_description")}
            </p>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("state")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <Input
              type="text"
              className={formStyle.input}
              name="state"
              value={state}
              onChange={e => setState(e.target.value)}
              validations={[required]}
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("address")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <Input
              type="text"
              className={formStyle.input}
              name="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              validations={[required]}
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("city")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <Input
              type="text"
              className={formStyle.input}
              name="city"
              value={city}
              onChange={e => setCity(e.target.value)}
              validations={[required]}
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="zip"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("zip")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <Input
              type="text"
              className={formStyle.input}
              name="zip"
              value={zip}
              onChange={e => setZip(e.target.value)}
              validations={[required]}
            />
          </div>
        </div>
        <CheckButton
          style={{ display: "none" }}
          ref={c => {
            checkBtn = c;
          }}
        />
        <div className="flex flex-row justify-end">
          <div className="flex flex-row gap-4">
            <ButtonSecondary onClick={handleCancel}>
              {i18next.t("cancel")}
            </ButtonSecondary>
            <ButtonPrimary>{i18next.t("create")}</ButtonPrimary>
          </div>
        </div>
      </Form>
    </div>
  );
};

FacilityNew.propTypes = {
  onCreateFacility: PropTypes.func.isRequired
};

export default RequireAuth(FacilityNew, ["admin"]);
