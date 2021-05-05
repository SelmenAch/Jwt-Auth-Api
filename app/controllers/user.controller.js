/*

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.candidateBoard = (req, res) => {
  res.status(200).send("Candidate Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.recruiterBoard = (req, res) => {
  res.status(200).send("Recruiter Content.");
};

<<<<<<< HEAD
=======
*/

const config = require("../config/auth.config");
const db = require("../models/index");
const User = db.user;
const Application = db.application ;
const _ = require('lodash');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.change_password = (req, res) => {
  
  User.findOne({
    _id: req.body._id
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
	  
	  if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.oldPass,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Old Password!"
        });
      }
	  
	  const obj = {
		  password: bcrypt.hashSync(req.body.newPass, 8)
	  }
	  
	  user = _.extend(user, obj);
	  
	  user.save((err, user) => {
		if (err) {
		  res.status(500).send({ message: err });
		  return;
		}
		res.send({ message: "Password has been changed successfully!" });
		  
	  });

    });
};


exports.create_cv = (req, res) => {
	
  User.findOne({
    _id: req.body._id
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
	  
	  if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
	  
	  const obj = {
		  address: req.body.address,
		  age: req.body.age,
		  bio: req.body.bio,
		  phoneNumber: req.body.phoneNumber,
		  experiences: req.body.experiences,
		  educations: req.body.educations,
		  skills: req.body.skills,
		  languages: req.body.languages,
		  hobbies: req.body.hobbies,
		  socialLinks: req.body.socialLinks,
		  isActive : true
	  }
	  
	  user = _.extend(user, obj);
	  
	  user.save((err, user) => {
		if (err) {
		  res.status(500).send({ message: err });
		  return;
		}

		res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		address: user.address,
		age: user.age,
		bio: user.bio,
		phoneNumber: user.phoneNumber,
		userImage: user.userImage,
		registrationDate: user.registrationDate,
		experiences: user.experiences,
		educations: user.educations,
		skills: user.skills,
		languages: user.languages,
		hobbies: user.hobbies,
		socialLinks: user.socialLinks,
		isActive: user.isActive,
		role: "candidate"
      });
		  
	  });

    });
};

exports.edit_cv = (req, res) => {
	
  User.findOne({
    _id: req.body._id
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
	  
	  if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
	  
	  const obj = {
		  address: req.body.address,
		  age: req.body.age,
		  bio: req.body.bio,
		  phoneNumber: req.body.phoneNumber,
		  experiences: req.body.experiences,
		  educations: req.body.educations,
		  skills: req.body.skills,
		  languages: req.body.languages,
		  hobbies: req.body.hobbies,
		  socialLinks: req.body.socialLinks
	  }
	  
	  user = _.extend(user, obj);
	  
	  user.save((err, user) => {
		if (err) {
		  res.status(500).send({ message: err });
		  return;
		}
		
		res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		address: user.address,
		age: user.age,
		bio: user.bio,
		phoneNumber: user.phoneNumber,
		userImage: user.userImage,
		registrationDate: user.registrationDate,
		experiences: user.experiences,
		educations: user.educations,
		skills: user.skills,
		languages: user.languages,
		hobbies: user.hobbies,
		socialLinks: user.socialLinks,
		isActive: user.isActive,
		role: "candidate"
      });
		  
	  });

    });
};

// Submit test function

exports.submit_application = (req,res) => {
		const application = new Application({
		  condidat: req.body._id,
		  offer: req.body._offer ,
		  test: req.body._testCreated,
		  responses: req.body.responses
		});
	  
		application.save((err) => {
		  if (err) {
			res.status(500).send({ message: err });
			return;
		  }
		  res.send({ message: "Your application was registered successfully! Good Luck " });
		});
};
