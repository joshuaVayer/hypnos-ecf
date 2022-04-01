const { Schema, model } = require("mongoose");

const formSubmissionSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  surname: { type: String, required: true },
  interest: { type: String, required: true },
  additionalDetails: { type: Object, required: true, default: {} },
  createdAt: { type: Date, default: Date.now }
});

const FormSubmission = model("FormSubmission", formSubmissionSchema);

module.exports = FormSubmission;
