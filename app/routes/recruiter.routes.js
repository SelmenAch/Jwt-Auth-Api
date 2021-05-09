const { authJwt } = require("../middlewares");
const controller = require("../controllers/recruiter.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/api/recruiter/change_password", controller.change_password);
  
  app.post("/api/recruiter/edit_profile", controller.edit_profile);
  
  app.post("/api/recruiter/offers/create_offer", controller.create_offer);
  
  app.post("/api/recruiter/offers/edit_offer", controller.edit_offer);
  
  app.post("/api/recruiter/offers/delete_offer", controller.delete_offer);
  
  app.post("/api/recruiter/offers/get_offers", controller.get_offers);
  
  app.post("/api/recruiter/applications/get_applications", controller.get_applications);
  
  app.post("/api/recruiter/applications/edit_application", controller.edit_application);
  
 
  

/*
  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/candidate", [authJwt.verifyToken, authJwt.isCandidate], controller.candidateBoard);

  app.get(
    "/api/test/recruiter",
    [authJwt.verifyToken, authJwt.isRecruiter],
    controller.recruiterBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
*/
};
