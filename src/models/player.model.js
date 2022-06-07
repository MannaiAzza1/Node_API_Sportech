const mongoose = require("mongoose");
const UserSchema = require("./user.model");
const extendSchema = require("mongoose-extend-schema");
const Player = mongoose.model(
  "Player",
  new extendSchema(UserSchema, {
    
    picture: String,
    birthdate: Date,
    sexe: String,
    birthplace: String,
    poids: Number,
    taille: String,
    hand: String,
    isActive: String,
    tel: String,
    nb_sessions: Number,
    role:String,
    occupation:String,
    etablissement : String,
    prixSeance:Number,
    nb_auth: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Invited", "Accepted"],
      default: "Invited",
    },
    stats_to_achieve: [
      {
        stat: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Stat",
        },
        limit_date: String,
      },
    ],
    competences_to_achieve: [
      {
        competence: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Competence",
        },
        limit_date: String,
      },
    ],
    challenge_to_achieve: [
      {
        challenge: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Challenge",
        },
        limit_date: String,
      },
    ],

    confirmationCode: {
      type: String,
      unique: true,
    },
    isFirst: {
      type: Boolean,
      default: false,
    },
    challenges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "challenge",
      },
    ],
    competences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competence",
      },
    ],
    coach: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coach",
      },
    

    stats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stat",
      },
    ],
    obj_to_achieve: [
      {
        type: String,
      },
    ],
  })
);
module.exports = Player;

module.exports.readPlayer = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let player = await Player.findById(id);
      resolve(player);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};
