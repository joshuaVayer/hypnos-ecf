import React from "react";
import i18next from "i18next";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import SuccessAnimation from "actually-accessible-react-success-animation";

import AuthService from "@Services/Auth";
import ContactService from "@Services/Contact";
import ButtonPrimary from "@Controls/Buttons/Primary";

import { required, email, formStyle } from "@Utils/form";

const PageContact = () => {
  const [name, setName] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [interest, setInterest] = React.useState("");
  const [content, setContent] = React.useState("");
  const [additionalDetails, setAdditionalDetails] = React.useState("");

  React.useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) setAdditionalDetails({ user: user.user });
  }, []);

  let form = null;
  let checkBtn = null;

  const handleOnSubmit = e => {
    e.preventDefault();

    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      const submissionObject = {
        name,
        email: emailAddress,
        surname,
        interest,
        content,
        additionalDetails
      };

      ContactService.submit(submissionObject)
        .then(res => {
          console.log(res);
          setIsSubmitted(true);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const INSTEREST_OPTIONS = [
    i18next.t("contact.form.interests.claim"),
    i18next.t("contact.form.interests.additional_services"),
    i18next.t("contact.form.interests.more_info"),
    i18next.t("contact.form.interests.website_issue"),
    i18next.t("contact.form.interests.other")
  ];

  return (
    <div className="px-6">
      <div className="py-6">
        <h1 className="text-4xl tracking-tight font-raylig text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
          <span className="block text-black xl:inline">
            {i18next.t("contact.title")}
          </span>
        </h1>
        <p className="mt-4 text-gray-500 text-sm sm:text-md xl:text-lg">
          {i18next.t("contact.description")}
        </p>
      </div>
      {isSubmitted ? (
        <SuccessAnimation
          duration={1000}
          size={120}
          text={i18next.t("contact.success")}
          color="#5cb85c"
        />
      ) : (
        <Form onSubmit={handleOnSubmit} ref={c => (form = c)}>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
            <label
              htmlFor="interest"
              className="block text-sm font-medium text-gray-700"
            >
              {i18next.t("contact.form.labels.interest")}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Select
                name="interest"
                className={formStyle.input}
                value={interest}
                onChange={e => setInterest(e.target.value)}
                validations={[required]}
              >
                <option value="">
                  {i18next.t("contact.form.interests.default")}
                </option>
                {INSTEREST_OPTIONS.map(insterestOption => (
                  <option key={insterestOption} value={insterestOption}>
                    {insterestOption}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              {i18next.t("contact.form.labels.name")}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Input
                type="text"
                placeholder={i18next.t("contact.form.placeholders.name")}
                className={formStyle.input}
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                validations={[required]}
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
            <label
              htmlFor="surname"
              className="block text-sm font-medium text-gray-700"
            >
              {i18next.t("contact.form.labels.surname")}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Input
                type="text"
                placeholder={i18next.t("contact.form.placeholders.surname")}
                className={formStyle.input}
                name="surname"
                value={surname}
                onChange={e => setSurname(e.target.value)}
                validations={[required]}
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {i18next.t("contact.form.labels.email")}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Input
                type="text"
                placeholder={i18next.t("contact.form.placeholders.email")}
                className={formStyle.input}
                name="email"
                value={emailAddress}
                onChange={e => setEmailAddress(e.target.value)}
                validations={[required, email]}
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              {i18next.t("contact.form.labels.content")}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <TextArea
                type="textarea"
                name="content"
                placeholder={i18next.t("contact.form.placeholders.content")}
                rows={3}
                value={content}
                onChange={e => setContent(e.target.value)}
                validations={[required]}
                className={`${formStyle.input} w-full h-36`}
              />
            </div>
          </div>
          <CheckButton
            style={{ display: "none" }}
            ref={c => {
              checkBtn = c;
            }}
          />
          <div className="grid mx-auto max-w-sm sm:max-w-none sm:grid-cols-3 md:grid-cols-5">
            <div className="sm:col-span-2 md:col-span-4" />
            <ButtonPrimary>{i18next.t("contact.form.submit")}</ButtonPrimary>
          </div>
        </Form>
      )}
    </div>
  );
};

export default PageContact;
