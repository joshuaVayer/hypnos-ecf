import React, { Fragment } from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Popover, Transition } from "@headlessui/react";

import { MenuIcon, XIcon } from "@heroicons/react/outline";

const HeaderDashboard = ({ user }) => {
  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  const navigation = [
    { name: i18next.t("home"), href: "/dashboard" },
    { name: i18next.t("profile"), href: "/profile" },
    { name: i18next.t("medias"), href: "/medias" }
  ];

  const userNavigation = [
    { name: i18next.t("home"), href: "/dashboard" },
    { name: i18next.t("profile"), href: "/profile" },
    { name: i18next.t("logout"), href: "/logout" }
  ];

  return (
    <Popover
      as="header"
      className="pb-20 bg-gradient-to-r from-primary-600 to-primary-400"
    >
      {({ open }) => (
        <>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
              {/* Logo */}
              <div className="absolute left-0 py-5 flex-shrink-0 lg:static">
                <img
                  className="h-12 w-auto brightness-200"
                  src={`${process.env.REACT_APP_UPLOAD_URL}/10b11752f7bf433e8d400f545436d9a1.png`}
                  alt="Workflow"
                />
              </div>

              {/* Right section on desktop */}
              <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-4 relative flex-shrink-0">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white focus:outline-none hover:ring-opacity-75">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map(item => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-primary-700"
                              )}
                            >
                              <span>{item.name}</span>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center mb-10 lg:mb-0">
                  {/* Left nav */}
                  <div className="hidden lg:block lg:col-span-2">
                    <nav className="flex space-x-4">
                      {navigation.map(item => (
                        <Link key={item.name} to={item.href}>
                          <span
                            className={classNames(
                              item.current ? "text-white" : "text-gray-300",
                              "text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:underline"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 flex-shrink-0 lg:hidden">
                <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </div>
          <Transition.Root as={Fragment}>
            <div className="lg:hidden">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                    <div className="pt-3 pb-2">
                      <div className="flex items-center justify-between px-4">
                        <div>
                          <img className="h-1 w-auto" alt="" />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="-mt-8 px-2 space-y-1">
                        {userNavigation.map(item => (
                          <Link key={item.name} to={item.href}>
                            <span className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="py-4">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <div className="text-base font-medium text-gray-800 truncate">
                            {user.name}
                          </div>
                          <div className="text-sm font-medium text-gray-500 truncate">
                            {user.email || user.username}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
};

HeaderDashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    imageUrl: PropTypes.string
  }).isRequired
};

export default HeaderDashboard;
