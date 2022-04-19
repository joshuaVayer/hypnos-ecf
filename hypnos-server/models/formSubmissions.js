const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const formSubmissionSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  surname: { type: String, required: true },
  interest: { type: String, required: true },
  content: { type: String, default: "" },
  additionalDetails: { type: Object, required: true, default: {} },
  createdAt: { type: Date, default: Date.now }
});

formSubmissionSchema.plugin(uniqueValidator);

const FormSubmission = model("FormSubmission", formSubmissionSchema);

module.exports = FormSubmission;
