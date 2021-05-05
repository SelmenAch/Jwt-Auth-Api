const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.recruiter = require("./recruiter.model");
db.offer = require("./offer.model");
db.application = require("./application.model");
db.test = require("./test.model");
db.admin = require("./admin.model");
// db.ROLES = ["candidate", "admin", "recruiter"];

module.exports = db;