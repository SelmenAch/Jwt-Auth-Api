const config = require("../config/auth.config");
const db = require("../models/index");
const Admin = db.admin;
const User = db.user;
const Recruiter = db.recruiter;
const Offer = db.offer;
const Application = db.application;


const _ = require('lodash');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.change_password = (req, res) => {
  
  Admin.findOne({
    _id: req.body._id
  })
    .exec((err, admin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
	  
	  if (!admin) {
        return res.status(404).send({ message: "Admin Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.oldPass,
        admin.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Old Password!"
        });
      }
	  
	  const obj = {
		  password: bcrypt.hashSync(req.body.newPass, 8)
	  }
	  
	  admin = _.extend(admin, obj);
	  
	  admin.save((err, admin) => {
		if (err) {
		  res.status(500).send({ message: err });
		  return;
		}
		res.send({ message: "Password has been changed successfully!" });
		  
	  });

    });
};


exports.get_candidates = (req, res) => {
	
  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving candidates."
      });
    });
};

exports.get_recruiters = (req, res) => {
	
  Recruiter.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving recruiters."
      });
    });
};

exports.delete_candidate = (req, res) => {
	
	const id = req.body._id;

	User.findByIdAndRemove(id, { useFindAndModify: false })
		.then(data => {
		  if (!data) {
			res.status(404).send({
			  message: `Cannot delete Candidate with id=${id}. Maybe Candidate was not found!`
			});
		  } else {
			res.send({
			  message: "Candidate was deleted successfully!"
			});
		  }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Candidate with id=" + id
      });
    });
};

exports.delete_recruiter = (req, res) => {
	
	const id = req.body._id;

	Recruiter.findByIdAndRemove(id, { useFindAndModify: false })
		.then(data => {
		  if (!data) {
			res.status(404).send({
			  message: `Cannot delete Recruiter with id=${id}. Maybe Recruiter was not found!`
			});
		  } else {
			res.send({
			  message: "Recruiter was deleted successfully!"
			});
		  }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Recruiter with id=" + id
      });
    });
};

exports.get_all_offers = (req, res) => {
	
  Offer.find().populate('company', {password: 0})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving offers."
      });
    });
};

exports.get_offer_details = (req, res) => {
	
  Offer.findOne({
    _id: req.body._id
  }).populate('company', {password: 0})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving offer details."
      });
    });
};


exports.approve_offer = (req, res) => {

	const id = req.body._id;

	Offer.findOneAndUpdate({ "_id" : id }, { useFindAndModify: false })
		.exec((err, updatedOffer) => {
		  if (err) {
			res.status(500).send({ message: err });
			return;
		  }
		  
		const obj = {
			isApproved: 'true'
		  }
		  
		  updatedOffer = _.extend(updatedOffer, obj);
		  
		  updatedOffer.save((err, offer) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}
			res.send({ message: "Offer has been approved successfully!" });
	 
		  });

		});
	};
	
exports.delete_offer = (req, res) => {
	
	const id = req.body._id;

	Offer.findByIdAndRemove(id, { useFindAndModify: false })
		.then(data => {
		  if (!data) {
			res.status(404).send({
			  message: `Cannot delete Offer with id=${id}. Maybe Offer was not found!`
			});
		  } else {
			res.send({
			  message: "Offer was deleted successfully!"
			});
		  }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Offer with id=" + id
      });
    });
};


exports.get_all_applications = (req, res) => {
	
  Application.find().populate({
            path: 'offer',
            model: 'Offer',
            populate: {
                path: 'company',
                model: 'Recruiter',
				select: { 'password': 0 }
            }
		})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving applications."
      });
    });
};

exports.get_keywords = (req,res)=>{
  Offer.findOne({_id:req.params.id} , (err,offer)=>{
    if (err) res.status(500).send("Erreur while parsing the Offer !!");
    else res.status(200).send(offer.keywords);
  })
}
