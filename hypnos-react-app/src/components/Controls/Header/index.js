import React from "react";
import { Link } from "react-router-dom";

const DARK_LOGO = `${process.env.REACT_APP_UPLOAD_URL}/b6471688d20f493e9b8ba4d1ca6575fb.png`;

import Menu from "@Controls/Menu";
import { MenuIcon } from "@heroicons/react/outline";

const Header = () => {
  const [openNavigation, setOpenNavigation] = React.useState(false);

  return (
    <React.Fragment>
      <header className="flex sticky justify-between px-6">
        <Link to="/" className="self-center">
          <img className="h-10 w-auto" src={DARK_LOGO} alt="" />
        </Link>
        <button
          onClick={() => setOpenNavigation(!openNavigation)}
          className="rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary-500"
        >
          <MenuIcon className="h-6 w-6 sm:h-10 sm:w-10" aria-hidden="true" />
        </button>
      </header>
      <div className="h-1 shadow-sm absolute w-screen left-0" />
      {openNavigation && (
        <Menu
          isOpen={openNavigation}
          closeModal={() => setOpenNavigation(false)}
        />
      )}
    </React.Fragment>
  );
};

export default Header;
