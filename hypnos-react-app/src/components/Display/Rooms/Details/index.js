import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowNarrowLeftIcon, XCircleIcon } from "@heroicons/react/outline";

import withRouter from "@Hoc/Router";

import { lines } from "./helper";

import Table from "@Display/Table";
import ModalMedia from "@Display/Modal/Media";
import BadgeImage from "@Controls/Badge/Image";
import ButtonDanger from "@Controls/Buttons/Danger";
import ButtonSecondary from "@Controls/Buttons/Secondary";

class RoomDetails extends React.Component {
  constructor(props) {
    super(props);

    this.resetFields = this.resetFields.bind(this);
    this.handleEditLine = this.handleEditLine.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);

    this.initialState = {
      commonFields: lines(this.props.room, fieldName => {
        this.setState({
          commonFields: this.handleEditLine(this.state.commonFields, fieldName)
        });
      })
    };

    this.state = {
      ...this.initialState,
      room: this.props.room,
      images: this.props.room.images,
      isGalleryOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.room) !== JSON.stringify(this.props.room)) {
      this.setState({
        room: this.props.room,
        commonFields: lines(this.props.room, fieldName => {
          this.setState({
            commonFields: this.handleEditLine(
              this.state.commonFields,
              fieldName
            )
          });
        })
      });
    }
  }

  resetFields() {
    this.setState({ ...this.initialState, room: this.props.room });
  }

  handleEditLine(fields, fieldName) {
    this.resetFields();

    const safeLines = fields.map(line => {
      if (line.fieldName === fieldName) {
        return {
          ...line,
          name: fieldName,
          editing: true,
          onSubmit: newValue => this.handleSubmit(fieldName, newValue),
          onCancel: () => this.resetFields()
        };
      }
      return line;
    });

    return safeLines;
  }

  handleSubmit(fieldName, newValue) {
    this.props.onFieldUpdate(fieldName, newValue);
    this.resetFields();
  }

  handleCancelModal() {
    this.setState({ isGalleryOpen: false });
  }

  handleSelectImage(image) {
    if (!image || !image.path) return;
    const newImages = this.state.images;
    newImages.push(image.path);
    this.setState({ images: newImages, isGalleryOpen: false });
    this.handleSubmit("images", newImages);
  }

  handleRemoveImage(image) {
    const newImages = this.state.images.filter(img => img !== image);
    this.setState({ images: newImages });
    this.handleSubmit("images", newImages);
  }

  render() {
    const { room } = this.props;
    const { commonFields, isGalleryOpen } = this.state;

    return (
      <React.Fragment>
        <div className="flex flex-row gap-4">
          <Link to="/dashboard/rooms" className="self-center">
            <ArrowNarrowLeftIcon className="h-8 w-8 text-gray-800 hover:text-gray-500 hover:cursor-pointer" />
          </Link>
          <div className="flex flex-row justify-between my-4 w-full">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex">
                {room.roomNumber}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {i18next.t("facilities_edit_description")}
              </p>
            </div>
            <div className="self-center">
              <ButtonDanger onClick={() => this.props.onRemoveRoom(room._id)}>
                <div className="flex flex-row align-bottom text-sm gap-2">
                  <p className="font-medium truncate">
                    {i18next.t("remove_room")}
                  </p>
                  <XCircleIcon className="w-5" />
                </div>
              </ButtonDanger>
            </div>
          </div>
        </div>
        <Table lines={commonFields} />
        <div className="border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                {i18next.t("room.gallery")}
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {this.state.images && this.state.images.length ? (
                  <div className="flex-grow flex">
                    {this.state.images.map(image => (
                      <BadgeImage
                        key={image}
                        src={image}
                        alt={image}
                        onRemove={this.handleRemoveImage}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm flex-grow text-gray-500">
                    {i18next.t("room_no_images")}
                  </p>
                )}
                <span className="ml-4 flex-shrink-0">
                  <ButtonSecondary
                    onClick={e => {
                      e.preventDefault();
                      this.setState({ isGalleryOpen: true });
                    }}
                  >
                    {i18next.t("add_image")}
                  </ButtonSecondary>
                </span>
              </dd>
            </div>
          </dl>
        </div>
        {isGalleryOpen && (
          <ModalMedia
            isOpen={isGalleryOpen}
            onCancel={this.handleCancelModal}
            onSelectMedia={this.handleSelectImage}
          />
        )}
      </React.Fragment>
    );
  }
}

RoomDetails.propTypes = {
  router: PropTypes.object,
  room: PropTypes.object,
  onRemoveRoom: PropTypes.func.isRequired,
  onFieldUpdate: PropTypes.func
};

RoomDetails.defaultProps = {
  room: null,
  onFieldUpdate: () => {}
};

export default withRouter(RoomDetails);
