const mongoose = require("mongoose");

const TestModal = mongoose.model(
    "TestModal",
    new mongoose.Schema({
        type: String,
        questions: [] ,
        options: [] ,
        greens: []
    })
  );
  
exports.TestModal = TestModal;

//**************************************

const TestCreated = mongoose.model(
	"TestCreated",
	new mongoose.Schema({
		createdDate: { type: Date, default: Date.now() },
		questions: [],
		options: [] ,
    greens: []
	})
)

exports.TestCreated = TestCreated ;


