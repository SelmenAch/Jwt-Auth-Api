const db = require("../models");
const Recruiter = db.recruiter;
const User = db.user;

checkDuplicateUsernameOrEmailInCandidate = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

checkDuplicateCompanyNameOrEmailInRecruiter = (req, res, next) => {
  // companyName
  Recruiter.findOne({
    companyName: req.body.companyName
  }).exec((err, recruiter) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (recruiter) {
      res.status(400).send({ message: "Failed! Company name is already in use!" });
      return;
    }

    
    // Email
    Recruiter.findOne({
      email: req.body.email
    }).exec((err, recruiter) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (recruiter) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
    });
  };


const verifySignUp = {
  checkDuplicateUsernameOrEmailInCandidate,
  checkDuplicateCompanyNameOrEmailInRecruiter
  //checkRolesExisted
};

module.exports = verifySignUp;
