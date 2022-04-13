import React from "react";
import PropTypes from "prop-types";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

import ModalMedia from "@Display/Modal/Media";

import ButtonPrimary from "@Controls/Buttons/Primary";
import ButtonSecondary from "@Controls/Buttons/Secondary";

import { formStyle } from "@Utils/form";
import i18next from "i18next";

const LineEditable = ({
  label,
  value,
  onSubmit,
  validations,
  type,
  name,
  onCancel
}) => {
  let form = null;
  let checkBtn = null;

  const [media] = React.useState(null);
  const [currentValue, setCurrentValue] = React.useState(value);

  const handleOnSubmit = e => {
    e.preventDefault();
    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      onSubmit(currentValue);
    }
  };

  const handleOnChange = e => {
    setCurrentValue(e.target.value);
  };

  const onSelectMedia = media => {
    onSubmit(media.path);
  };

  return (
    <Form onSubmit={handleOnSubmit} ref={c => (form = c)}>
      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <div className="flex-grow">
            {type === "mediaPicker" ? (
              <React.Fragment>
                <Input
                  type="text"
                  className="hidden"
                  name="media"
                  value={media}
                  validations={validations}
                />
                <ModalMedia
                  onSelectMedia={onSelectMedia}
                  isOpen={true}
                  onCancel={onCancel}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                {type === "textarea" ? (
                  <TextArea
                    type={type}
                    className={formStyle.textArea}
                    name={name}
                    value={currentValue}
                    onChange={handleOnChange}
                    validations={validations}
                  />
                ) : (
                  <Input
                    type={type}
                    className={formStyle.input}
                    name={name}
                    value={currentValue}
                    onChange={handleOnChange}
                    validations={validations}
                  />
                )}
              </React.Fragment>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                checkBtn = c;
              }}
            />
          </div>
          <span className="ml-4 flex-shrink-0">
            <div className="flex flex-row gap-4">
              <ButtonSecondary onClick={onCancel}>
                {i18next.t("cancel")}
              </ButtonSecondary>
              <ButtonPrimary>{i18next.t("save")}</ButtonPrimary>
            </div>
          </span>
        </dd>
      </div>
    </Form>
  );
};

LineEditable.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validations: PropTypes.array,
  type: PropTypes.string,
  name: PropTypes.string
};

LineEditable.defaultProps = {
  type: "text",
  name: "",
  validations: []
};

export default LineEditable;
