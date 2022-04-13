import React from "react";
import i18next from "i18next";
import { required } from "@Utils/form";
import ButtonSecondary from "@Controls/Buttons/Secondary";

export const lines = (facility, handleEditLine) => {
  return [
    {
      fieldName: "name",
      type: "text",
      validations: [required],
      label: i18next.t("facility_name"),
      value: facility.name,
      action: (
        <ButtonSecondary onClick={() => handleEditLine("name")}>
          {i18next.t("edit")}
        </ButtonSecondary>
      )
    },
    {
      fieldName: "phone",
      type: "text",
      validations: [required],
      label: i18next.t("phone"),
      value: facility.phone,
      action: (
        <ButtonSecondary onClick={() => handleEditLine("phone")}>
          {i18next.t("edit")}
        </ButtonSecondary>
      )
    },
    {
      fieldName: "description",
      type: "textarea",
      validations: [required],
      label: i18next.t("description"),
      value: facility.description,
      action: (
        <ButtonSecondary onClick={() => handleEditLine("description")}>
          {i18next.t("edit")}
        </ButtonSecondary>
      )
    },
    {
      fieldName: "coverImage",
      type: "mediaPicker",
      validations: [required],
      label: i18next.t("cover_image"),
      value: facility.coverImage,
      action: (
        <ButtonSecondary onClick={() => handleEditLine("coverImage")}>
          {i18next.t("update")}
        </ButtonSecondary>
      )
    }
  ];
};

export const linesAddress = (facility, handleEditLine) => [
  {
    fieldName: "state",
    type: "text",
    validations: [required],
    label: i18next.t("state"),
    value: facility.state,
    action: (
      <ButtonSecondary onClick={() => handleEditLine("state")}>
        {i18next.t("edit")}
      </ButtonSecondary>
    )
  },
  {
    fieldName: "address",
    type: "text",
    validations: [required],
    label: i18next.t("address"),
    value: facility.address,
    action: (
      <ButtonSecondary onClick={() => handleEditLine("address")}>
        {i18next.t("edit")}
      </ButtonSecondary>
    )
  },
  {
    fieldName: "city",
    type: "text",
    validations: [required],
    label: i18next.t("city"),
    value: facility.city,
    action: (
      <ButtonSecondary onClick={() => handleEditLine("city")}>
        {i18next.t("edit")}
      </ButtonSecondary>
    )
  },
  {
    fieldName: "zip",
    type: "text",
    validations: [required],
    label: i18next.t("zip"),
    value: facility.zip,
    action: (
      <ButtonSecondary onClick={() => handleEditLine("zip")}>
        {i18next.t("edit")}
      </ButtonSecondary>
    )
  }
];
