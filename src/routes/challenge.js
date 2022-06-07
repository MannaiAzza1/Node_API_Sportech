module.exports = (app) => {
  const Challenges = require("../controllers/challenge.controllers.js");
  var router = require("express").Router();

  router.post("/create", Challenges.create);

  router.get("/", Challenges.findAll);

  router.get("/visible", Challenges.findAllVisible);

  router.get("/:id", Challenges.findOne);

  router.put("/:id/update", Challenges.update);

  router.delete("/:id/delete", Challenges.delete);

  router.delete("/", Challenges.deleteAll);
  app.use("/api/challenge", router);
};
