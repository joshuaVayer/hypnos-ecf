import React from "react";
import i18next from "i18next";
import { required, email } from "@Utils/form";
import ButtonSecondary from "@Controls/Buttons/Secondary";

const tableLines = (userDetails, handleEditLine) => [
  {
    id: "name",
    type: "text",
    validations: [required],
    label: i18next.t("full_name"),
    value: userDetails.name,
    action: (
      <ButtonSecondary onClick={() => handleEditLine("name")}>
        {i18next.t("edit")}
      </ButtonSecondary>
    )
  },
  {
    id: "username",
    type: "email",
    validations: [required, email],
    label: i18next.t("email"),
    value: userDetails.username,
    action: (
      <ButtonSecondary onClick={() => handleEditLine("username")}>
        {i18next.t("edit")}
      </ButtonSecondary>
    )
  },
  {
    id: "password",
    type: "password",
    validations: [required],
    label: i18next.t("password"),
    value: "",
    sensitive: true,
    action: (
      <ButtonSecondary onClick={() => handleEditLine("password")}>
        {i18next.t("edit_password")}
      </ButtonSecondary>
    )
  }
];

export default tableLines;
