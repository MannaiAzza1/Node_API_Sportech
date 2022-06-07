module.exports = app => {
    const player = require("../controllers/player.controller");
    var router = require("express").Router();

    router.get("/", player.findAll);
    
    router.get("/:id", player.findOne);
   
    router.put("/:id/update", player.update);
    
    router.delete("/:id/delete", player.delete);
   
    router.delete("/", player.deleteAll);
    router.get("/coach/:id",player.findCoachInvitedBy);
    app.use('/api/player', router);
  };