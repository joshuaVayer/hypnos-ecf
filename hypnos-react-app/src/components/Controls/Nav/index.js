import React, { Fragment } from "react";
import i18next from "i18next";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";

import AuthService from "@Services/Auth";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const USER_IMG = `${process.env.REACT_APP_UPLOAD_URL}/avatar.png`;
const DARK_LOGO = `${process.env.REACT_APP_UPLOAD_URL}/b6471688d20f493e9b8ba4d1ca6575fb.png`;

const Nav = () => {
  const { user } = AuthService.getCurrentUser() || {};

  const navigation = [
    { name: i18next.t("menu.home"), href: "/" },
    { name: i18next.t("menu.facilities"), href: "/facilities" },
    { name: i18next.t("menu.contact"), href: "/contact" }
  ];

  if (user && (user.role === "admin" || user.role === "manager")) {
    navigation.push({ name: i18next.t("medias"), href: "/medias" });
  }

  const userNavigation = [
    { name: i18next.t("home"), href: "/dashboard" },
    { name: i18next.t("profile"), href: "/profile" },
    { name: i18next.t("logout"), href: "/logout" }
  ];

  const unregisteredNavigation = [
    { name: i18next.t("menu.login"), href: "/login" },
    { name: i18next.t("menu.signup"), href: "/signup" }
  ];

  return (
    <Popover as="header">
      {({ open }) => (
        <>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
              {/* Logo */}
              <div className="left-0 py-5 flex-shrink-0">
                <Link to="/" className="self-center">
                  <img className="h-10 w-auto" src={DARK_LOGO} alt="" />
                </Link>
              </div>

              {/* Right section on desktop */}
              <div className="w-full lg:border-t lg:border-white lg:border-opacity-20" />

              <div className="absolute right-0 flex-shrink-0 ">
                <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-primary-700 hover:text-gray-500 hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                  {open ? (
                    <XIcon className="block h-10 w-10" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-10 w-10" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </div>
          <Transition.Root as={Fragment}>
            <div>
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
                        {navigation.map(item => (
                          <Link key={item.name} to={item.href}>
                            <span className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    {user ? (
                      <div className="py-4">
                        <div className="px-2 pb-2 space-y-1">
                          {userNavigation.map(item => (
                            <Link key={item.name} to={item.href}>
                              <span className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                                {item.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={USER_IMG}
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
                    ) : (
                      <div className="py-4">
                        <div className="px-2 pb-2 space-y-1">
                          {unregisteredNavigation.map(item => (
                            <Link key={item.name} to={item.href}>
                              <span className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                                {item.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
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

export default Nav;
