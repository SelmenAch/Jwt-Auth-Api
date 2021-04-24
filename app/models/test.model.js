const mongoose = require("mongoose");

const Test = mongoose.model(
  "Test",
    new mongoose.Schema({
	candidat: { type: Schema.Types.ObjectId, ref: 'Candidat' },
	offer: { type: Schema.Types.ObjectId, ref: 'Offer' },
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
