import React from "react";
import PropType from "prop-types";

const DEFAULT_IMAGE =
  "https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png";

const CardMedia = ({ media, onClick }) => {
  const handleClick = () => {
    onClick(media);
  };
  return (
    <li className="relative" onClick={handleClick}>
      <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-primary-500 overflow-hidden">
        <img
          src={media.path || DEFAULT_IMAGE}
          loading="lazy"
          alt=""
          className="object-cover pointer-events-none group-hover:opacity-75"
        />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {media.title}</span>
        </button>
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
        {media.name}
      </p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">
        {media.size}
      </p>
    </li>
  );
};

CardMedia.propTypes = {
  media: PropType.object.isRequired,
  onClick: PropType.func
};

CardMedia.defaultProps = {
  onClick: () => {}
};

export default CardMedia;
