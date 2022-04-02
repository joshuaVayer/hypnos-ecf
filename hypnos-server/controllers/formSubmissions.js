const FormSubmission = require("@models/formSubmissions");

const { userIsAdmin } = require("@utils/mongo/admin");
const { generateCrudMethods } = require("@utils/mongo");

module.exports = {
  create: async (req, res) => generateCrudMethods(FormSubmission).create(req, res),

  getAll: async (req, res) => {
    const isAdmin = await userIsAdmin(req);
    if (!isAdmin) return res.status(403).json({ error: "Unauthorized operation" });

    return generateCrudMethods(FormSubmission).getAll(req, res);
  },

  getById: async (req, res) => {
    const isAdmin = await userIsAdmin(req);
    if (!isAdmin) return res.status(403).json({ error: "Unauthorized operation" });

    return generateCrudMethods(FormSubmission).getById(req, res);
  }
};
