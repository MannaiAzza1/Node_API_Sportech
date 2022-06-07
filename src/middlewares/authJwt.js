const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Player = require("../models/player.model.js");
Coach = db.coach;
PlayerNew=db.players;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  
 
  if (!token) {
    return res.status(403).send("No token provided , u need to log in !" );
    
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized!" );
    }
    req.userId = decoded.id;
   
    next();
  });
};
isCoach = (req, res, next) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {

    Coach.findById(decoded.id).exec((err, user) => {
    

      
      if(!user)
      {
        res.status(500).send({ message: "Your are not a coach!" });
      }
      if(user)
      {
        next();
      }
      
        }
      
    );
   
    
  });

};
isPlayer = (req, res, next) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {

      PlayerNew.findById(decoded.id).exec((err, user) => {
    

      if(!user)
      {
        res.status(500).send({ message: "Your are not a Player" });
      }
      if(user)
      {
        next();
      }
      
        }
            
    );
    
   
    
  });

};




const authJwt = {
  verifyToken,
  isCoach,
  isPlayer,
};
module.exports = authJwt;
