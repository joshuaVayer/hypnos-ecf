const defaultPort = 3001;

const urlRoot = "/";

const texts = {
  mongoConnection: "Connecting to MongoDB...",
  mongoConnectionSuccess: (PORT = defaultPort) =>
  `Connected to MongoDB successfully! 🎉
  \n====================================
  \rServer is running on port ${PORT} 🚀
  \r====================================
  `,
  mongoConnectionError: (err) =>
  `Error connecting to MongoDB: ${err}`,

  superAdminNotFound: "Unable to find or create SuperAdmin 🤷‍♂️, exiting..."
};

module.exports = {
  texts,
  urlRoot,
  defaultPort
};
