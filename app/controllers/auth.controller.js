const config = require("../config/auth.config");
const db = require("../models/index");
const User = db.user;
const Recruiter = db.recruiter ;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var userRole = "candidate" ;
exports.candidate_signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Candidate was registered successfully!" });
	  /*Role.findOne({ name: "candidate" }, (err, role) => {
		if (err) {
		  res.status(500).send({ message: err });
		  return;
		}

		// user.roles = [role._id];
		user.save(err => {
		  if (err) {
			res.status(500).send({ message: err });
			return;
		  }
		  res.send({ message: "Candidate was registered successfully!" });
		});
	  });
    */
  });
};

exports.recruiter_signup = (req, res) => {
  const recruiter = new Recruiter({
    company: req.body.company,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    province: req.body.province,
    zip: req.body.zip,
    county: req.body.country,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  recruiter.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Recruiter was registered successfully!" });
    /*

	  Role.findOne({ name: "recruiter" }, (err, role) => {
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

		  res.send({ message: "Recruiter was registered successfully!" });
		});
	  });
    */
  });
};

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
    username: req.body.username
  })
    //.populate("roles", "-__v")
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

      /*var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }*/
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role: "candidate",
        accessToken: token
      });
    });
};

exports.recruiter_signin = (req,res) => {
  Recruiter.findOne({
    company: req.body.company
  })
    //.populate("roles", "-__v")
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

      /*var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }*/
      res.status(200).send({
        id: user._id,
        username: user.company,
        role: "recruiter",
        accessToken: token
      });
    });

}
