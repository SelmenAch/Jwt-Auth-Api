const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
    new mongoose.Schema({
    username: String,
	firstName: String,
	lastName: String,
    email: String,
    password: String,
	address: { type: String, default: undefined }, 
    age: { type: Number, default: undefined },
	bio: { type: String, default: undefined },
    isActive: { type: Boolean, default: false },
    phoneNumber: { type: Number, default: undefined },
    userImage: { type: String, default: undefined },
    registrationDate: { type: Date, default: Date.now() },
	experiences : [
		{
			title: String,
			company: String,
			startDate: String,
			endDate: String,
			description: String
		}
	],
	educations : [
		{
			degree: String,
			school: String,
			startDate: String,
			endDate: String
		}
	],
	skills: [
		{
			name: String,
			value: { type: Number, min: 0, max: 100 }
		}
	],
	languages: [String],
	hobbies: [String],
	socialLinks : [
		{	facebook : String,
			linkedin : String,
			github : String
		}
	]

    /*roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]*/
  })
);

module.exports = User;
