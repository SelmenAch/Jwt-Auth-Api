const mongoose = require("mongoose");

const Application = mongoose.model(
  "Application",
    new mongoose.Schema({
	candidat: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
	test: { type: mongoose.Schema.Types.ObjectId, ref: 'TestCreated' },
	applyDate: { type: Date, default: Date.now() },
	score: Number,
	status: { type: String, enum : ['Rejected','Pending','Approved'], default: 'Pending' }
  })
);

module.exports = Application;
