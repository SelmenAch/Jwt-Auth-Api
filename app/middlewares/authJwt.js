const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Recruiter = db.recruiter;
const Admin = db.admin ;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

isAdmin = (req, res, next) => {
  Admin.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log(req.role);
    if (req.role == "admin"){
        next();
        return;
    }
    res.status(403).send({ message: "Require Admin Role!" });
    return;
    
  });
}

isRecruiter = (req, res, next) => {
  Recruiter.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.role == "recruiter") {
      next() ;
      return ;
    }
    res.status(403).send({ message: "Error !! no role provided!" });
    return;
  });
};

isCandidate = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.role == "candidate"){
      next();
      return ;
    }
    res.status(403).send({ message: "Error !! no role provided!" });
    return;
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isRecruiter,
  isCandidate
};
module.exports = authJwt;
