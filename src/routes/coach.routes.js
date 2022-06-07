module.exports = app => {
    const Coach = require("../controllers/coach.controller");
    var router = require("express").Router();


    router.get("/", Coach.payAb);
   
  
   
}