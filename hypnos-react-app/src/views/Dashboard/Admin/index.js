import React from "react";
import PropTypes from "prop-types";
import withRouter from "@Hoc/Router";
import i18next from "i18next";
import {
  CalendarIcon,
  OfficeBuildingIcon,
  PencilAltIcon,
  UsersIcon
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

import Users from "@Display/Users";
import Bookings from "@Display/Bookings";
import Facilities from "@Display/Facilities";

const classNames = (...classes) => classes.filter(Boolean).join(" ");
class DashboardAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  renderDasboardView(view) {
    if (view === "facilities") return <Facilities />;
    if (view === "users") return <Users />;
    if (view === "bookings") return <Bookings />;
    if (view === "contacts") {
      return <h1> Form Submissions </h1>;
    }
    return null;
  }

  render() {
    const { view } = this.props.router.params;
    const actions = [
      {
        icon: OfficeBuildingIcon,
        name: i18next.t("facilities"),
        href: "/dashboard/facilities",
        content: i18next.t("facilities_card_description"),
        iconForeground: "text-white",
        iconBackground: "bg-primary-600"
      },
      {
        icon: UsersIcon,
        name: i18next.t("users"),
        href: "/dashboard/users",
        content:
          "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
        iconForeground: "text-white",
        iconBackground: "bg-primary-600"
      },
      {
        icon: CalendarIcon,
        name: i18next.t("bookings"),
        href: "/dashboard/bookings",
        content:
          "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
        iconForeground: "text-white",
        iconBackground: "bg-primary-600"
      },
      {
        icon: PencilAltIcon,
        name: i18next.t("form_submissions"),
        href: "/dashboard/contacts",
        content:
          "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
        iconForeground: "text-white",
        iconBackground: "bg-primary-600"
      }
    ];

    if (view) return this.renderDasboardView(view);

    return (
      <section aria-labelledby="quick-links-title">
        <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
          {actions.map((action, actionIdx) => (
            <div
              key={action.name}
              className={classNames(
                actionIdx === 0
                  ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                  : "",
                actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
                actionIdx === actions.length - 1
                  ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                  : "",
                "relative group bg-white hover:bg-gray-50 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
              )}
            >
              <div>
                <span
                  className={classNames(
                    action.iconBackground,
                    action.iconForeground,
                    "rounded-lg inline-flex p-3 ring-4 ring-white"
                  )}
                >
                  <action.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <Link to={action.href}>
                    <span className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.name}
                    </span>
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-500">{action.content}</p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

DashboardAdmin.propTypes = {
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default withRouter(DashboardAdmin);
