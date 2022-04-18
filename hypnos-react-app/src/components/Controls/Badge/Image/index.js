import React from "react";
import PropTypes from "prop-types";

import { XCircleIcon } from "@heroicons/react/solid";

const BadgeImage = ({ src, alt, className, onRemove }) => {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <div
      className={`${className} relative rounded-full flex-shrink-0 transition-all hover:cursor-pointer ${
        !isHover ? "h-10 w-10" : "h-24 w-24 mx-2"
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        className={`transition-all rounded-full ${
          !isHover ? "h-10 w-10" : "h-24 w-24"
        }`}
        src={src}
        alt={alt}
      />
      {isHover && (
        <button onClick={() => onRemove(src)}>
          <XCircleIcon className="h-6 w-6 text-red-700  hover:opacity-60 absolute -top-1 -left-1 z-10 rounded-full" />
        </button>
      )}
    </div>
  );
};

BadgeImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onRemove: PropTypes.func
};

export default BadgeImage;
