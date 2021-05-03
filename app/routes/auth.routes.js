const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Condidate
  app.post("/api/auth/candidate_signin", controller.candidate_signin);
  app.post(
    "/api/auth/candidate_signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmailInCandidate,
    ],
    controller.candidate_signup
  );

  //Recuiter
  app.post("/api/auth/recruiter_signin", controller.recruiter_signin);
  app.post(
    "/api/auth/recruiter_signup",
    [
      verifySignUp.checkDuplicateCompanyName
    ],
    controller.recruiter_signup
  );
  
  //admin
  app.post(
    "/api/auth/admin_signin",
    controller.admin_signin
  );
  app.post("/api/auth/admin_signup",
  controller.admin_signup
  )


  
};
