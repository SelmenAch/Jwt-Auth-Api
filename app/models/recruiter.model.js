const mongoose = require("mongoose");

const Recruiter = mongoose.model(
  "Recruiter",
  new mongoose.Schema({
    company: String,
    address1: String,
    address2: String,
    city: String,
    province: String,
    zip: Number,
    county: String,
    password: String 
  })
);

module.exports = Recruiter;
