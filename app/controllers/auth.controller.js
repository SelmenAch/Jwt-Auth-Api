const config = require("../config/auth.config");
const db = require("../models/index");
const Admin = db.admin ;
const User = db.user;
const Recruiter = db.recruiter ;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//******************* Condidate Functions *************************

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
  });
};

exports.recruiter_signin = (req,res) => {
  Recruiter.findOne({
    company: req.body.company
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
        username: user.company,
        role: "recruiter",
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

exports.admin_signin = (req,res) => {
  Admin.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Username Not found." });
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

      var token = jwt.sign({ id: user.id, role: "admin" }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.company,
        role: "admin",
        accessToken: token
      });
    });

}

