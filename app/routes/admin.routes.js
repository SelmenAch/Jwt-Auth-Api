const { createTest,generateTests } = require("../controllers/test.controller");
const authJwt = require("../middlewares/authJwt");


module.exports = function(app) {

app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

app.get("/api/admin/test/:type", createTest);
app.post("/api/admin/generateTests"  ,generateTests);
//app.post("/api/admin/offers/accept",[authJwt.verifyToken, authJwt.isAdmin],acceptOffer); //mizelet
//app.post("/api/admin/offers/decline",[authJwt.verifyToken, authJwt.isAdmin],declineOffer); //mizelet

}