const { authJwt } = require("../middlewares");
const controller = require("../controllers/admin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/api/admin/change_password", controller.change_password);
  
  app.post("/api/admin/get_candidates", controller.get_candidates);
  
  app.post("/api/admin/get_recruiters", controller.get_recruiters);
  
  app.post("/api/admin/delete_candidate", controller.delete_candidate);
  
  app.post("/api/admin/delete_recruiter", controller.delete_recruiter);
  
  app.post("/api/admin/offers/get_all_offers", controller.get_all_offers);
  
  app.post("/api/admin/offers/get_offer_details", controller.get_offer_details);
  
  app.post("/api/admin/offers/approve_offer", controller.approve_offer);
  
  app.post("/api/admin/offers/delete_offer", controller.delete_offer);
  
  app.post("/api/admin/applications/get_all_applications", controller.get_all_applications);
  
 
  

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
