import React from "react";
import i18next from "i18next";
import { isEmail } from "validator";

import Alert from "@Display/Alert";

// Style
const input =
  "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm";

export const formStyle = {
  input
};

// Validators
export const required = value => {
  if (!value) {
    return (
      <Alert
        text={i18next.t("required_field")}
        type={"error"}
        className="mt-2"
      />
    );
  }
};

export const email = value => {
  if (!isEmail(value)) {
    return (
      <Alert
        type={"error"}
        className="mt-2"
        text={i18next.t("invalid_email")}
      />
    );
  }
};

export const name = value => {
  if (value.length < 3 || value.length > 40) {
    return (
      <Alert type={"error"} className="mt-2" text={i18next.t("invalid_name")} />
    );
  }
};

export const password = value => {
  if (value.length < 6) {
    return (
      <Alert
        type={"error"}
        className="mt-2"
        text={i18next.t("invalid_password")}
      />
    );
  }
};

export const passwordConfirm = (value, allValues) => {
  console.log(value, allValues);
  if (value !== allValues.base) {
    return (
      <Alert
        type={"error"}
        className="mt-2"
        text={i18next.t("invalid_password_confirm")}
      />
    );
  }
};
