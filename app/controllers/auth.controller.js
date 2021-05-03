const config = require("../config/auth.config");
const db = require("../models/index");
const Admin = db.admin ;
const User = db.user;
const Recruiter = db.recruiter;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

<<<<<<< HEAD
//******************* Condidate Functions *************************
=======
>>>>>>> 91de66b60412943f08fdcda23bfd4dcfe3b2d363

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
    username: req.body.username
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

      var token = jwt.sign({ id: user.id, role: "candidate" }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role: "candidate",
        accessToken: token
      });
    });
};


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

<<<<<<< HEAD
exports.recruiter_signin = (req,res) => {
  Recruiter.findOne({
    company: req.body.company
=======
//Admin registration

/*exports.admin_signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Admin was registered successfully!" });
/*
	Role.findOne({ name: "admin" }, (err, role) => {
		if (err) {
		  res.status(500).send({ message: err });
		  return;
		}

		user.roles = [role._id];
		user.save(err => {
		  if (err) {
			res.status(500).send({ message: err });
			return;
		  }

		  res.send({ message: "Admin was registered successfully!" });
		});
	  });
    
  });
};*/

exports.candidate_signin = (req, res) => {
  User.findOne({
    email: req.body.email
>>>>>>> 91de66b60412943f08fdcda23bfd4dcfe3b2d363
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Company Not found." });
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
<<<<<<< HEAD
        username: user.company,
        role: "recruiter",
=======
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
>>>>>>> 91de66b60412943f08fdcda23bfd4dcfe3b2d363
        accessToken: token
      });
    });

}

//************************* Admin registration **********************************

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

<<<<<<< HEAD
exports.admin_signin = (req,res) => {
  Admin.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
=======
exports.recruiter_signin = (req,res) => {
  Recruiter.findOne({
    companyEmail: req.body.companyEmail
  })
    //.populate("roles", "-__v")
    .exec((err, recruiter) => {
>>>>>>> 91de66b60412943f08fdcda23bfd4dcfe3b2d363
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

<<<<<<< HEAD
      if (!user) {
        return res.status(404).send({ message: "Username Not found." });
=======
      if (!recruiter) {
        return res.status(404).send({ message: "Recruiter Not found." });
>>>>>>> 91de66b60412943f08fdcda23bfd4dcfe3b2d363
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

<<<<<<< HEAD
      var token = jwt.sign({ id: user.id, role: "admin" }, config.secret, {
=======
      var token = jwt.sign({ id: recruiter.id, role: "recruiter" }, config.secret, {
>>>>>>> 91de66b60412943f08fdcda23bfd4dcfe3b2d363
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
<<<<<<< HEAD
        id: user._id,
        username: user.company,
        role: "admin",
=======
        id: recruiter._id,
        companyName: recruiter.companyName,
		email: recruiter.email,
		address: recruiter.address,
		city: recruiter.city,
		province: recruiter.province,
		country: recruiter.country,
		registrationDate: recruiter.registrationDate,
        role: "recruiter",
>>>>>>> 91de66b60412943f08fdcda23bfd4dcfe3b2d363
        accessToken: token
      });
    });

}

