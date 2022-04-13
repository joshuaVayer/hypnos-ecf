import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { ArrowNarrowLeftIcon, ExclamationIcon } from "@heroicons/react/outline";

import { required, email, formStyle } from "@Utils/form";

import UserService from "@Services/User";
import RoleService from "@Services/Role";
import FacilityService from "@Services/Facility";

import ButtonPrimary from "@Controls/Buttons/Primary";
import PickerFacility from "@Controls/Picker/Facility";
import ButtonSecondary from "@Controls/Buttons/Secondary";

const UserNew = ({ onCreateUser }) => {
  const navigate = useNavigate();
  const [role, setRole] = React.useState("");
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [facilities, setFacilities] = React.useState([]);

  const [manager, setManager] = React.useState(false);
  const [roleOptions, setRoleOptions] = React.useState([]);
  const [facilitiesOptions, setFacilitiesOptions] = React.useState([]);

  React.useEffect(() => {
    RoleService.getAll().then(roles => {
      setRoleOptions(roles);
      const managerRole = roles.find(role => role.name === "manager");
      if (managerRole) {
        setRole(managerRole._id);
        setManager(managerRole._id);
      }
    });
    FacilityService.getAll().then(setFacilitiesOptions);
  }, []);

  let form = null;
  let checkBtn = null;

  const handleOnSubmit = e => {
    e.preventDefault();
    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      const newUser = {
        name,
        role,
        username,
        facilities: role === manager ? facilities : [],
        password: process.env.REACT_APP_NEW_USER_PASSWORD
      };
      UserService.create(newUser)
        .then(() => {
          onCreateUser();
          navigate("/dashboard/users");
        })
        .catch(console.error);
    }
  };

  const handleCancel = e => {
    e.preventDefault();
    navigate("/dashboard/users");
  };

  return (
    <div>
      <div className="flex flex-row gap-4 ">
        <Link to="/dashboard/users" className="self-center">
          <ArrowNarrowLeftIcon className="h-8 w-8 text-gray-800 hover:text-gray-500 hover:cursor-pointer" />
        </Link>
        <div className="flex flex-row justify-between my-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {i18next.t("new_user")}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {i18next.t("user_new_description")}
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-md bg-yellow-50 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              {i18next.t("new_user_warning")}
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>{i18next.t("new_user_warning_description")}</p>
            </div>
          </div>
        </div>
      </div>
      <Form onSubmit={handleOnSubmit} ref={c => (form = c)}>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("full_name")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <Input
              type="text"
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
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("username")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <Input
              type="email"
              className={formStyle.input}
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              validations={[required, email]}
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            {i18next.t("role")}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-1">
            <Select
              name="role"
              className={formStyle.input}
              value={role}
              onChange={e => setRole(e.target.value)}
              validations={[required]}
            >
              <option value="" />
              {roleOptions.map(user => (
                <option key={user._id} value={user._id}>
                  {i18next.t(user.name)}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {role === manager && (
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
            <label
              htmlFor="facilities"
              className="block text-sm font-medium text-gray-700"
            >
              {i18next.t("facilities")}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              {facilitiesOptions.length > 0 && (
                <PickerFacility
                  facilities={facilitiesOptions}
                  onClick={setFacilities}
                />
              )}
            </div>
          </div>
        )}
        <CheckButton
          style={{ display: "none" }}
          ref={c => {
            checkBtn = c;
          }}
        />
        <div className="flex flex-row justify-end">
          <div className="flex flex-row gap-4">
            <ButtonSecondary onClick={handleCancel}>
              {i18next.t("cancel")}
            </ButtonSecondary>
            <ButtonPrimary>{i18next.t("create")}</ButtonPrimary>
          </div>
        </div>
      </Form>
    </div>
  );
};

UserNew.propTypes = {
  onCreateUser: PropTypes.func
};

UserNew.defaultProps = {
  onCreateUser: () => {}
};

export default UserNew;
