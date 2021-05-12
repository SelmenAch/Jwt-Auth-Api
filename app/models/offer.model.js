const mongoose = require("mongoose");

const Offer = mongoose.model(
  "Offer",
    new mongoose.Schema({
    title: String,
	company: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' },
	type: String, //summer internship / end of studies internship
	category: { type: String, enum : ['Information Technology','Finance & Banking','Sales & Marketing','Healthcare & Fitness','Art & Design'] },
    location: String,	
	createdDate: { type: Date, default: Date.now() },
	startDate: Date,
	endDate: Date,
	keywords: [String],
    description: String,
	//test: {type:mongoose.Schema.Types.ObjectId, ref:"TestCreated" } ,
	isApproved: { type: Boolean, default: false }
  })
);

module.exports = Offer;
