import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { FileUploader } from "react-drag-drop-files";

const DragDrop = ({ onUpload: handleChange }) => {
  const fileUploaderProps = {
    name: "file",
    handleChange,
    types: ["JPEG", "PNG", "JPG"],
    multiple: true
  };

  return (
    <div className="drag-and-drop h-full">
      <FileUploader {...fileUploaderProps}>
        <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md h-full">
          <div className="space-y-1 self-center text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
              >
                <span>{i18next.t("upload")}</span>
              </label>
              <p className="pl-1">{i18next.t("or_drag_drop")}</p>
            </div>
            <p className="text-xs text-gray-500">
              {i18next.t("facilities_new_cover_photo_description")}
            </p>
          </div>
        </div>
      </FileUploader>
    </div>
  );
};

DragDrop.propTypes = {
  onUpload: PropTypes.func.isRequired
};

export default DragDrop;
