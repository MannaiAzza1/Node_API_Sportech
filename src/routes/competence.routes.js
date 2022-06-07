const { authJwt } = require("../middlewares");
module.exports = app => {
    const comps = require("../controllers/competence.controller");
    var router = require("express").Router();
    
    router.post("/create",  [authJwt.verifyToken] ,comps.create);
    
    router.get("/",[authJwt.verifyToken , authJwt.isCoach],comps.findAll);

    router.get("/visible",  [authJwt.verifyToken],comps.findAllVisible);
    
    router.get("/:id", [authJwt.verifyToken,authJwt.isCoach], comps.findOne);
   
    router.put("/:id/update", [authJwt.verifyToken,authJwt.isCoach], comps.update);
    
    router.delete("/:id/delete",  [authJwt.verifyToken,authJwt.isCoach],comps.delete);
   
    router.delete("/", [authJwt.verifyToken,authJwt.isCoach],comps.deleteAll);
    app.use('/api/comp', router);
    
  };