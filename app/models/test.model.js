const mongoose = require("mongoose");

const Test = mongoose.model(
<<<<<<< HEAD
    "Test",
    new mongoose.Schema({
        type: String,
        questions: [] ,
        options: [] 
    })
  );
  
  module.exports = Test;
=======
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
>>>>>>> 91de66b60412943f08fdcda23bfd4dcfe3b2d363
