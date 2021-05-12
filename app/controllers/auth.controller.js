const config = require("../config/auth.config");
const db = require("../models/index");
const Admin = db.admin ;
const User = db.user;
const Recruiter = db.recruiter;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.candidate_signup = (req, res) => {
  const user = new User({
    username: req.body.username,
	  firstName: req.body.firstName,
	  lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Candidate was registered successfully!" });
  });
};

exports.candidate_signin = (req, res) => {
  User.findOne({
    email: req.body.email
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
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id, role: "recruiter" }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

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
        role: "candidate",
        accessToken: token
      });
    });

}

//************************* Admin Functions **********************************

exports.admin_signup = (req, res) => {
  const admin = new Admin({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  admin.save((err, admin) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Admin was registered successfully!" });
  });
};

exports.admin_signin = (req, res) => {
  Admin.findOne({
    username: req.body.username
  })
    .exec((err, admin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!admin) {
        return res.status(404).send({ message: "Admin Not existed" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        admin.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: admin.id, role: "admin" }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: admin._id,
        username: admin.username,
        role: "admin",
        accessToken: token
      });
    });

}



//*************************** Recruiter Functions ******************************

exports.recruiter_signup = (req, res) => {
  const recruiter = new Recruiter({
    companyName: req.body.companyName,
	  email: req.body.companyEmail,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    country: req.body.country,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  recruiter.save((err, recruiter) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Recruiter was registered successfully!" });
  });
};


exports.recruiter_signin = (req,res) => {
  Recruiter.findOne({
    companyEmail: req.body.companyEmail
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
        req.body.password,
        recruiter.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: recruiter.id, role: "recruiter" }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: recruiter._id,
        companyName: recruiter.companyName,
		    email: recruiter.email,
		    address: recruiter.address,
		    city: recruiter.city,
		    province: recruiter.province,
		    country: recruiter.country,
		    registrationDate: recruiter.registrationDate,
        role: "recruiter",
        accessToken: token
      });
    });

}



