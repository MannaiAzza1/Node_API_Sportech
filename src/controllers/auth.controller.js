const config = require("../config/auth.config");
const db = require("../models");

const nodemailer = require("../config/nodemailer.config");
const User = db.players;
const Coach = db.coach;
const testUser= db.user;
const Invite=db.invite;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { coach } = require("../models");
exports.signupCoach = (req, res) => {
  const user = new Coach({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role:"Coach",
    abonnement:req.body.abonnement,
    role:req.body.role,
    birthdate:req.body.birthdate,
  });
  
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Coach was registered successfully!" });
  });
};
exports.invite = (req, res) => {
  const token = jwt.sign({ email: req.body.email }, config.secret);
  
    const id_coach = req.params.id;
    Coach.findByIdAndUpdate(id_coach)
    .then((data) => {
      if(!req.body.email)
      {

        return res.status(404).send({ message: "Email is required , but Not found." });
      }
      const user = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        abonnement:req.body.abonnement,
        password: bcrypt.hashSync(req.body.password, 8),
        confirmationCode: token,
        role:"player",
        coach:data,
    
        stats_to_achieve : req.body.stats_to_achieve ,});
      user.save((err, user) => {
        
    
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
      if (!data) {
        return res.status(404).send({ message: "coach Not found." });
      }
      const invite = new Invite({
        player:user,
        coach:data,
          
        })
        invite.save((err, result) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }


      data.invited_users.push(user)
      data.invites.push(result)
      
      data.save();
    })
  })
    res.send({
      user
    });

    nodemailer.sendConfirmationEmail(
      user.username,
      user.email,
      user.confirmationCode,
      user.isFirst
    );
  });
};

exports.signin = (req, res) => {
  Promise.all([User.findOne({
    email: req.body.username,
  }).populate("competences").populate(
    ({ 
      path: 'stats_to_achieve',
      populate: {
        path: 'stat',
        model: 'Stat'
      } 
   })).populate("stats").populate("coach")
   .populate(({path:' competences_to_achieve' ,
   populate: {
    path: 'competence',
    model: 'Competence'
  } 
  })).populate(({path:"challenge_to_achieve",
populate:{
  path:'challenge',
  model:'challenge'
}})), 
  Coach.findOne({
    email: req.body.username,
  }).populate("invites")]).then(([userResult, coachResult])=>{
    
      
      if ((!userResult)&&(!coachResult)) {
        return res.status(404).send({ message: "User Not found." });
      }
      if((coachResult))
      {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          coachResult.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
        var token = jwt.sign({ id: coachResult.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        });
        
        coachResult.nb_auth=coachResult.nb_auth + 1 ;
        coachResult.save();
        res.status(200).send({
          id: coachResult._id,
          nb_auth:coachResult.nb_auth,
          username: coachResult.username,
          email: coachResult.email,
          accessToken: token,
          status: coachResult.status,
          role:coachResult.role,
          invited_users:coachResult.invited_users,
          invites:coachResult.invites,
          abonnement:CoachResult.abonnement,

        });
        
      }
      if((userResult)&&(!coachResult))


      { var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        userResult.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: userResult.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      if (userResult.status != "Accepted") {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      }
      userResult.nb_auth=userResult.nb_auth + 1 ;
      userResult.save();
      res.status(200).send({
        id: userResult._id,
        nb_auth : userResult.nb_auth,
        birthdate:userResult.birthdate,
        username: userResult.username,
        email: userResult.email,
        accessToken: token,
        status: userResult.status,
        role:userResult.role,
        stats_to_achieve:userResult.stats_to_achieve,
        competences: userResult.competences,
        competences_to_achieve: userResult.competences_to_achieve,
        etablissement:userResult.etablissement,
        firstname:userResult.firstname,
        lastname:userResult.lastname,
        isActive:userResult.isActive,
        obj_to_achieve: userResult.obj_to_achieve,
        occupation: userResult.occupation ,
        poids: userResult.poids,
        prixSeance: userResult.prixSeance,
       
        sexe: userResult.sexe,
        stats: userResult.stats,
        stats_to_achieve: userResult.stats_to_achieve,
        
        taille: userResult.taille,
        tel: userResult.taille,
        challenge_to_achieve:userResult.challenge_to_achieve

      });
    }
      
    
  }).catch(err=>{
    console.log(err)
    res.sendStatus(500);
  })
    
    
};
exports.verifyUser = (req, res, next) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.status = "Accepted";
      user.username=req.body.username;
      user.email=req.body.email;
      user.birthplace=req.body.birthplace;
      user.occupation=req.body.occupation;
      user.etablissement=req.body.etablissement;
      user.tel=req.body.tel;
      user.competences=req.body.competences;
      user.stats=req.body.stats;
      user.picture=req.body.picture;
      user.birthdate=req.body.birthdate
      user.password=bcrypt.hashSync(req.body.password, 8),
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        else
        {
          res.status(200).send({message:"Done sucessfuly! you can log in"})
        }
      });
    })
    .catch((e) => console.log("error", e));
};