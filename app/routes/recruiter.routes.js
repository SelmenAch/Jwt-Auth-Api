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
  
  app.post("/api/offer/create", [authJwt.verifyToken, authJwt.isRecruiter] , controller.createOffer ); // mizelet
  app.get("/api/application/get/:id",[authJwt.verifyToken, authJwt.isRecruiter],controller.getApplications) ; //mizelet

};
