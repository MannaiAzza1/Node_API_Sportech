module.exports = (app) => {
  const places = require("../controllers/place.controller");
  var router = require("express").Router();

  router.post("/create", places.create);

  router.get("/", places.findAll);

  router.get("/:id", places.findOne);

  router.put("/:id/update", places.update);

  router.delete("/:id/delete", places.delete);

  router.delete("/", places.deleteAll);
  app.use("/api/place", router);
};
