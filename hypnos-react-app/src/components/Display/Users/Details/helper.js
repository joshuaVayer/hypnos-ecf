import React from "react";
import i18next from "i18next";
import { required } from "@Utils/form";

export const lines = user => {
  return [
    {
      fieldName: "name",
      type: "text",
      validations: [required],
      label: i18next.t("name"),
      value: user.name
    },
    {
      fieldName: "role",
      type: "text",
      validations: [required],
      label: i18next.t("role"),
      value: user.role ? (
        <span
          className={`bg-${i18next.t(
            `${user.role.name}_color`
          )}-500 text-${i18next.t(
            `${user.role.name}_color`
          )}-700 inline-flex rounded-full bg-opacity-30 px-2 text-xs font-semibold leading-5 `}
        >
          {i18next.t(user.role.name)}
        </span>
      ) : null
    },
    {
      fieldName: "username",
      type: "textarea",
      validations: [required],
      label: i18next.t("username"),
      value: user.username
    }
  ];
};
