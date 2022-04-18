import React from "react";
import i18next from "i18next";
import { required } from "@Utils/form";
import ButtonSecondary from "@Controls/Buttons/Secondary";

export const lines = (room, handleEditLine) => {
  return [
    {
      fieldName: "roomNumber",
      type: "text",
      validations: [required],
      label: i18next.t("room.name"),
      value: room.roomNumber,
      action: (
        <ButtonSecondary onClick={() => handleEditLine("roomNumber")}>
          {i18next.t("edit")}
        </ButtonSecondary>
      )
    },
    {
      fieldName: "capacity",
      type: "text",
      validations: [required],
      label: i18next.t("room.capacity"),
      value: room.capacity,
      action: (
        <ButtonSecondary onClick={() => handleEditLine("capacity")}>
          {i18next.t("edit")}
        </ButtonSecondary>
      )
    },
    {
      fieldName: "price",
      type: "text",
      validations: [required],
      label: i18next.t("room.price"),
      value: room.price,
      action: (
        <ButtonSecondary onClick={() => handleEditLine("price")}>
          {i18next.t("edit")}
        </ButtonSecondary>
      )
    },
    {
      fieldName: "externalLink",
      type: "text",
      validations: [required],
      label: i18next.t("room.externalLink"),
      value: room.externalLink,
      action: (
        <ButtonSecondary onClick={() => handleEditLine("externalLink")}>
          {i18next.t("edit")}
        </ButtonSecondary>
      )
    },
    {
      fieldName: "description",
      type: "textarea",
      validations: [required],
      label: i18next.t("room.description"),
      value: room.description,
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
      value: room.coverImage,
      action: (
        <ButtonSecondary onClick={() => handleEditLine("coverImage")}>
          {i18next.t("update")}
        </ButtonSecondary>
      )
    }
  ];
};
