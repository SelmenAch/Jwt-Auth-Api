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
const Application = db.application ;
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

exports.create_offer = (req, res) => {
	  
	const offer = new Offer({
	  title: req.body.title,
	  company: req.body.company,
	  type: req.body.type,
	  category: req.body.category,
	  location: req.body.location,	
	  startDate: req.body.startDate,
	  endDate: req.body.endDate,
	  keywords: req.body.keywords,
	  description: req.body.description,
	  isApproved: false
	});

offer.save((err, offer) => {
  if (err) {
	res.status(500).send({ message: err });
	return;
  }
  res.send({ message: "Offer was created successfully!" });
  
});
	
};

exports.get_offers = (req, res) => {
	
	Offer.find({
	  'company._id': req.body._id
	})
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

  exports.edit_offer = (req, res) => {
	
	const id = req.body._id;

	Offer.findOneAndUpdate(id, { useFindAndModify: false })
		.exec((err, updatedOffer) => {
		  if (err) {
			res.status(500).send({ message: err });
			return;
		  }
		  
		const obj = {
			title: req.body.title,
			company: req.body.company,
			type: req.body.type,
			category: req.body.category,
			location: req.body.location,	
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			keywords: req.body.keywords,
			description: req.body.description,
			isApproved: false
		  }
		  
		  updatedOffer = _.extend(updatedOffer, obj);
		  
		  updatedOffer.save((err, offer) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}
			res.send({ message: "Offer has been edited successfully!" });
	 
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

exports.get_applications = (req, res) => {
    
	Application.find({
    offer: req.body._id
  })
    .then(data => {
	  console.log("SUCCESS");
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving applications."
      });
    });
};

exports.edit_application = (req, res) => {

	const id = req.body._id;
	console.log(req.body.status);
	Application.findByIdAndUpdate(id, { status: req.body.status }, { useFindAndModify: false })
	  .then(data => {
		if (!data) {
		  res.status(404).send({
			message: `Cannot edit application with id=${id}. Maybe Application was not found!`
		  });
		} else {
			res.send({ message: "Decision was made successfully." });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error updating Application with id=" + id
		});
	  });
};



/*exports.create_cv = (req, res) => {
	
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
};*/

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

exports.get_offer = (req,res) => {
	Offer.findOne({_id:req.params.id})
	.exec((err,offer) => {
		if (err) res.status(500).send(err);
		res.status(200).send(offer) ;
	})
}

/*exports.createOffer = (req,res)=>{

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
			res.status(400).send("Offer could not be created");
			return;
		} else {
			res.status(200).send("Offer Created Successfully");
		}
	})
};*/
