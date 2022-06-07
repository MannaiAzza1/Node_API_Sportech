const db = require("../models");
const Competence = db.competences;
const Coach = db.coach;

//payAb
exports.payAb = async (req, res)=>{
  const invited_users = req.body.invited_users;
  if (invited_users<= 3) 
  res.send({ message: "free "  });
  else if (invited_users > 3 && invited_users <= 10)
  res.send({ message: "basic "  });
  else 
  res.send({ message: "unlimited "  });
  return;
}