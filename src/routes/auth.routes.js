const { verifySignUp } = require("../middlewares");
const {authJwt} =require("../middlewares")
const controller = require("../controllers/auth.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/:id/invite",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.invite
  );
  app.post("/api/auth/signup/coach" ,controller.signupCoach)
  app.post("/api/auth/signin", controller.signin);
  app.put("/api/auth/confirm/:confirmationCode", controller.verifyUser);
};
