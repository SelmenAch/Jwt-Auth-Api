const mongoose = require("mongoose");

const Application = mongoose.model(
  "Application",
    new mongoose.Schema({
	candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
	test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
	applyDate: { type: Date, default: Date.now() },
	status: { type: String, enum : ['Rejected','Pending','Approved'], default: 'Pending' }
  })
);

module.exports = Application;
