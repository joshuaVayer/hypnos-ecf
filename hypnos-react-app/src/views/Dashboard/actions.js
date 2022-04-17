import {
  PlusIcon,
  UserIcon,
  UsersIcon,
  CalendarIcon,
  PencilAltIcon,
  OfficeBuildingIcon
} from "@heroicons/react/outline";

const actions = i18next => ({
  admin: [
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
      name: i18next.t("all_bookings"),
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
  ],
  manager: [
    {
      icon: OfficeBuildingIcon,
      name: i18next.t("rooms"),
      href: "/dashboard/rooms",
      content: i18next.t("rooms_card_description"),
      iconForeground: "text-white",
      iconBackground: "bg-primary-600"
    },
    {
      icon: CalendarIcon,
      name: i18next.t("all_bookings"),
      href: "/dashboard/bookings",
      content:
        "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
      iconForeground: "text-white",
      iconBackground: "bg-primary-600"
    },
    {
      icon: UserIcon,
      name: i18next.t("my_profile"),
      href: "/profile",
      content:
        "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
      iconForeground: "text-white",
      iconBackground: "bg-primary-600"
    },
    {
      icon: PencilAltIcon,
      name: i18next.t("need_help"),
      href: "/contact",
      content:
        "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
      iconForeground: "text-white",
      iconBackground: "bg-primary-600"
    }
  ],
  client: [
    {
      icon: CalendarIcon,
      name: i18next.t("my_bookings"),
      href: "/dashboard/bookings",
      content:
        "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
      iconForeground: "text-white",
      iconBackground: "bg-primary-600"
    },
    {
      icon: PlusIcon,
      name: i18next.t("new_booking"),
      href: "/dashboard/new-booking",
      content:
        "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
      iconForeground: "text-white",
      iconBackground: "bg-primary-600"
    },
    {
      icon: UserIcon,
      name: i18next.t("my_profile"),
      href: "/profile",
      content:
        "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
      iconForeground: "text-white",
      iconBackground: "bg-primary-600"
    },
    {
      icon: PencilAltIcon,
      name: i18next.t("contact_us"),
      href: "/contact",
      content:
        "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
      iconForeground: "text-white",
      iconBackground: "bg-primary-600"
    }
  ]
});

export default actions;
