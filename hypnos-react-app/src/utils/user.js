const srcProfileImages = [
  "https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png",
  `${process.env.REACT_APP_UPLOAD_URL}/avatar.png`,
  `${process.env.REACT_APP_UPLOAD_URL}/avatar2.png`,
  `${process.env.REACT_APP_UPLOAD_URL}/avatar3.png`,
  `${process.env.REACT_APP_UPLOAD_URL}/avatar4.png`,
  `${process.env.REACT_APP_UPLOAD_URL}/avatar5.png`,
  `${process.env.REACT_APP_UPLOAD_URL}/avatar6.png`,
  `${process.env.REACT_APP_UPLOAD_URL}/avatar7.png`,
  `${process.env.REACT_APP_UPLOAD_URL}/avatar8.png`,
  `${process.env.REACT_APP_UPLOAD_URL}/avatar9.png`
];

export const randomProfileImage = () => {
  const randomIndex = Math.floor(Math.random() * srcProfileImages.length);
  return srcProfileImages[randomIndex];
};
