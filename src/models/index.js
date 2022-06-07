const mongoose = require('mongoose');
const UserSchema=require("./user.model")
const UserModel = mongoose.model("User", UserSchema);
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.ROLES = ["player", "coach"];
db.stats = require("./stat.model")(mongoose);
db.challenges = require("./challenge.models")(mongoose);
db.competences = require("./competence.model")(mongoose);
db.coach = require("./coach.model")(mongoose);
db.places = require("./place.model");
db.coach = require("./coach.model");
db.players = require("./player.model");
db.sessions = require("./session.models")
db.program = require("./program.models");
db.user=UserModel;
db.invite= require("./invite.model")(mongoose);



module.exports = db;