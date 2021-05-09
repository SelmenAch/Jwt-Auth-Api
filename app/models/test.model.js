const mongoose = require("mongoose");

const Test = mongoose.model(
  "Test",
    new mongoose.Schema({
	candidat: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidat' },
	offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
	questions: [
		{
			title: String,
			options: [String],
			correctOption : String,
			answer: String
		}
	],
	createdDate: { type: Date, default: Date.now() },
	score: Number,
	isPassed: { type: Boolean, default: false }
  })
);

module.exports = Test;
