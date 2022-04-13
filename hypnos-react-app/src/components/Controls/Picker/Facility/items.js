import React from "react";
import PropTypes from "prop-types";
import { CheckIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";

const FacilityPickerItem = ({ facility, onClick }) => {
  if (!facility) return null;
  const [item, setItem] = React.useState();

  const handleOnClick = () => {
    const value = item ? null : facility._id;
    setItem(value);
    onClick(facility._id);
  };

  return (
    <RadioGroup value={item} onClick={handleOnClick}>
      <RadioGroup.Option
        key={facility._id}
        value={facility._id}
        className={({ active, checked }) =>
          `${
            active
              ? "ring-2 ring-offset-2 ring-primary-300 ring-opacity-60"
              : ""
          } ${checked ? "bg-primary-600 text-white" : "bg-white"}
            relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
        }
      >
        {({ checked }) => (
          <>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className="text-sm">
                  <RadioGroup.Label
                    as="p"
                    className={`font-medium  ${
                      checked ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {facility.name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={`inline ${
                      checked ? "text-sky-100" : "text-gray-500"
                    }`}
                  >
                    <span>{facility.address}</span>{" "}
                    <span aria-hidden="true">&middot;</span>{" "}
                    <span>{facility.city}</span>
                  </RadioGroup.Description>
                </div>
              </div>
              {checked && (
                <div className="flex-shrink-0 text-white bg-slate-500 rounded-full p-1 ml-1">
                  <CheckIcon className="w-6 h-6" />
                </div>
              )}
            </div>
          </>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
};

FacilityPickerItem.propTypes = {
  facility: PropTypes.object,
  onClick: PropTypes.func
};

FacilityPickerItem.defaultProps = {
  facility: null,
  onClick: () => {}
};

export default FacilityPickerItem;
