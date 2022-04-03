import React from "react";
import PropTypes from "prop-types";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { Link as RouterLink } from "react-router-dom";

const Link = ({ children, className, to }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  if (!children) return null;

  return (
    <div className="text-sm transition-transform">
      <RouterLink
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        to={to}
        className={`hover:transition-all font-medium text-primary-600 hover:text-primary-500 ${className}`}
      >
        <div className="flex">
          {children}
          {isHovered && (
            <ArrowNarrowRightIcon
              className={`ml-2 ${isHovered ? "w-5" : "w-0"}`}
            />
          )}
        </div>
      </RouterLink>
    </div>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string
};

Link.defaultProps = {
  className: "",
  to: "/"
};

export default Link;
