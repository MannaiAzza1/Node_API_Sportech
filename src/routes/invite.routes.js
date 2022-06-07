const { authJwt } = require("../middlewares");
module.exports = (app) => {
  const invite = require("../controllers/invite.controller");
  var router = require("express").Router();

  router.post("/create",  [authJwt.verifyToken] ,invite.create);

  router.get("/",  [authJwt.verifyToken],invite.findAll);

  router.get("/:id", [authJwt.verifyToken],invite.findOne);
  router.get("/coach/:id",  [authJwt.verifyToken] ,invite.findCoachInvites);

  router.put("/:id/update", [authJwt.verifyToken],invite.update);

  router.delete("/:id/delete", [authJwt.verifyToken], invite.delete);

  router.delete("/", [authJwt.verifyToken],invite.deleteAll);
  app.use("/api/invite", router);
};
