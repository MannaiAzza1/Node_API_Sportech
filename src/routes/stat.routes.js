
const { authJwt } = require("../middlewares");
module.exports = app => {
    const stats = require("../controllers/stat.controller.js");
    var router = require("express").Router();
   
    
    router.post("/create", [authJwt.verifyToken], stats.create);
    
    router.get("/", [authJwt.verifyToken, authJwt.isCoach], stats.findAll);

    router.get("/visible", [authJwt.verifyToken], stats.findAllVisible);
    
    router.get("/:id",  [authJwt.verifyToken],stats.findOne);
   
    router.put("/:id/update", [authJwt.verifyToken], stats.update);
    
    router.delete("/:id/delete",  [authJwt.verifyToken],stats.delete);
   
    router.delete("/",  [authJwt.verifyToken],stats.deleteAll);
    app.use('/api/stat',  [authJwt.verifyToken],router);
  };