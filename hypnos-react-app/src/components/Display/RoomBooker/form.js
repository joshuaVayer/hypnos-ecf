import React from "react";
import PropTypes from "prop-types";
import i18next from "i18next";
import withRouter from "@Hoc/Router";
import { formStyle, required } from "@Utils/form";

import RoomService from "@Services/Room";
import BookingService from "@Services/Booking";
import FacilityService from "@Services/Facility";

import { areSameDay, isAfter, isBefore } from "@Utils/dates";

import Alert from "@Display/Alert";
import ButtonPrimary from "@Controls/Buttons/Primary";
import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
import Select from "react-validation/build/select";

class RoomBookerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      facility: props.facility,
      facilitiesOptions: [],
      room: props.room,
      roomOptions: []
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.handleFacilityChange = this.handleFacilityChange.bind(this);
  }

  componentDidMount() {
    FacilityService.getAll().then(facilitiesOptions =>
      this.setState({ facilitiesOptions }, () => {
        if (!this.state.facility) {
          this.setState(
            { facility: facilitiesOptions[0] },
            this.fetchRelatedRooms
          );
        } else {
          this.fetchRelatedRooms();
        }
      })
    );
  }

  fetchRelatedRooms() {
    RoomService.getAll({ facilityId: this.state.facility._id }).then(
      fetchedRooms => {
        const promises = fetchedRooms.map(
          room =>
            new Promise((resolve, reject) => {
              BookingService.getAll({ roomId: room._id, active: true })
                .then(bookings => {
                  resolve({ ...room, bookings });
                })
                .catch(err => reject(err));
            })
        );
        Promise.all(promises).then(roomOptions => {
          this.setState({ roomOptions });
        });
      }
    );
  }

  handleOnSubmit() {
    // WIP
    console.log(this.form);
    console.log("submitted");
  }

  handleFacilityChange(e) {
    const facilityId = e.target.value;
    const facility = this.state.facilitiesOptions.find(
      facility => facility._id === facilityId
    );
    this.setState({ facility }, this.fetchRelatedRooms);
  }

  handleRoomChange(e) {
    const roomId = e.target.value;
    const room = this.state.roomOptions.find(room => room._id === roomId);
    this.setState({ room });
  }

  isRoomFree() {
    const { startingDate, endingDate } = this.props;
    console.log(startingDate, endingDate);
    const { room } = this.state;
    const { bookings } = room;

    if (!bookings) return true;

    const bookingsAsArray = Object.values(bookings);

    const isBooked = booking => {
      const boookingStartDate = new Date(booking.startDate);
      const boookingEndDate = new Date(booking.endDate);
      if (
        areSameDay(startingDate, boookingStartDate) ||
        areSameDay(startingDate, boookingEndDate)
      )
        return true;
      if (
        areSameDay(endingDate, boookingStartDate) ||
        areSameDay(endingDate, boookingEndDate)
      )
        return true;
      if (
        isAfter(startingDate, boookingStartDate) &&
        isBefore(endingDate, boookingEndDate)
      )
        return true;

      return false;
    };

    return bookingsAsArray.every(booking => !isBooked(booking));
  }

  render() {
    const { facility, facilitiesOptions, room, roomOptions } = this.state;
    const { noFacilityUpdate, shouldRedirect, router } = this.props;
    const { navigate } = router;

    return (
      <Form onSubmit={this.handleOnSubmit} ref={c => (this.form = c)}>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="facility"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("booking.select_facility")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <Select
              name="facility"
              disabled={noFacilityUpdate}
              className={formStyle.input}
              value={facility._id}
              onChange={this.handleFacilityChange}
              validations={[required]}
            >
              {facilitiesOptions.map(facility => (
                <option key={facility._id} value={facility._id}>
                  {facility.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {facility && roomOptions.length > 0 && (
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
            <label
              htmlFor="room"
              className="block text-sm font-medium text-gray-700"
            >
              {i18next.t("booking.select_room")}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Select
                name="room"
                className={formStyle.input}
                value={(room && room._id) || ""}
                onChange={this.handleRoomChange}
                validations={[required]}
              >
                {roomOptions.map(room => (
                  <option key={room._id} value={room._id}>
                    {room.roomNumber}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        )}
        <div className="sm:grid sm:grid-cols-3 gap-4">
          {this.isRoomFree() ? (
            <React.Fragment>
              <div className="mt-1 sm:mt-0 sm:col-span-3">
                <Alert type="success" text={i18next.t("booking.room_free")} />
              </div>
              {shouldRedirect ? (
                <div className="mt-1 sm:mt-0 sm:col-span-1">
                  <ButtonPrimary onClick={() => navigate("/dashboard/book")}>
                    {i18next.t("booking.go_to_booking")}
                  </ButtonPrimary>
                </div>
              ) : (
                <div className="mt-1 sm:mt-0 sm:col-span-1">
                  <ButtonPrimary type="submit">
                    {i18next.t("book")}
                  </ButtonPrimary>
                </div>
              )}
            </React.Fragment>
          ) : (
            <div className="mt-1 sm:mt-0 sm:col-span-3">
              <Alert type="error" text={i18next.t("booking.booked_room")} />
            </div>
          )}
        </div>
      </Form>
    );
  }
}

RoomBookerForm.propTypes = {
  router: PropTypes.object.isRequired,
  facility: PropTypes.object,
  room: PropTypes.object,
  noFacilityUpdate: PropTypes.bool,
  startingDate: PropTypes.object,
  endingDate: PropTypes.object,
  shouldRedirect: PropTypes.bool
};

RoomBookerForm.defaultProps = {
  facility: {},
  room: {},
  noFacilityUpdate: false,
  shouldRedirect: false
};

export default withRouter(RoomBookerForm);
