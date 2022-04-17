import React from "react";
import PropTypes from "prop-types";
import i18next from "i18next";

import ButtonPrimary from "@Controls/Buttons/Primary";
import RoomService from "@Services/Room";
import BookingService from "@Services/Booking";
import RoomBooker from "@Display/RoomBooker";
import FacilityService from "@Services/Facility";

const PageFacilityDetails = ({ id }) => {
  const [rooms, setRooms] = React.useState([]);
  const [facility, setFacility] = React.useState(null);
  const [selectedRoom, setSelectedRoom] = React.useState(null);

  const fecthData = () => {
    FacilityService.get(id).then(setFacility);
    RoomService.getAll({ facilityId: id }).then(fetchedRooms => {
      const promises = fetchedRooms.map(
        room =>
          new Promise((resolve, reject) => {
            BookingService.getAll({ roomId: room._id })
              .then(bookings => {
                resolve({ ...room, bookings });
              })
              .catch(err => reject(err));
          })
      );
      Promise.all(promises).then(rooms => {
        setRooms(rooms);
        setSelectedRoom(rooms[0]);
      });
    });
  };

  React.useEffect(() => {
    if (!facility) fecthData();
  }, [selectedRoom]);

  if (!facility) return;

  const beautifyPrice = price => {
    if (!price && price == 0 && price.length < 2) return "Price not set";
    const euros = price / 100;
    const cents = String(price).slice(-2);
    return `${euros}, ${cents} €`;
  };

  return (
    <div className="bg-gray-50 font-lora h-full px-6 pb-10">
      <div className="py-6">
        <h1 className="text-4xl tracking-tight font-raylig text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
          <span className="block text-black xl:inline">{facility.name}</span>
        </h1>
      </div>
      <div>
        <img
          src={facility.coverImage}
          alt={facility.name}
          className="w-full h-96 object-cover object-center"
        />
      </div>
      <div className="pt-6">
        {facility.description && (
          <p className="text-xl">{facility.description}</p>
        )}
      </div>
      <div className="p-6 mt-4 bg-primary-600 bg-opacity-30">
        <h3 className="text-xl tracking-tight font-raylig sm:text-3xl lg:text-4xl xl:text-5xl">
          <span className="block text-black xl:inline">Les suites,</span>
        </h3>
        <div className="border-b border-gray-500 w-24 pt-2" />
        <div className="flex justify-between">
          <div className="py-6 w-1/3">
            {rooms.map(room => {
              const isSelected = room._id === selectedRoom._id;
              return (
                <div key={room._id} className="px-4 w-full pb-2">
                  <h4
                    onClick={() => (isSelected ? null : setSelectedRoom(room))}
                  >
                    <div
                      className={`text-black tracking-tight font-raylig flex transition-all ${
                        isSelected
                          ? "sm:text-3xl lg:text-4xl xl:text-5xl"
                          : "sm:text-2xl lg:text-3xl xl:text-4xl hover:ml-2 hover:cursor-pointer"
                      }`}
                    >
                      {isSelected && (
                        <span className="border-b border-black block pt-2 w-8 self-center mr-2" />
                      )}
                      {room.roomNumber}
                    </div>
                  </h4>
                  <div className="border-b border-gray-400 py-2" />
                  {isSelected && (
                    <div className="py-2 tranistion-all flex flex-col">
                      <p className="text-xl">{room.description}</p>
                      <div className="flex flex-col justify-between">
                        <span className="self-end text-lg">
                          {beautifyPrice(room.price)} / {i18next.t("night")}
                        </span>
                        <span className="self-end text-lg">
                          {room.capacity} {i18next.t("guests")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="py-6 w-full flex justify-center">
              <ButtonPrimary className="w-24">
                {i18next.t("book")}
              </ButtonPrimary>
            </div>
          </div>
          <div className="w-2/3">
            <img src={facility.coverImage} />
          </div>
        </div>
      </div>
      <div className="py-6">
        <h1 className="text-4xl tracking-tight font-raylig text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
          <span className="block text-black xl:inline">Réservation</span>
        </h1>
      </div>
      {facility && facility._id && selectedRoom && (
        <RoomBooker
          key={2}
          room={selectedRoom}
          facility={facility}
          noFacilityUpdate
          shouldRedirect
        />
      )}
    </div>
  );
};

PageFacilityDetails.propTypes = {
  id: PropTypes.string.isRequired
};

export default PageFacilityDetails;
