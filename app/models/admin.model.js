const mongoose = require("mongoose");

const Admin = mongoose.model(
  "Admin",
    new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    registrationDate: { type: Date, default: Date.now() },
  })
);

module.exports = Admin;
