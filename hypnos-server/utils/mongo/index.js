const generateCrudMethods = Model => {
  const methods = {
    getAll: (_, res) => {
      Model.find()
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
    },

    getById: (req, res) => {
      Model.findById(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
    },

    create: (req, res) => {
      Model.create(req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
    },

    update: (req, res) => {
      const timedBody = { ...req.body, updatedAt: req.body.updatedAt || Date.now() };
      Model.findByIdAndUpdate(req.params.id, timedBody, { new: true })
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
    },

    remove: (req, res) => {
      Model.findByIdAndDelete(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
    }
  };

  return methods;
};

module.exports = {
  generateCrudMethods
};
