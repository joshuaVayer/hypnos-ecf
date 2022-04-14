const { Schema, model } = require("mongoose");

const formSubmissionSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  surname: { type: String, required: true },
  interest: { type: String, required: true },
  content: { type: String, default: "" },
  additionalDetails: { type: Object, required: true, default: {} },
  createdAt: { type: Date, default: Date.now }
});

// TODO: add unique validation

const FormSubmission = model("FormSubmission", formSubmissionSchema);

module.exports = FormSubmission;
