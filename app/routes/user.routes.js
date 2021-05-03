const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const { updateTests,getNewTest } = require("../controllers/makeTest")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);
  //condidate
  app.get("/api/test/candidate", [authJwt.verifyToken, authJwt.isCandidate], controller.candidateBoard);
  

  //recruiter
  app.get(
    "/api/test/recruiter",
    [authJwt.verifyToken, authJwt.isRecruiter],
    controller.recruiterBoard
  );

  //admin
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  
  app.post("/api/admin/updateTests" , [ authJwt.verifyToken, authJwt.isAdmin ] , updateTests );
  app.post("/api/admin/getNewTest", [ authJwt.verifyToken,authJwt.isAdmin ], getNewTest );
};
