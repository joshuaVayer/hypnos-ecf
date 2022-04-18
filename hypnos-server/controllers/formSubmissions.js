const { generateCrudMethods } = require("@utils/mongo");
const FormSubmission = require("@models/formSubmissions");

module.exports = generateCrudMethods(FormSubmission);
