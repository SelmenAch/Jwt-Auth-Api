const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/api/candidate/change_password", controller.change_password);
  
  app.post("/api/candidate/create_cv", controller.create_cv);
  
  app.post("/api/candidate/edit_cv", controller.edit_cv);
  
  app.post("/api/candidate/get_applications", controller.get_applications);
  
  app.post("/api/candidate/get_profile", controller.get_profile);

  app.post("/api/application/submit",controller.submit_application);

};
