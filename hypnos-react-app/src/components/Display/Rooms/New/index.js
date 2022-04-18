import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

import { XCircleIcon } from "@heroicons/react/solid";
import { ArrowNarrowLeftIcon, PlusIcon } from "@heroicons/react/outline";

import RequireAuth from "@Hoc/Auth";

import { required, formStyle } from "@Utils/form";

import RoomService from "@Services/Room";

import CardMedia from "@Controls/Card/Media";
import ModalMedia from "@Display/Modal/Media";
import BadgeImage from "@Controls/Badge/Image";
import ButtonPrimary from "@Controls/Buttons/Primary";
import ButtonSecondary from "@Controls/Buttons/Secondary";

const RoomNew = ({ onCreateRoom, facilities }) => {
  const navigate = useNavigate();
  const [price, setPrice] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [capacity, setCapacity] = React.useState("");
  const [facility, setFacility] = React.useState(
    facilities && facilities[0] ? facilities[0] : {}
  );
  const [roomNumber, setRoomNumber] = React.useState("");
  const [coverImage, setCoverImage] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [openSelect, setOpenSelect] = React.useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);

  let form = null;
  let checkBtn = null;

  const handleOnSubmit = e => {
    e.preventDefault();
    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      const newRoom = {
        roomNumber,
        capacity,
        images,
        facility: facility._id,
        coverImage: coverImage.path,
        description
      };
      RoomService.create(newRoom).then(() => {
        onCreateRoom();
      });
    }
  };

  const handleCancel = e => {
    e.preventDefault();
    navigate("/dashboard/rooms");
  };

  const onSelectMedia = media => {
    setCoverImage(media);
    setOpenSelect(false);
  };

  const handleFacilityChange = e => {
    const facilityId = e.target.value;
    const facility = this.state.facilitiesOptions.find(
      facility => facility._id === facilityId
    );
    setFacility(facility);
  };

  const handleSelectGalleryImage = image => {
    if (!image || !image.path) return;
    const newImages = [...images];
    newImages.push(image.path);
    setIsGalleryOpen(false);
    setImages(newImages);
  };

  const handleRemoveGalleryImage = image => {
    const newImages = images.filter(img => img !== image);
    setImages(newImages);
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
            htmlFor="roomNumber"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("room.roomNumber")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <Input
              type="text"
              className={formStyle.input}
              name="roomNumber"
              value={roomNumber}
              onChange={e => setRoomNumber(e.target.value)}
              validations={[required]}
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="facility"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("room.facility")}
          </label>
          <div className="mt-1 col-span-2 sm:mt-0 lg:col-span-1">
            <Select
              name="facility"
              disabled={facilities.length < 2}
              className={formStyle.input}
              value={facility._id}
              onChange={handleFacilityChange}
              validations={[required]}
            >
              {facilities.map(facility => (
                <option key={facility._id} value={facility._id}>
                  {facility.name}
                </option>
              ))}
            </Select>
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
              {i18next.t("room.description_description")}
            </p>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("room.price")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <Input
              type="text"
              className={formStyle.input}
              name="price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              validations={[required]}
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("room.capacity")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <Input
              type="text"
              className={formStyle.input}
              name="capacity"
              value={capacity}
              onChange={e => setCapacity(e.target.value)}
              validations={[required]}
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            {i18next.t("cover_image")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <ButtonSecondary
              onClick={e => {
                e.preventDefault();
                setOpenSelect(true);
              }}
            >
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
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-8">
          <label
            htmlFor="gallery"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            {i18next.t("room.gallery")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            {images.length > 0 ? (
              <div className="flex">
                {images.map(image => (
                  <BadgeImage
                    key={image}
                    src={image}
                    alt={image}
                    onRemove={handleRemoveGalleryImage}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                {i18next.t("room.gallery_no_image")}
              </p>
            )}
          </div>
          <span className="sm:col-span-1" />
          <span className="flex-shrink-0">
            <ButtonSecondary
              onClick={e => {
                e.preventDefault();
                setIsGalleryOpen(true);
              }}
            >
              <div className="flex gap-2">
                <PlusIcon className="h-4 w-4 self-center" />
                {i18next.t("room.add_image")}
              </div>
            </ButtonSecondary>
          </span>
          {isGalleryOpen && (
            <ModalMedia
              isOpen={isGalleryOpen}
              onCancel={() => setIsGalleryOpen(false)}
              onSelectMedia={handleSelectGalleryImage}
            />
          )}
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

RoomNew.propTypes = {
  onCreateRoom: PropTypes.func.isRequired,
  facilities: PropTypes.array
};

RoomNew.defaultProps = {
  facilities: []
};

export default RequireAuth(RoomNew, ["manager"]);
