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

*/

const config = require("../config/auth.config");
const db = require("../models/index");
const Recruiter = db.recruiter;
const Offer = db.offer ;
const _ = require('lodash');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.change_password = (req, res) => {
  
  Recruiter.findOne({
    _id: req.body._id
  })
    .exec((err, recruiter) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
	  
	  if (!recruiter) {
        return res.status(404).send({ message: "Recruiter Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.oldPass,
        recruiter.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Old Password!"
        });
      }
	  
	  const obj = {
		  password: bcrypt.hashSync(req.body.newPass, 8)
	  }
	  
	  recruiter = _.extend(recruiter, obj);
	  
	  recruiter.save((err, user) => {
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

exports.edit_profile = (req, res) => {
	
  Recruiter.findOne({
    _id: req.body._id
  })
    .exec((err, recruiter) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
	  
	  if (!recruiter) {
        return res.status(404).send({ message: "User Not found." });
      }
	  
	  const obj = {
		  address: req.body.address,
		  city: req.body.city,
		  province: req.body.province,
		  country: req.body.country,
		  description: req.body.description,
		  website: req.body.website
	  }
	  
	  recruiter = _.extend(recruiter, obj);
	  
	  recruiter.save((err, recruiter) => {
		if (err) {
		  res.status(500).send({ message: err });
		  return;
		}
		
		res.status(200).send({
        id: recruiter._id,
        companyName: recruiter.companyName,
        email: recruiter.email,
		address: recruiter.address,
		city: recruiter.city,
		province: recruiter.province,
		country: recruiter.country,
		description: recruiter.description,
		website: recruiter.website,
		role: "recruiter"
      });
		  
	  });

    });
};

exports.CreateOffer = (req,res)=>{

	const offer = new Offer({
		title: req.body.title,
		company: req.body._id,
		type: req.body.type, 
		category: req.body.category,
		location: req.body.location,	
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		keywords: req.body.keywords,
		description: req.body.description,
	})
	offer.save((err,offer)=>{
		if (err){
			req.status(400).send("Offer could not be created");
			return;
		} else {
			req.status(200).send("Offer Created Successfully");
		}
	})
};