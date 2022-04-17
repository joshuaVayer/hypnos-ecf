import React from "react";

import Navbar from "@Controls/Nav";

const Header = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="h-1 shadow-sm absolute w-screen left-0" />
    </React.Fragment>
  );
};

export default Header;
