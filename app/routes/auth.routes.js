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

  app.post(
    "/api/auth/candidate_signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmailInCandidate,
      //verifySignUp.checkRolesExisted
    ],
    controller.candidate_signup
  );
  //recuiter
   app.post(
    "/api/auth/recruiter_signup",
    [
      verifySignUp.checkDuplicateCompanyName
      //verifySignUp.checkRolesExisted
    ],
    controller.recruiter_signup
  );
  
  //admin
  
  /*app.post(
    "/api/auth/admin_signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
      //verifySignUp.checkRolesExisted
    ],
    controller.admin_signup
  );*/

  app.post("/api/auth/candidate_signin", controller.candidate_signin);
  app.post("/api/auth/recruiter_signin", controller.recruiter_signin);
};
