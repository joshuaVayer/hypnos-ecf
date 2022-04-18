import React from "react";
import i18next from "i18next";
import { Link } from "react-router-dom";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import TableShaped from "@Display/Table/Shaped";
import ContactService from "@Services/Contact";
import { toFriendlyString } from "@Utils/dates";
const Forms = () => {
  const [formSubmissions, setFormSubmissions] = React.useState([]);

  React.useEffect(() => {
    ContactService.getAll().then(setFormSubmissions);
  }, []);

  const tableShape = {
    cols: [
      {
        name: i18next.t("submitted_on"),
        key: "date"
      },
      {
        name: i18next.t("name"),
        key: "name"
      },
      {
        name: i18next.t("email"),
        key: "email"
      },
      {
        name: i18next.t("content"),
        key: "content"
      }
    ],
    lines: formSubmissions.map(submission => ({
      key: submission._id,
      date: toFriendlyString(new Date(submission.createdAt)),
      name: submission.name + " " + submission.surname,
      email: submission.email,
      content: submission.content
    }))
  };

  return (
    <section>
      <div className="flex flex-row gap-4 ">
        <Link to="/dashboard" className="self-center">
          <ArrowNarrowLeftIcon className="h-8 w-8 text-gray-800 hover:text-gray-500 hover:cursor-pointer" />
        </Link>
        <div className="flex flex-row justify-between my-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {i18next.t("submissions.title")}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {i18next.t("submissions.description")}
            </p>
          </div>
        </div>
      </div>
      <TableShaped shape={tableShape} />
    </section>
  );
};

export default Forms;
