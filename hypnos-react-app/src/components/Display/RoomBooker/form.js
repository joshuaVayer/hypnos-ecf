import React from "react";
import PropTypes from "prop-types";
import i18next from "i18next";
import withRouter from "@Hoc/Router";
import { formStyle, required } from "@Utils/form";

import AuthService from "@Services/Auth";
import RoomService from "@Services/Room";
import BookingService from "@Services/Booking";
import FacilityService from "@Services/Facility";

import { areSameDay, isAfter, isBefore } from "@Utils/dates";

import Alert from "@Display/Alert";
import ButtonPrimary from "@Controls/Buttons/Primary";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
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
    this.handleFacilityChange = this.handleFacilityChange.bind(this);
  }

  componentDidMount() {
    FacilityService.getAll().then(facilitiesOptions =>
      this.setState({ facilitiesOptions }, () => {
        if (!this.state.facility || !Object.keys(this.state.facility).length) {
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
    RoomService.getAll({ facilityId: [this.state.facility._id] }).then(
      fetchedRooms => {
        const promises = fetchedRooms.map(
          room =>
            new Promise((resolve, reject) => {
              BookingService.getAll({ room: room._id, active: true })
                .then(bookings => {
                  resolve({ ...room, bookings });
                })
                .catch(err => reject(err));
            })
        );
        Promise.all(promises).then(roomOptions => {
          this.setState({
            roomOptions,
            room:
              this.props.room &&
              this.props.room.facility === this.state.facility._id
                ? this.props.room
                : roomOptions[0] || {}
          });
        });
      }
    );
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.form.validateAll();

    const { startingDate, endingDate } = this.props;
    const { room } = this.state;

    const { user } = AuthService.getCurrentUser();

    if (this.checkBtn.context._errors.length === 0 && this.isRoomFree()) {
      const newBooking = {
        endDate: endingDate,
        startDate: startingDate,
        room: room._id,
        user: user._id
      };

      BookingService.create(newBooking)
        .then(() => {
          this.props.router.navigate("/dashboard/bookings");
        })
        .catch(console.error);
    }
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

  handleGoToBooking(e) {
    e.preventDefault();
    localStorage.setItem("target", "/dashboard/new-booking");
    localStorage.setItem("facility", JSON.stringify(this.state.facility));
    localStorage.setItem("room", JSON.stringify(this.state.room));
    localStorage.setItem(
      "startingDate",
      JSON.stringify(this.props.startingDate)
    );
    localStorage.setItem("endingDate", JSON.stringify(this.props.endingDate));
    this.props.router.navigate(`/dashboard/new-booking`);
  }

  isRoomFree() {
    const { startingDate, endingDate } = this.props;
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
    const { noFacilityUpdate, shouldRedirect } = this.props;

    return (
      <Form onSubmit={this.handleOnSubmit} ref={c => (this.form = c)}>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="facility"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("booking.select_facility")}
          </label>
          <div className="mt-1 col-span-2 sm:mt-0 lg:col-span-1">
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
          <>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
              <label
                htmlFor="room"
                className="block text-sm font-medium text-gray-700"
              >
                {i18next.t("booking.select_room")}
              </label>
              <div className="mt-1 col-span-2 sm:mt-0 lg:col-span-1">
                <Select
                  name="room"
                  className={formStyle.input}
                  value={room && room._id ? room._id : ""}
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
            <div className="sm:grid sm:grid-cols-3 gap-4">
              {this.isRoomFree() ? (
                <React.Fragment>
                  <div className="mt-1 sm:mt-0 sm:col-span-3">
                    <Alert
                      type="success"
                      text={i18next.t("booking.room_free")}
                    />
                  </div>
                  {shouldRedirect ? (
                    <div className="mt-1 sm:mt-0 sm:col-span-1">
                      <ButtonPrimary
                        onClick={this.handleGoToBooking.bind(this)}
                      >
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
          </>
        )}
        <CheckButton
          style={{ display: "none" }}
          ref={c => {
            this.checkBtn = c;
          }}
        />
      </Form>
    );
  }
}

RoomBookerForm.propTypes = {
  router: PropTypes.object.isRequired,
  facility: PropTypes.object,
  room: PropTypes.object,
  noFacilityUpdate: PropTypes.bool,
  startingDate: PropTypes.any,
  endingDate: PropTypes.any,
  shouldRedirect: PropTypes.bool
};

RoomBookerForm.defaultProps = {
  facility: {},
  room: {},
  noFacilityUpdate: false,
  shouldRedirect: false
};

export default withRouter(RoomBookerForm);
