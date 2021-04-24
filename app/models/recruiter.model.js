const mongoose = require("mongoose");

const Recruiter = mongoose.model(
  "Recruiter",
  new mongoose.Schema({
    companyName: String,
	email: String,
    address: String,
    city: String,
    province: String,
    country: String,
    password: String,
	description: { type: String, default: undefined },
	website: { type: String, default: undefined },
	logo: { type: String, default: undefined },
	registrationDate: { type: Date, default: Date.now() }
  })
);

module.exports = Recruiter;
