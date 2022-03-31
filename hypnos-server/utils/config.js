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

  initMongoError: "Unable to initialize MongoDB 🤷‍♂️. Additional logs should be available in the server logs."
};

module.exports = {
  texts,
  urlRoot,
  defaultPort
};
