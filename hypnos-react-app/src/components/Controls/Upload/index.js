import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { isNotEmpty } from "@Utils/core";

import ButtonPrimary from "@Controls/Buttons/Primary";
import ButtonSecondary from "@Controls/Buttons/Secondary";

// Ui components
import DragDrop from "@Controls/DragDrop";
import i18next from "i18next";

const Upload = ({ onUpload }) => {
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {}, []);

  const handleUpload = files => {
    setOpen(true);
    setUploadedFiles(files);
  };

  const handleConfirmUpload = () => {
    if (isNotEmpty(uploadedFiles)) {
      const formData = new FormData();
      const imagefile = document.querySelector("input[name='file']");
      formData.append("image", imagefile.files[0]);
      onUpload(formData);
    }
    setOpen(false);
  };

  const handleCancelUpload = () => {
    setUploadedFiles([]);
    setOpen(false);
  };

  return (
    <div className="upload-page h-full">
      {open && (
        <div className="files mb-2">
          <Transition.Root show={open} as={React.Fragment}>
            <Dialog
              as="div"
              className="fixed z-10 inset-0 overflow-y-auto"
              onClose={setOpen}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={React.Fragment}
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
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div>
                      <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-primary-600">
                        <CheckIcon
                          className="h-10 w-10 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          {i18next.t("confirm_upload")}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {i18next.t("confirm_upload_message")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 flex flex-row gap-4">
                      <ButtonSecondary onClick={handleCancelUpload}>
                        {i18next.t("cancel")}
                      </ButtonSecondary>
                      <ButtonPrimary onClick={handleConfirmUpload}>
                        {i18next.t("confirm_upload_button")}
                      </ButtonPrimary>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      )}
      <DragDrop onUpload={handleUpload}>
        Files...
        <div>{!isNotEmpty(uploadedFiles)}</div>
      </DragDrop>
    </div>
  );
};

Upload.propTypes = {
  onUpload: PropTypes.func
};

Upload.defaultProps = {
  onUpload: () => {}
};

export default Upload;
