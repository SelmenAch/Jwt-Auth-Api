const mongoose = require("mongoose");

const Application = mongoose.model(
  "Application",
    new mongoose.Schema({
	candidat: { type: Schema.Types.ObjectId, ref: 'Candidat' },
	offer: { type: Schema.Types.ObjectId, ref: 'Offer' },
	test: { type: Schema.Types.ObjectId, ref: 'Test' },
	applyDate: { type: Date, default: Date.now() },
	status: { type: String, enum : ['Rejected','Pending','Approved'], default: 'Pending' }
  })
);

module.exports = Application;
