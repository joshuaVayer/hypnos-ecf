import i18next from "i18next";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import ButtonSecondary from "@Controls/Buttons/Secondary";
import PickerMedia from "@Components/Controls/Picker/Media";

const ModalMedia = ({ onSelectMedia, isOpen, onCancel }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onSelectMedia}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-4xl w-full p-6">
              <div>
                <PickerMedia onSelectMedia={onSelectMedia} />
              </div>

              <div className="mt-5 sm:mt-6 w-24 float-right">
                <ButtonSecondary onClick={onCancel}>
                  {i18next.t("quit")}
                </ButtonSecondary>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

ModalMedia.propTypes = {
  onCancel: PropTypes.func,
  onSelectMedia: PropTypes.func,
  isOpen: PropTypes.bool.isRequired
};

ModalMedia.defaultProps = {
  onCancel: () => {},
  onSelectMedia: () => {}
};

export default ModalMedia;
